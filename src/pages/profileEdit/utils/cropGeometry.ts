/** 화면에 표시되는 이미지의 기준(스케일 1) 크기 */
export interface Size {
  width: number;
  height: number;
}

/** 이미지 이동량 (크롭 창 중심 기준, px) */
export interface Point {
  x: number;
  y: number;
}

/** 원본 이미지 좌표계의 크롭 영역 (정사각형) */
export interface CropSourceRect {
  sx: number;
  sy: number;
  size: number;
}

type RectLike = Pick<DOMRect, "left" | "top" | "width">;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/** 클램프 과정에서 생기는 -0을 0으로 정규화 */
const normalizeZero = (value: number) => (Object.is(value, -0) ? 0 : value);

/** 이미지가 크롭 창을 항상 가득 덮기 위한 최소 스케일 */
export const getMinScale = (base: Size, windowSize: number): number =>
  Math.max(windowSize / base.width, windowSize / base.height);

/** 스케일을 [minScale, maxScale] 범위로 제한 */
export const clampScale = (
  scale: number,
  minScale: number,
  maxScale: number,
): number => clamp(scale, minScale, maxScale);

/**
 * 크롭 창이 이미지 밖으로 벗어나지 않도록 이동량을 제한.
 * 이미지와 크롭 창의 중심이 일치할 때 이동량이 (0, 0)이다.
 */
export const clampTranslate = (
  translate: Point,
  base: Size,
  scale: number,
  windowSize: number,
): Point => {
  const maxX = Math.max(0, (base.width * scale - windowSize) / 2);
  const maxY = Math.max(0, (base.height * scale - windowSize) / 2);
  return {
    x: normalizeZero(clamp(translate.x, -maxX, maxX)),
    y: normalizeZero(clamp(translate.y, -maxY, maxY)),
  };
};

/** 화면 좌표(DOMRect) 기준 크롭 창 영역을 원본 이미지 좌표계로 변환 */
export const getCropSourceRect = (
  imageRect: RectLike,
  windowRect: RectLike,
  naturalWidth: number,
): CropSourceRect => {
  const ratio = naturalWidth / imageRect.width;
  return {
    sx: (windowRect.left - imageRect.left) * ratio,
    sy: (windowRect.top - imageRect.top) * ratio,
    size: windowRect.width * ratio,
  };
};
