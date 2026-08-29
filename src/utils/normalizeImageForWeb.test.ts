import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const isHeic = vi.fn();
const heicTo = vi.fn();

vi.mock("heic-to", () => ({
  isHeic: (file: Blob) => isHeic(file),
  heicTo: (args: unknown) => heicTo(args),
}));

import {
  ImageNormalizeError,
  normalizeImageForWeb,
} from "./normalizeImageForWeb";

const blobOf = (type: string) => new Blob(["x"], { type });

describe("normalizeImageForWeb", () => {
  beforeEach(() => {
    isHeic.mockReset();
    heicTo.mockReset();
    vi.stubGlobal(
      "createImageBitmap",
      vi.fn().mockRejectedValue(new Error("decode 불가")),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("표준 이미지(jpeg)는 heic-to를 거치지 않고 원본을 그대로 반환한다", async () => {
    const source = blobOf("image/jpeg");

    const result = await normalizeImageForWeb(source, "photo.jpg");

    expect(result).toEqual({ blob: source, fileName: "photo.jpg" });
    expect(isHeic).not.toHaveBeenCalled();
    expect(heicTo).not.toHaveBeenCalled();
  });

  it("png도 원본을 그대로 반환한다", async () => {
    const source = blobOf("image/png");

    const result = await normalizeImageForWeb(source, "a.png");

    expect(result.blob).toBe(source);
    expect(heicTo).not.toHaveBeenCalled();
  });

  it("MIME이 비어 있어도 HEIC가 아니면(isHeic=false) 원본을 반환한다", async () => {
    isHeic.mockResolvedValue(false);
    const source = blobOf("");

    const result = await normalizeImageForWeb(source, "unknown.bin");

    expect(result.blob).toBe(source);
    expect(heicTo).not.toHaveBeenCalled();
  });

  it("HEIC이고 네이티브 디코딩이 불가하면 JPEG로 변환하고 확장자를 jpg로 바꾼다", async () => {
    isHeic.mockResolvedValue(true);
    const converted = blobOf("image/jpeg");
    heicTo.mockResolvedValue(converted);
    const source = blobOf("image/heic");

    const result = await normalizeImageForWeb(source, "IMG_0001.HEIC");

    expect(heicTo).toHaveBeenCalledWith(
      expect.objectContaining({ blob: source, type: "image/jpeg" }),
    );
    expect(result).toEqual({ blob: converted, fileName: "IMG_0001.jpg" });
  });

  it("HEIC이지만 네이티브 디코딩이 가능하면(Safari 등) 변환 없이 원본을 반환한다", async () => {
    isHeic.mockResolvedValue(true);
    vi.stubGlobal(
      "createImageBitmap",
      vi.fn().mockResolvedValue({ close: vi.fn() }),
    );
    const source = blobOf("image/heic");

    const result = await normalizeImageForWeb(source, "IMG_0002.heic");

    expect(result.blob).toBe(source);
    expect(heicTo).not.toHaveBeenCalled();
  });

  it("파일명이 없으면 기본 이름(image)을 사용하고, 변환 시 image.jpg가 된다", async () => {
    isHeic.mockResolvedValue(true);
    heicTo.mockResolvedValue(blobOf("image/jpeg"));

    const result = await normalizeImageForWeb(blobOf("image/heic"));

    expect(result.fileName).toBe("image.jpg");
  });

  it("heicTo가 실패하면 ImageNormalizeError를 던진다", async () => {
    isHeic.mockResolvedValue(true);
    heicTo.mockRejectedValue(new Error("libheif 오류"));

    await expect(
      normalizeImageForWeb(blobOf("image/heic"), "x.heic"),
    ).rejects.toBeInstanceOf(ImageNormalizeError);
  });
});
