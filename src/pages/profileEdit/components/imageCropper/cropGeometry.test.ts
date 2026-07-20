import { describe, expect, it } from "vitest";
import {
  clampScale,
  clampTranslate,
  getCropSourceRect,
  getMinScale,
} from "./cropGeometry";

describe("getMinScale", () => {
  it("가로가 긴 이미지는 세로 기준으로 창을 덮는 스케일을 반환한다", () => {
    expect(getMinScale({ width: 400, height: 100 }, 200)).toBe(2);
  });

  it("세로가 긴 이미지는 가로 기준으로 창을 덮는 스케일을 반환한다", () => {
    expect(getMinScale({ width: 100, height: 400 }, 200)).toBe(2);
  });

  it("이미지가 창보다 크면 1 미만의 스케일을 반환한다", () => {
    expect(getMinScale({ width: 400, height: 400 }, 200)).toBe(0.5);
  });
});

describe("clampScale", () => {
  it("범위 안의 스케일은 그대로 반환한다", () => {
    expect(clampScale(2, 1, 4)).toBe(2);
  });

  it("최소 스케일보다 작으면 최소값으로 제한한다", () => {
    expect(clampScale(0.5, 1, 4)).toBe(1);
  });

  it("최대 스케일보다 크면 최대값으로 제한한다", () => {
    expect(clampScale(5, 1, 4)).toBe(4);
  });
});

describe("clampTranslate", () => {
  const base = { width: 400, height: 300 };

  it("이동 범위 안이면 그대로 반환한다", () => {
    expect(clampTranslate({ x: 50, y: 20 }, base, 1, 200)).toEqual({
      x: 50,
      y: 20,
    });
  });

  it("이동 범위를 벗어나면 창이 이미지 안에 머무는 최대치로 제한한다", () => {
    // maxX = (400 - 200) / 2 = 100, maxY = (300 - 200) / 2 = 50
    expect(clampTranslate({ x: 150, y: -80 }, base, 1, 200)).toEqual({
      x: 100,
      y: -50,
    });
  });

  it("스케일이 커지면 이동 가능 범위도 늘어난다", () => {
    // maxX = (800 - 200) / 2 = 300
    expect(clampTranslate({ x: 250, y: 0 }, base, 2, 200)).toEqual({
      x: 250,
      y: 0,
    });
  });

  it("이미지가 창과 같은 크기면 이동할 수 없다", () => {
    expect(
      clampTranslate({ x: 30, y: -30 }, { width: 200, height: 200 }, 1, 200),
    ).toEqual({
      x: 0,
      y: 0,
    });
  });
});

describe("getCropSourceRect", () => {
  it("화면 좌표의 크롭 창을 원본 이미지 좌표로 변환한다", () => {
    const imageRect = { left: 0, top: 0, width: 400 };
    const windowRect = { left: 100, top: 50, width: 200 };
    // 원본 800px, 화면 400px → 배율 2
    expect(getCropSourceRect(imageRect, windowRect, 800)).toEqual({
      sx: 200,
      sy: 100,
      size: 400,
    });
  });

  it("이미지가 창보다 왼쪽 위에 있으면 양수 오프셋을 반환한다", () => {
    const imageRect = { left: -60, top: -40, width: 600 };
    const windowRect = { left: 140, top: 160, width: 200 };
    expect(getCropSourceRect(imageRect, windowRect, 600)).toEqual({
      sx: 200,
      sy: 200,
      size: 200,
    });
  });
});
