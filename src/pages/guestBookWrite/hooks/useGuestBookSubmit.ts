import { useState } from "react";
import { useWriteCard } from "@/api/generated/spaceguestbook-스페이스-방명록";
import { useIssueGuestbookPreSignedUrls } from "@/api/generated/upload-파일-업로드";
import type {
  ApiResponseIssueSignedUrlResponse,
  WriteGuestBookCardPhotoRequest,
} from "@/api/model";
import { uploadImageToSignedUrl } from "@/api/uploadImageToSignedUrl";
import { CONSTRAINTS } from "@/constants/constraints";
import { ERROR_MESSAGES } from "@/constants/error";
import useSnackBar from "@/hooks/@common/useSnackBar";
import { convertImageToWebp } from "@/utils/convertImageToWebp";

interface GuestBookSubmitParams {
  spaceCode: string;
  nickname: string;
  message: string;
  photos: File[];
}

/** 방명록 사진 업로드 및 작성 API 연동을 관리하는 훅 */
export const useGuestBookSubmit = () => {
  const { showSnackBar } = useSnackBar();
  const [isUploadingPhotos, setIsUploadingPhotos] = useState(false);
  const { mutateAsync: issuePreSignedUrls } = useIssueGuestbookPreSignedUrls();
  const { mutate: writeCard, isPending: isWriting } = useWriteCard();

  const uploadPhotos = async (
    spaceCode: string,
    photos: File[],
  ): Promise<WriteGuestBookCardPhotoRequest[]> => {
    if (photos.length === 0) return [];

    // NOTE: presigned URL 스펙상 확장자·Content-Type이 webp로 고정 서명되어 있어,
    // 원본 포맷(모바일 브라우저/HEIC 등)과 무관하게 업로드 전 webp로 변환해야 함
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

    // presigned URL은 x-amz-tagging까지 서명에 포함하므로, 해당 헤더를 함께 보내고
    // 응답 상태까지 검증하는 공용 업로더를 사용한다. (raw fetch는 헤더 누락으로 403,
    // 게다가 fetch는 4xx에 reject하지 않아 실패해도 방명록 POST가 이어지는 문제가 있었음)
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

  const submit = async (
    { spaceCode, nickname, message, photos }: GuestBookSubmitParams,
    onSuccess: () => void,
  ) => {
    let photoRequests: WriteGuestBookCardPhotoRequest[];
    try {
      setIsUploadingPhotos(true);
      photoRequests = await uploadPhotos(spaceCode, photos);
    } catch {
      showSnackBar(ERROR_MESSAGES.PHOTO_UPLOAD_FAILED, "error");
      return;
    } finally {
      setIsUploadingPhotos(false);
    }

    writeCard(
      {
        spaceCode,
        data: { nickname, message, photos: photoRequests },
      },
      {
        onSuccess,
        onError: () =>
          showSnackBar(ERROR_MESSAGES.GUEST_BOOK_WRITE_FAILED, "error"),
      },
    );
  };

  return { submit, isSubmitting: isUploadingPhotos || isWriting };
};
