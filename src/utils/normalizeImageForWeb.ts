/** 브라우저가 <img>·createImageBitmap으로 기본 디코딩하는 이미지 MIME (HEIC/HEIF 제외) */
const WEB_DECODABLE_IMAGE_MIME = /^image\/(jpeg|png|webp|gif|bmp|avif)$/i;

/** HEIC → JPEG 중간 변환 품질. 이후 webp 재압축이 있으므로 손실 누적을 줄이려 높게 잡는다 */
const HEIC_DECODE_JPEG_QUALITY = 0.92;

const DEFAULT_FILE_NAME = "image";

export interface NormalizedImage {
  /** 브라우저에서 렌더·canvas 처리가 가능한 이미지 Blob */
  blob: Blob;
  /** 확장자가 실제 포맷과 일치하도록 보정된 파일명 */
  fileName: string;
}

/** HEIC 변환 실패를 나타내는 에러 — 호출부에서 사용자 안내 메시지로 전환한다 */
export class ImageNormalizeError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "ImageNormalizeError";
  }
}

const swapExtension = (fileName: string, extension: string): string =>
  `${fileName.replace(/\.[^./\\]+$/, "")}.${extension}`;

/** iOS Safari/WKWebView는 HEIC를 네이티브 디코딩하므로 변환이 불필요하다 */
const canDecodeNatively = async (source: Blob): Promise<boolean> => {
  if (typeof createImageBitmap !== "function") return false;
  try {
    const bitmap = await createImageBitmap(source);
    bitmap.close();
    return true;
  } catch {
    return false;
  }
};

/**
 * 업로드·미리보기 전에 이미지를 브라우저가 다룰 수 있는 포맷으로 정규화한다.
 *
 * HEIC/HEIF는 Safari 외 브라우저(안드로이드 웹뷰, 데스크톱 크롬 등)에서
 * `<img>`·`createImageBitmap`으로 디코딩되지 않아 미리보기·webp 변환이 모두 실패한다.
 * 따라서 네이티브 디코딩이 불가능한 경우에만 `heic-to`(libheif, ~WASM)로 JPEG 변환하고,
 * 그 외 포맷은 원본을 그대로 반환한다. `heic-to`는 HEIC로 판별됐을 때만 동적 로드된다.
 */
export const normalizeImageForWeb = async (
  source: Blob,
  fileName?: string,
): Promise<NormalizedImage> => {
  const name = fileName?.trim() || DEFAULT_FILE_NAME;

  if (WEB_DECODABLE_IMAGE_MIME.test(source.type)) {
    return { blob: source, fileName: name };
  }

  const { isHeic, heicTo } = await import("heic-to");

  if (!(await isHeic(source as File))) {
    return { blob: source, fileName: name };
  }

  if (await canDecodeNatively(source)) {
    return { blob: source, fileName: name };
  }

  try {
    const jpeg = await heicTo({
      blob: source,
      type: "image/jpeg",
      quality: HEIC_DECODE_JPEG_QUALITY,
    });
    return { blob: jpeg, fileName: swapExtension(name, "jpg") };
  } catch (error) {
    throw new ImageNormalizeError("HEIC 이미지를 변환하지 못했습니다.", {
      cause: error,
    });
  }
};
