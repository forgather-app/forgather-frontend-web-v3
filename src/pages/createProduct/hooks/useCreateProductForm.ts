import { useState } from "react";
import { useForm } from "react-hook-form";
import { withApiVersion } from "@/api/apiVersion";
import { useRegisterV3 } from "@/api/generated/product-전시-작품";
import type { RegisterProductPhotoRequest } from "@/api/model";
import { uploadProductPhotos } from "@/api/uploadProductPhotos";
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

interface CreateProductFormValues {
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

/** 작품 등록 폼 상태(react-hook-form) + 사진 업로드 + 등록 API 연동을 관리하는 훅 */
export const useCreateProductForm = (spaceCode: string) => {
  const { showSnackBar } = useSnackBar();
  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
  } = useForm<CreateProductFormValues>({
    mode: "onChange",
    defaultValues: {
      title: "",
      authorName: "",
      description: "",
      videoUrl: "",
    },
  });

  const [photos, setPhotos] = useState<File[]>([]);
  const [isUploadingPhotos, setIsUploadingPhotos] = useState(false);
  const { mutate: registerProduct, isPending: isRegistering } = useRegisterV3({
    request: withApiVersion(3),
  });

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
      let photoRequests: RegisterProductPhotoRequest[];
      try {
        setIsUploadingPhotos(true);
        photoRequests = await uploadProductPhotos(spaceCode, photos);
      } catch {
        showSnackBar(ERROR_MESSAGES.PHOTO_UPLOAD_FAILED, "error");
        return;
      } finally {
        setIsUploadingPhotos(false);
      }

      registerProduct(
        {
          spaceCode,
          data: {
            title: values.title,
            authorName: values.authorName.trim(),
            description: values.description,
            videoUrl: values.videoUrl.trim(),
            // 순서 재정렬 UI가 없어, 영상을 사진보다 먼저 노출하도록 고정 전달
            isVideoAfterPhoto: false,
            photos: photoRequests,
          },
        },
        {
          onSuccess,
          onError: () =>
            showSnackBar(ERROR_MESSAGES.PRODUCT_REGISTER_FAILED, "error"),
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
    photos,
    setPhotos,
    isSubmitting: isUploadingPhotos || isRegistering,
    getSubmitHandler,
  };
};
