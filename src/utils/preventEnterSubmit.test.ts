import { describe, expect, it, vi } from "vitest";
import { preventEnterSubmit } from "./preventEnterSubmit";

const createEvent = (key: string, target: EventTarget) => ({
  key,
  target,
  preventDefault: vi.fn(),
});

describe("preventEnterSubmit", () => {
  it("input에서 Enter를 누르면 기본 동작(폼 제출)을 막는다", () => {
    const event = createEvent("Enter", document.createElement("input"));

    preventEnterSubmit(event);

    expect(event.preventDefault).toHaveBeenCalledOnce();
  });

  it("Enter가 아닌 키는 막지 않는다", () => {
    const event = createEvent("a", document.createElement("input"));

    preventEnterSubmit(event);

    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it("textarea의 Enter는 줄바꿈을 유지하도록 막지 않는다", () => {
    const event = createEvent("Enter", document.createElement("textarea"));

    preventEnterSubmit(event);

    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it("button의 Enter는 키보드 활성화를 유지하도록 막지 않는다", () => {
    const event = createEvent("Enter", document.createElement("button"));

    preventEnterSubmit(event);

    expect(event.preventDefault).not.toHaveBeenCalled();
  });
});
