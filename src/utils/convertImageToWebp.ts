interface ConvertImageToWebpOptions {
  /** 긴 변 최대 길이(px). 원본이 더 크면 비율을 유지하며 축소, 작으면 그대로 유지 */
  maxSize?: number;
  /** webp 압축 품질(0~1) */
  quality?: number;
}

const DEFAULT_QUALITY = 0.92;

/**
 * 이미지를 webp Blob으로 변환한다. presigned URL 업로드 스펙이 webp로 고정 서명되어 있어
 * 업로드 전 클라이언트에서 반드시 거쳐야 하는 단일 변환 지점.
 * 입력을 File이 아닌 Blob으로 받아, RN 브릿지로 전달받은 base64 → Blob 결과도 그대로 재사용 가능.
 */
export const convertImageToWebp = async (
  source: Blob,
  options?: ConvertImageToWebpOptions,
): Promise<Blob> => {
  const bitmap = await createImageBitmap(source);

  const scale = options?.maxSize
    ? Math.min(1, options.maxSize / Math.max(bitmap.width, bitmap.height))
    : 1;
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) {
    bitmap.close();
    throw new Error("캔버스 컨텍스트를 생성하지 못했습니다.");
  }
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("이미지를 webp로 변환하지 못했습니다."));
      },
      "image/webp",
      options?.quality ?? DEFAULT_QUALITY,
    );
  });
};
