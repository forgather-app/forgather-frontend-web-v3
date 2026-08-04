export const PROFILE_IMAGE_CONTENT_TYPE = "image/webp";

// NOTE: presigned URL 서명에 포함된 x-amz-tagging 값 — 버킷 태깅 규칙(Service/Role/ProjectTeam)에 맞춰 고정
const PROFILE_IMAGE_TAGGING =
  "Service=techcourse&Role=techcourse-etc&ProjectTeam=PhotoGather";

/**
 * presigned URL로 이미지를 업로드하고, 접근 가능한 이미지 URL을 반환한다.
 * TODO: 서명 쿼리스트링(`?` 이후)을 제거한 주소를 접근 URL로 가정함 —
 * 백엔드가 CDN 도메인 치환 등 다른 방식을 사용한다면 이 로직을 수정해야 함
 */
export const uploadImageToSignedUrl = async (
  signedUrl: string,
  file: Blob,
  fileName: string,
): Promise<string> => {
  const response = await fetch(signedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": PROFILE_IMAGE_CONTENT_TYPE,
      "Cache-Control": "no-store",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(fileName)}`,
      "x-amz-tagging": PROFILE_IMAGE_TAGGING,
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error(
      `이미지 업로드에 실패했습니다. (status: ${response.status})`,
    );
  }

  return signedUrl.split("?")[0];
};
