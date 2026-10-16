type ThumbnailPreset = "300" | "800" | "1080";

const DEFAULT_THUMBNAIL_PRESET: ThumbnailPreset = "800";

/** 레거시(v2) 이미지 경로: v3와 달리 원본만 존재해 썸네일 경로로 변환해야 한다 */
const LEGACY_IMAGE_PATH_PATTERN = /^photogather\//;

/** `.../{category}/{file}.{ext}` → `.../{category}/thumbnails/{file}_x{preset}.webp` */
const buildLegacyThumbnailPath = (
  path: string,
  preset: ThumbnailPreset,
): string => {
  const lastDotIndex = path.lastIndexOf(".");
  const pathWithoutExt =
    lastDotIndex !== -1 ? path.slice(0, lastDotIndex) : path;

  const lastSlashIndex = pathWithoutExt.lastIndexOf("/");
  const directory =
    lastSlashIndex !== -1 ? pathWithoutExt.slice(0, lastSlashIndex) : "";
  const fileName =
    lastSlashIndex !== -1
      ? pathWithoutExt.slice(lastSlashIndex + 1)
      : pathWithoutExt;

  return `${directory ? `${directory}/` : ""}thumbnails/${fileName}_x${preset}.webp`;
};

/**
 * 서버가 내려준 이미지 경로를 절대 URL로 변환한다.
 * 레거시(v2, `photogather/`) 경로는 원본 대신 썸네일(webp) 경로로 치환하고,
 * v3 경로는 그대로 base URL과 결합한다.
 */
export const getImageUrl = (
  path: string,
  preset: ThumbnailPreset = DEFAULT_THUMBNAIL_PRESET,
): string => {
  const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL ?? "";
  const normalizedPath = path.replace(/^\//, "");
  const resolvedPath = LEGACY_IMAGE_PATH_PATTERN.test(normalizedPath)
    ? buildLegacyThumbnailPath(normalizedPath, preset)
    : normalizedPath;

  return `${baseUrl.replace(/\/$/, "")}/${resolvedPath}`;
};
