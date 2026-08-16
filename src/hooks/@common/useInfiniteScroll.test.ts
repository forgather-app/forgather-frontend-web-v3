import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useInfiniteScroll from "./useInfiniteScroll";

type ObserverCallback = (entries: IntersectionObserverEntry[]) => void;

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];

  static instances: MockIntersectionObserver[] = [];

  callback: ObserverCallback;
  observedElement: Element | null = null;
  disconnected = false;

  constructor(callback: ObserverCallback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }

  observe(element: Element) {
    this.observedElement = element;
  }

  unobserve() {
    this.observedElement = null;
  }

  disconnect() {
    this.disconnected = true;
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  intersect(isIntersecting: boolean) {
    this.callback([{ isIntersecting } as IntersectionObserverEntry]);
  }
}

describe("useInfiniteScroll", () => {
  beforeEach(() => {
    MockIntersectionObserver.instances = [];
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("targetRef 콜백 함수를 반환한다", () => {
    const { result } = renderHook(() =>
      useInfiniteScroll({
        hasNextPage: true,
        isFetchingNextPage: false,
        onIntersect: vi.fn(),
      }),
    );

    expect(typeof result.current.targetRef).toBe("function");
  });

  it("감지 요소가 화면에 들어오면 onIntersect를 호출한다", () => {
    const onIntersect = vi.fn();
    const { result } = renderHook(() =>
      useInfiniteScroll({
        hasNextPage: true,
        isFetchingNextPage: false,
        onIntersect,
      }),
    );

    result.current.targetRef(document.createElement("div"));
    MockIntersectionObserver.instances.at(-1)?.intersect(true);

    expect(onIntersect).toHaveBeenCalled();
  });

  it("hasNextPage가 false면 onIntersect를 호출하지 않는다", () => {
    const onIntersect = vi.fn();
    const { result } = renderHook(() =>
      useInfiniteScroll({
        hasNextPage: false,
        isFetchingNextPage: false,
        onIntersect,
      }),
    );

    result.current.targetRef(document.createElement("div"));
    MockIntersectionObserver.instances.at(-1)?.intersect(true);

    expect(onIntersect).not.toHaveBeenCalled();
  });

  it("isFetchingNextPage가 true면 onIntersect를 호출하지 않는다", () => {
    const onIntersect = vi.fn();
    const { result } = renderHook(() =>
      useInfiniteScroll({
        hasNextPage: true,
        isFetchingNextPage: true,
        onIntersect,
      }),
    );

    result.current.targetRef(document.createElement("div"));
    MockIntersectionObserver.instances.at(-1)?.intersect(true);

    expect(onIntersect).not.toHaveBeenCalled();
  });

  it("감지 요소가 화면 밖이면 onIntersect를 호출하지 않는다", () => {
    const onIntersect = vi.fn();
    const { result } = renderHook(() =>
      useInfiniteScroll({
        hasNextPage: true,
        isFetchingNextPage: false,
        onIntersect,
      }),
    );

    result.current.targetRef(document.createElement("div"));
    MockIntersectionObserver.instances.at(-1)?.intersect(false);

    expect(onIntersect).not.toHaveBeenCalled();
  });

  it("감지 요소가 사라지면 observer를 disconnect한다", () => {
    const { result } = renderHook(() =>
      useInfiniteScroll({
        hasNextPage: true,
        isFetchingNextPage: false,
        onIntersect: vi.fn(),
      }),
    );

    result.current.targetRef(document.createElement("div"));
    const observer = MockIntersectionObserver.instances.at(-1);
    result.current.targetRef(null);

    expect(observer?.disconnected).toBe(true);
  });

  it("언마운트 시 observer를 disconnect한다", () => {
    const { result, unmount } = renderHook(() =>
      useInfiniteScroll({
        hasNextPage: true,
        isFetchingNextPage: false,
        onIntersect: vi.fn(),
      }),
    );

    result.current.targetRef(document.createElement("div"));
    const observer = MockIntersectionObserver.instances.at(-1);
    unmount();

    expect(observer?.disconnected).toBe(true);
  });
});
