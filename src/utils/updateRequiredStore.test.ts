import { beforeEach, describe, expect, it, vi } from "vitest";

// NOTE: updateRequiredStore는 모듈 스코프 싱글톤(닫는 API 없음)이라, 테스트 간 상태가
// 새어나가지 않도록 매 테스트마다 모듈을 새로 import한다.
describe("updateRequiredStore", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("초기 상태는 닫힘(false)이다", async () => {
    const { updateRequiredStore } = await import("./updateRequiredStore");
    expect(updateRequiredStore.getSnapshot()).toBe(false);
  });

  it("open()을 호출하면 상태가 true로 바뀌고 구독자에게 알린다", async () => {
    const { updateRequiredStore } = await import("./updateRequiredStore");
    const listener = vi.fn();
    updateRequiredStore.subscribe(listener);

    updateRequiredStore.open();

    expect(updateRequiredStore.getSnapshot()).toBe(true);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("이미 열린 상태에서 open()을 다시 호출해도 구독자에게 다시 알리지 않는다", async () => {
    const { updateRequiredStore } = await import("./updateRequiredStore");
    const listener = vi.fn();
    updateRequiredStore.subscribe(listener);

    updateRequiredStore.open();
    updateRequiredStore.open();

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("subscribe가 반환한 함수로 구독을 해지할 수 있다", async () => {
    const { updateRequiredStore } = await import("./updateRequiredStore");
    const listener = vi.fn();
    const unsubscribe = updateRequiredStore.subscribe(listener);

    unsubscribe();
    updateRequiredStore.open();

    expect(listener).not.toHaveBeenCalled();
  });
});
