import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const encodeWebp = vi.fn();
const resizeImage = vi.fn();

vi.mock("@jsquash/webp", () => ({
  encode: (data: ImageData, options?: unknown) => encodeWebp(data, options),
}));

vi.mock("@jsquash/resize", () => ({
  default: (data: ImageData, options?: unknown) => resizeImage(data, options),
}));

import { convertImageToWebp } from "./convertImageToWebp";

const blobOf = (type: string) => new Blob(["x"], { type });

const stubCanvas = () => {
  const drawImage = vi.fn();
  const getImageData = vi.fn().mockReturnValue({
    data: new Uint8ClampedArray(4),
    width: 1,
    height: 1,
  });
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
    drawImage,
    getImageData,
  } as unknown as CanvasRenderingContext2D);
  return { drawImage, getImageData };
};

describe("convertImageToWebp", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal(
      "createImageBitmap",
      vi.fn().mockResolvedValue({ width: 4032, height: 2268, close: vi.fn() }),
    );
    encodeWebp.mockResolvedValue(new ArrayBuffer(8));
    resizeImage.mockResolvedValue({
      data: new Uint8ClampedArray(4),
      width: 1,
      height: 1,
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("@jsquash/webp의 encode 결과로 image/webp 타입의 Blob을 만든다 (브라우저 네이티브 인코더에 의존하지 않음)", async () => {
    stubCanvas();

    const result = await convertImageToWebp(blobOf("image/jpeg"));

    expect(result.type).toBe("image/webp");
    expect(encodeWebp).toHaveBeenCalledTimes(1);
  });

  it("quality 옵션(0~1)을 jSquash 스케일(0~100)로 변환해 전달한다", async () => {
    stubCanvas();

    await convertImageToWebp(blobOf("image/jpeg"), { quality: 0.8 });

    expect(encodeWebp).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ quality: 80 }),
    );
  });

  it("quality를 지정하지 않으면 기본값(0.92 → 92)을 사용한다", async () => {
    stubCanvas();

    await convertImageToWebp(blobOf("image/jpeg"));

    expect(encodeWebp).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ quality: 92 }),
    );
  });

  it("maxSize보다 원본이 크면 @jsquash/resize를 긴 변 기준으로 축소한 크기로 호출한다", async () => {
    stubCanvas();

    await convertImageToWebp(blobOf("image/jpeg"), { maxSize: 1920 });

    // bitmap 4032x2268, scale = 1920/4032 → 1920x1080
    expect(resizeImage).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ width: 1920, height: 1080 }),
    );
    // 리사이즈 결과가 그대로 인코딩에 전달돼야 한다
    const resizedResult = await resizeImage.mock.results[0].value;
    expect(encodeWebp).toHaveBeenCalledWith(resizedResult, expect.anything());
  });

  it("maxSize보다 원본이 작으면 리사이즈 없이 원본 픽셀 그대로 인코딩한다", async () => {
    vi.stubGlobal(
      "createImageBitmap",
      vi.fn().mockResolvedValue({ width: 800, height: 600, close: vi.fn() }),
    );
    stubCanvas();

    await convertImageToWebp(blobOf("image/jpeg"), { maxSize: 1920 });

    expect(resizeImage).not.toHaveBeenCalled();
  });

  it("캔버스 컨텍스트를 생성하지 못하면 에러를 던진다", async () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);

    await expect(convertImageToWebp(blobOf("image/jpeg"))).rejects.toThrow(
      "캔버스 컨텍스트를 생성하지 못했습니다.",
    );
  });
});
