import resize from "@jsquash/resize";
import { encode as encodeWebp } from "@jsquash/webp";

interface ConvertImageToWebpOptions {
  /** 긴 변 최대 길이(px). 원본이 더 크면 비율을 유지하며 축소, 작으면 그대로 유지 */
  maxSize?: number;
  /** webp 압축 품질(0~1) */
  quality?: number;
}

const DEFAULT_QUALITY = 0.92;
// jSquash(@jsquash/webp)의 quality 옵션은 0~100 스케일이라, 이 유틸의 0~1 스케일과 맞추기 위한 배율
const JSQUASH_QUALITY_SCALE = 100;

/**
 * 이미지를 webp Blob으로 변환한다. presigned URL 업로드 스펙이 webp로 고정 서명되어 있어
 * 업로드 전 클라이언트에서 반드시 거쳐야 하는 단일 변환 지점.
 * 입력을 File이 아닌 Blob으로 받아, RN 브릿지로 전달받은 base64 → Blob 결과도 그대로 재사용 가능.
 *
 * WebKit(Safari/iOS 웹뷰)은 canvas.toBlob의 webp 인코딩을 지원하지 않아 요청과 무관하게
 * 조용히 image/png로 대체(fallback)한다(HTML 스펙상 정의된 동작). 그 결과 quality가
 * 무시된 무손실 PNG가 그대로 업로드되어 용량이 오히려 커지는 문제가 있었다. 브라우저
 * 네이티브 인코더에 의존하지 않기 위해, WASM으로 포팅된 libwebp 인코더(@jsquash/webp)를
 * 사용해 브라우저 지원 여부와 무관하게 항상 실제 webp를 생성한다.
 *
 * 리사이즈도 canvas.drawImage(브라우저 범용 스무딩)가 아니라 @jsquash/resize(기본값
 * lanczos3)로 한다 — 실기 비교(라플라시안 분산: canvas 443.95 vs jsquash/resize 629.66,
 * macOS sips 참고값 400.84)로 canvas의 imageSmoothingQuality="high"보다 디테일을
 * 뚜렷하게 더 보존한다는 걸 확인했다.
 */
export const convertImageToWebp = async (
  source: Blob,
  options?: ConvertImageToWebpOptions,
): Promise<Blob> => {
  const bitmap = await createImageBitmap(source);

  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const context = canvas.getContext("2d");
  if (!context) {
    bitmap.close();
    throw new Error("캔버스 컨텍스트를 생성하지 못했습니다.");
  }
  context.drawImage(bitmap, 0, 0);
  bitmap.close();

  const originalImageData = context.getImageData(
    0,
    0,
    canvas.width,
    canvas.height,
  );

  const scale = options?.maxSize
    ? Math.min(1, options.maxSize / Math.max(canvas.width, canvas.height))
    : 1;
  const width = Math.round(canvas.width * scale);
  const height = Math.round(canvas.height * scale);

  const imageData =
    scale < 1
      ? await resize(originalImageData, { width, height })
      : originalImageData;

  const quality = (options?.quality ?? DEFAULT_QUALITY) * JSQUASH_QUALITY_SCALE;
  const webpBuffer = await encodeWebp(imageData, {
    quality,
  });

  return new Blob([webpBuffer], { type: "image/webp" });
};
