import { issueProductSignedUrls } from "@/api/generated/upload-파일-업로드";
import type {
  ApiResponseIssueSignedUrlResponse,
  RegisterProductPhotoRequest,
} from "@/api/model";
import { uploadImageToSignedUrl } from "@/api/uploadImageToSignedUrl";
import { CONSTRAINTS } from "@/constants/constraints";
import { convertImageToWebp } from "@/utils/convertImageToWebp";

/**
 * 작품 사진 파일을 업로드하고 등록/수정 API에 넣을 사진 메타데이터를 반환한다.
 *
 * 처리 순서:
 * 1. 각 파일을 webp로 변환 — presigned URL이 확장자·Content-Type을 webp로 고정 서명하므로
 *    원본 포맷(HEIC 등 네이티브 피커 결과 포함)과 무관하게 반드시 변환해야 한다.
 * 2. presigned URL 일괄 발급
 * 3. 각 signed URL로 업로드
 *
 * @throws presigned URL 발급 실패 또는 업로드 실패 시
 */
export const uploadProductPhotos = async (
  spaceCode: string,
  files: File[],
): Promise<RegisterProductPhotoRequest[]> => {
  if (files.length === 0) return [];

  const webpPhotos = await Promise.all(
    files.map((file) =>
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

  const response = await issueProductSignedUrls(spaceCode, { uploadFiles });
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

  return files.map((file, index) => ({
    originalName: file.name,
    uploadFileName: uploadFiles[index].fileName,
    capacity: webpPhotos[index].size,
  }));
};
