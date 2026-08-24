import { useState } from "react";
import { useForm } from "react-hook-form";
import { withApiVersion } from "@/api/apiVersion";
import { useRegisterV3 } from "@/api/generated/product-전시-작품";
import { useIssueProductSignedUrls } from "@/api/generated/upload-파일-업로드";
import type {
  ApiResponseIssueSignedUrlResponse,
  RegisterProductPhotoRequest,
} from "@/api/model";
import { uploadImageToSignedUrl } from "@/api/uploadImageToSignedUrl";
import { CONSTRAINTS } from "@/constants/constraints";
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
import { convertImageToWebp } from "@/utils/convertImageToWebp";

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
  const { mutateAsync: issuePreSignedUrls } = useIssueProductSignedUrls();
  const { mutate: registerProduct, isPending: isRegistering } = useRegisterV3({
    request: withApiVersion(3),
  });

  const uploadPhotos = async (): Promise<RegisterProductPhotoRequest[]> => {
    if (photos.length === 0) return [];

    // NOTE: presigned URL 스펙상 확장자·Content-Type이 webp로 고정 서명되어 있어,
    // 원본 포맷(HEIC 등 네이티브 피커 결과 포함)과 무관하게 업로드 전 webp로 변환해야 함
    const webpPhotos = await Promise.all(
      photos.map((file) =>
        convertImageToWebp(file, {
          maxSize: CONSTRAINTS.IMAGE.UPLOAD_MAX_DIMENSION,
          quality: CONSTRAINTS.IMAGE.UPLOAD_QUALITY,
        }),
      ),
    );
    const uploadFiles = webpPhotos.map((blob) => ({
      fileName: `${crypto.randomUUID()}.webp`,
      size: blob.size,
    }));

    const response = await issuePreSignedUrls({
      spaceCode,
      data: { uploadFiles },
    });
    // NOTE: BE 스펙상 응답 content-type이 `*/*`라 orval이 Blob으로 잘못 추론함.
    // 실제 응답 바디는 ApiResponseIssueSignedUrlResponse (JSON)이므로 캐스팅해서 사용
    const signedUrls =
      (response as unknown as ApiResponseIssueSignedUrlResponse).data
        ?.signedUrls ?? {};

    await Promise.all(
      webpPhotos.map((blob, index) => {
        const uploadFileName = uploadFiles[index].fileName;
        const signedUrl = signedUrls[uploadFileName];
        if (!signedUrl) throw new Error("사진 업로드 URL 발급에 실패했습니다.");
        return uploadImageToSignedUrl(signedUrl, blob, uploadFileName);
      }),
    );

    return photos.map((file, index) => ({
      originalName: file.name,
      uploadFileName: uploadFiles[index].fileName,
      capacity: webpPhotos[index].size,
    }));
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
      let photoRequests: RegisterProductPhotoRequest[];
      try {
        setIsUploadingPhotos(true);
        photoRequests = await uploadPhotos();
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
            category: "",
            authorName: values.authorName.trim(),
            description: values.description,
            videoUrl: values.videoUrl.trim(),
            // 폼에 사진 → 영상 순서 재정렬 UI가 없어, 화면에 보이는 순서(사진 다음 영상) 그대로 고정 전달
            isVideoAfterPhoto: true,
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
