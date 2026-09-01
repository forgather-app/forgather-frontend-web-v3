import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { withApiVersion } from "@/api/apiVersion";
import {
  getGetQueryKey,
  getGetV3QueryKey,
  useUpdateV3,
} from "@/api/generated/product-전시-작품";
import type { ProductResponse, RegisterProductPhotoRequest } from "@/api/model";
import { uploadProductPhotos } from "@/api/uploadProductPhotos";
import type { ExistingPhoto } from "@/components/@common/photoInput/PhotoInput";
import { ERROR_MESSAGES } from "@/constants/error";
import useSnackBar from "@/hooks/@common/useSnackBar";
import {
  validateProductAuthorNameMaxLength,
  validateProductDescriptionMaxLength,
  validateProductTitleMaxLength,
  validateProductTitleRequired,
  validateProductVideoUrlFormat,
  validateProductVideoUrlMaxLength,
} from "@/pages/createProduct/utils/createProductValidation";
import { getImageUrl } from "@/utils/getImageUrl";

interface EditArtworkFormValues {
  title: string;
  authorName: string;
  description: string;
  videoUrl: string;
}

/** 작품 제목 필드 검증 규칙 — 필수 입력(blur 후 노출) + 최대 글자 수(실시간 노출) */
const titleRules = {
  validate: {
    required: validateProductTitleRequired,
    maxLength: validateProductTitleMaxLength,
  },
};

/** 작가명 필드 검증 규칙 — 최대 글자 수(실시간 노출) */
const authorNameRules = {
  validate: validateProductAuthorNameMaxLength,
};

/** 작품 소개 필드 검증 규칙 — 최대 글자 수(실시간 노출) */
const descriptionRules = {
  validate: validateProductDescriptionMaxLength,
};

/** 영상 링크 필드 검증 규칙 — 최대 글자 수 + 유튜브 링크 형식(둘 다 실시간 노출) */
const videoUrlRules = {
  validate: {
    maxLength: validateProductVideoUrlMaxLength,
    format: validateProductVideoUrlFormat,
  },
};

/** 작품 상세 응답의 사진 목록을 PhotoInput용 기존 사진 목록으로 변환 (order 오름차순 정렬) */
const toExistingPhotos = (product: ProductResponse): ExistingPhoto[] =>
  (product.photos ?? [])
    .filter(
      (photo): photo is typeof photo & { id: number; path: string } =>
        photo.id !== undefined && !!photo.path,
    )
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((photo) => ({ id: photo.id, url: getImageUrl(photo.path) }));

/**
 * 작품 수정 폼 상태(react-hook-form) + 기존/신규 사진 관리 + 수정 API 연동을 관리하는 훅.
 * 기존 사진은 id로 식별해 삭제 목록(deletePhotoIds)에 쌓고, 새 사진은 업로드 후 newPhotos로 전달한다.
 */
export const useEditArtworkForm = (
  spaceCode: string,
  productId: number,
  product: ProductResponse,
) => {
  const { showSnackBar } = useSnackBar();
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, touchedFields, isValid },
  } = useForm<EditArtworkFormValues>({
    mode: "onChange",
    defaultValues: {
      title: product.title ?? "",
      authorName: product.authorName ?? "",
      description: product.description ?? "",
      videoUrl: product.videoUrl ?? "",
    },
  });

  // 기존 값이 이미 유효해도 RHF는 마운트 시 isValid를 자동 계산하지 않으므로 직접 트리거함
  useEffect(() => {
    trigger();
  }, [trigger]);

  const [existingPhotos, setExistingPhotos] = useState<ExistingPhoto[]>(() =>
    toExistingPhotos(product),
  );
  const [deletePhotoIds, setDeletePhotoIds] = useState<number[]>([]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [isUploadingPhotos, setIsUploadingPhotos] = useState(false);

  // 함수명은 updateV3지만 실제 엔드포인트는 X-API-Version: 1로 라우팅됨
  // (OpenAPI 스펙상 PATCH /spaces/{spaceCode}/products/{productId} 의 X-API-Version enum: ["1"])
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateV3({
    request: withApiVersion(1),
  });

  const removeExistingPhoto = (id: number) => {
    setExistingPhotos((prev) => prev.filter((photo) => photo.id !== id));
    setDeletePhotoIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  // 필수값 미입력 에러는 blur로 터치된 이후에만 노출, 글자 수 초과 에러는 항상 즉시 노출
  const titleError =
    errors.title?.type === "required" && !touchedFields.title
      ? undefined
      : errors.title?.message;
  const authorNameError = errors.authorName?.message;
  const descriptionError = errors.description?.message;
  const videoUrlError = errors.videoUrl?.message;

  const getSubmitHandler = (onSuccess: () => void) =>
    handleSubmit(async (values) => {
      let newPhotos: RegisterProductPhotoRequest[];
      try {
        setIsUploadingPhotos(true);
        newPhotos = await uploadProductPhotos(spaceCode, photos);
      } catch {
        showSnackBar(ERROR_MESSAGES.PHOTO_UPLOAD_FAILED, "error");
        return;
      } finally {
        setIsUploadingPhotos(false);
      }

      updateProduct(
        {
          spaceCode,
          productId,
          data: {
            title: values.title,
            authorName: values.authorName.trim(),
            description: values.description,
            videoUrl: values.videoUrl.trim(),
            // 순서 재정렬 UI가 없어, 영상을 사진보다 먼저 노출하도록 고정 전달
            isVideoAfterPhoto: false,
            deletePhotoIds,
            newPhotos,
          },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: getGetQueryKey(spaceCode, productId),
            });
            queryClient.invalidateQueries({
              queryKey: getGetV3QueryKey(spaceCode),
            });
            onSuccess();
          },
          onError: () =>
            showSnackBar(ERROR_MESSAGES.PRODUCT_UPDATE_FAILED, "error"),
        },
      );
    });

  return {
    control,
    titleRules,
    authorNameRules,
    descriptionRules,
    videoUrlRules,
    titleError,
    authorNameError,
    descriptionError,
    videoUrlError,
    isValid,
    existingPhotos,
    removeExistingPhoto,
    photos,
    setPhotos,
    isSubmitting: isUploadingPhotos || isUpdating,
    getSubmitHandler,
  };
};
