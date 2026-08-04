import { useState } from "react";
import { useForm } from "react-hook-form";
import { useWriteCard } from "@/api/generated/spaceguestbook-스페이스-방명록";
import { useIssueGuestbookPreSignedUrls } from "@/api/generated/upload-파일-업로드";
import type {
  ApiResponseIssueSignedUrlResponse,
  WriteGuestBookCardPhotoRequest,
} from "@/api/model";
import { ERROR_MESSAGES } from "@/constants/error";
import useSnackBar from "@/hooks/@common/useSnackBar";
import {
  validateMessageMaxLength,
  validateMessageRequired,
  validateNicknameMaxLength,
  validateNicknameRequired,
} from "@/pages/guestBookWrite/validate/guestBookWriteValidation";

interface GuestBookWriteFormValues {
  nickname: string;
  message: string;
}

const nicknameRules = {
  validate: {
    required: validateNicknameRequired,
    maxLength: validateNicknameMaxLength,
  },
};

const messageRules = {
  validate: {
    required: validateMessageRequired,
    maxLength: validateMessageMaxLength,
  },
};

/** 파일명에서 확장자(.포함)를 추출. 확장자가 없으면 빈 문자열 */
const getFileExtension = (fileName: string): string => {
  const dotIndex = fileName.lastIndexOf(".");
  return dotIndex === -1 ? "" : fileName.slice(dotIndex);
};

/** 방명록 작성 폼 상태(react-hook-form) + 사진 업로드 + 작성 API 연동을 관리하는 훅 */
export const useGuestBookWriteForm = (spaceCode: string) => {
  const { showSnackBar } = useSnackBar();
  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
  } = useForm<GuestBookWriteFormValues>({
    mode: "onChange",
    defaultValues: { nickname: "", message: "" },
  });

  const [photos, setPhotos] = useState<File[]>([]);
  const [isUploadingPhotos, setIsUploadingPhotos] = useState(false);
  const { mutateAsync: issuePreSignedUrls } = useIssueGuestbookPreSignedUrls();
  const { mutate: writeCard, isPending: isWriting } = useWriteCard();

  const uploadPhotos = async (): Promise<WriteGuestBookCardPhotoRequest[]> => {
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
  const nicknameError =
    errors.nickname?.type === "required" && !touchedFields.nickname
      ? undefined
      : errors.nickname?.message;
  const messageError =
    errors.message?.type === "required" && !touchedFields.message
      ? undefined
      : errors.message?.message;

  const getSubmitHandler = (onSuccess: () => void) =>
    handleSubmit(async (values) => {
      let photoRequests: WriteGuestBookCardPhotoRequest[];
      try {
        setIsUploadingPhotos(true);
        photoRequests = await uploadPhotos();
      } catch {
        showSnackBar(ERROR_MESSAGES.PHOTO_UPLOAD_FAILED, "error");
        return;
      } finally {
        setIsUploadingPhotos(false);
      }

      writeCard(
        {
          spaceCode,
          data: {
            nickname: values.nickname,
            message: values.message,
            photos: photoRequests,
          },
        },
        {
          onSuccess,
          onError: () =>
            showSnackBar(ERROR_MESSAGES.GUEST_BOOK_WRITE_FAILED, "error"),
        },
      );
    });

  return {
    control,
    nicknameRules,
    messageRules,
    nicknameError,
    messageError,
    isValid,
    photos,
    setPhotos,
    isSubmitting: isUploadingPhotos || isWriting,
    getSubmitHandler,
  };
};
