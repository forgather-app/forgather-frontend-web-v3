import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { dismissToday, isDismissedToday } from "./dailyDismiss";

const STORAGE_KEY = "test-daily-dismiss";

describe("dailyDismiss", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("아무것도 저장되지 않았다면 오늘 숨김 처리되지 않은 상태다", () => {
    expect(isDismissedToday(STORAGE_KEY)).toBe(false);
  });

  it("dismissToday 호출 후에는 같은 날 동안 숨김 처리된다", () => {
    dismissToday(STORAGE_KEY);
    expect(isDismissedToday(STORAGE_KEY)).toBe(true);
  });

  it("날짜가 바뀌면 다시 숨김 처리되지 않는다", () => {
    vi.setSystemTime(new Date("2026-09-20T23:00:00"));
    dismissToday(STORAGE_KEY);

    vi.setSystemTime(new Date("2026-09-21T01:00:00"));
    expect(isDismissedToday(STORAGE_KEY)).toBe(false);
  });

  it("다른 key로 저장된 값은 영향을 주지 않는다", () => {
    dismissToday("other-key");
    expect(isDismissedToday(STORAGE_KEY)).toBe(false);
  });
});
