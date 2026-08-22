import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useDelayedLoading from "./useDelayedLoading";

describe("useDelayedLoading", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("초기 렌더에서는 false를 반환한다", () => {
    const { result } = renderHook(() => useDelayedLoading(true, 200));

    expect(result.current).toBe(false);
  });

  it("delayMs가 지나기 전에 로딩이 끝나면 true를 반환하지 않는다", () => {
    const { result, rerender } = renderHook(
      ({ isLoading }) => useDelayedLoading(isLoading, 200),
      { initialProps: { isLoading: true } },
    );

    act(() => {
      vi.advanceTimersByTime(100);
    });
    rerender({ isLoading: false });
    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe(false);
  });

  it("delayMs 이상 로딩이 유지되면 true를 반환한다", () => {
    const { result } = renderHook(() => useDelayedLoading(true, 200));

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe(true);
  });

  it("true를 반환한 뒤 로딩이 끝나면 다시 false를 반환한다", () => {
    const { result, rerender } = renderHook(
      ({ isLoading }) => useDelayedLoading(isLoading, 200),
      { initialProps: { isLoading: true } },
    );

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe(true);

    rerender({ isLoading: false });
    expect(result.current).toBe(false);
  });
});
