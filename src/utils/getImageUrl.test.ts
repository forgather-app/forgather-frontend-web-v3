import { afterEach, describe, expect, it, vi } from "vitest";
import { getImageUrl } from "./getImageUrl";

const BASE_URL = "https://dysvfn6jyq7o7.cloudfront.net";

describe("getImageUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("v3 경로는 base URL과 그대로 결합한다", () => {
    vi.stubEnv("VITE_IMAGE_BASE_URL", BASE_URL);

    expect(
      getImageUrl(
        "images/prod/spaces/60c795d381/guestbook/6d6dd204-a9bd-4fb1-ae6f-47237143857d.webp",
      ),
    ).toBe(
      `${BASE_URL}/images/prod/spaces/60c795d381/guestbook/6d6dd204-a9bd-4fb1-ae6f-47237143857d.webp`,
    );
  });

  it("레거시(photogather/) 경로는 원본이 아닌 thumbnails 경로로 변환한다", () => {
    vi.stubEnv("VITE_IMAGE_BASE_URL", BASE_URL);

    expect(
      getImageUrl(
        "photogather/v2/spaces/16ya758bhc/product/860b87ee-a3ca-4aa5-abe8-d28ad3f90ecb.jpg",
      ),
    ).toBe(
      `${BASE_URL}/photogather/v2/spaces/16ya758bhc/product/thumbnails/860b87ee-a3ca-4aa5-abe8-d28ad3f90ecb_x800.webp`,
    );
  });

  it("레거시 경로는 preset을 지정하면 해당 크기로 변환한다", () => {
    vi.stubEnv("VITE_IMAGE_BASE_URL", BASE_URL);

    expect(
      getImageUrl(
        "photogather/v2/spaces/16ya758bhc/product/860b87ee-a3ca-4aa5-abe8-d28ad3f90ecb.jpg",
        "300",
      ),
    ).toBe(
      `${BASE_URL}/photogather/v2/spaces/16ya758bhc/product/thumbnails/860b87ee-a3ca-4aa5-abe8-d28ad3f90ecb_x300.webp`,
    );
  });

  it("레거시 경로의 확장자와 무관하게 항상 webp로 변환한다", () => {
    vi.stubEnv("VITE_IMAGE_BASE_URL", BASE_URL);

    expect(
      getImageUrl("photogather/v2/spaces/16ya758bhc/guestbook/abcde.png"),
    ).toBe(
      `${BASE_URL}/photogather/v2/spaces/16ya758bhc/guestbook/thumbnails/abcde_x800.webp`,
    );
  });

  it("앞에 슬래시가 붙은 경로도 정상적으로 처리한다", () => {
    vi.stubEnv("VITE_IMAGE_BASE_URL", BASE_URL);

    expect(
      getImageUrl(
        "/photogather/v2/spaces/16ya758bhc/product/860b87ee-a3ca-4aa5-abe8-d28ad3f90ecb.jpg",
      ),
    ).toBe(
      `${BASE_URL}/photogather/v2/spaces/16ya758bhc/product/thumbnails/860b87ee-a3ca-4aa5-abe8-d28ad3f90ecb_x800.webp`,
    );
  });

  it("base URL 끝에 슬래시가 있어도 중복 없이 결합한다", () => {
    vi.stubEnv("VITE_IMAGE_BASE_URL", `${BASE_URL}/`);

    expect(getImageUrl("images/prod/spaces/60c795d381/guestbook/a.webp")).toBe(
      `${BASE_URL}/images/prod/spaces/60c795d381/guestbook/a.webp`,
    );
  });
});
