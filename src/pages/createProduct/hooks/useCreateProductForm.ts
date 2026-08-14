import { useState } from "react";
import { useForm } from "react-hook-form";
import { withApiVersion } from "@/api/apiVersion";
import { useRegisterV3 } from "@/api/generated/product-전시-작품";
import { useIssueProductSignedUrls } from "@/api/generated/upload-파일-업로드";
import type {
  ApiResponseIssueSignedUrlResponse,
  RegisterProductPhotoRequest,
} from "@/api/model";
import { ERROR_MESSAGES } from "@/constants/error";
import useSnackBar from "@/hooks/@common/useSnackBar";
import {
  validateProductDescriptionMaxLength,
  validateProductTitleMaxLength,
  validateProductTitleRequired,
} from "@/pages/createProduct/utils/createProductValidation";

interface CreateProductFormValues {
  title: string;
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

/** 작품 소개 필드 검증 규칙 — 최대 글자 수(실시간 노출) */
const descriptionRules = {
  validate: validateProductDescriptionMaxLength,
};

/** 파일명에서 확장자(.포함)를 추출. 확장자가 없으면 빈 문자열 */
const getFileExtension = (fileName: string): string => {
  const dotIndex = fileName.lastIndexOf(".");
  return dotIndex === -1 ? "" : fileName.slice(dotIndex);
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
    defaultValues: { title: "", description: "", videoUrl: "" },
  });

  const [photos, setPhotos] = useState<File[]>([]);
  const [isUploadingPhotos, setIsUploadingPhotos] = useState(false);
  const { mutateAsync: issuePreSignedUrls } = useIssueProductSignedUrls();
  const { mutate: registerProduct, isPending: isRegistering } = useRegisterV3({
    request: withApiVersion(3),
  });

  const uploadPhotos = async (): Promise<RegisterProductPhotoRequest[]> => {
    if (photos.length === 0) return [];

    const uploadFiles = photos.map((file) => ({
      fileName: `${crypto.randomUUID()}${getFileExtension(file.name)}`,
      size: file.size,
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
      photos.map((file, index) => {
        const uploadFileName = uploadFiles[index].fileName;
        const signedUrl = signedUrls[uploadFileName];
        if (!signedUrl) throw new Error("사진 업로드 URL 발급에 실패했습니다.");
        return fetch(signedUrl, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file,
        });
      }),
    );

    return photos.map((file, index) => ({
      originalName: file.name,
      uploadFileName: uploadFiles[index].fileName,
      capacity: file.size,
    }));
  };

  // 필수값 미입력 에러는 blur로 터치된 이후에만 노출, 글자 수 초과 에러는 항상 즉시 노출
  const titleError =
    errors.title?.type === "required" && !touchedFields.title
      ? undefined
      : errors.title?.message;
  const descriptionError = errors.description?.message;

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
            description: values.description,
            videoUrl: values.videoUrl.trim() || undefined,
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
    descriptionRules,
    titleError,
    descriptionError,
    isValid,
    photos,
    setPhotos,
    isSubmitting: isUploadingPhotos || isRegistering,
    getSubmitHandler,
  };
};
