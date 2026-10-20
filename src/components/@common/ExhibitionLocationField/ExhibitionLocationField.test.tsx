import { ThemeProvider } from "@emotion/react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { autocapturePropertiesForElement } from "posthog-js/lib/src/autocapture";
import { useState } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "@/api/apiClient";
import { theme } from "@/styles/theme";
import ExhibitionLocationField from "./ExhibitionLocationField";
import {
  type ExhibitionLocationValue,
  validateExhibitionLocation,
} from "./exhibitionLocation";

const empty = { placeName: "", placeId: "", placeUrl: "" };
const Harness = ({
  initial = empty,
}: {
  initial?: ExhibitionLocationValue;
}) => {
  const [value, setValue] = useState(initial);
  const validation = validateExhibitionLocation(value);
  return (
    <>
      <ExhibitionLocationField
        value={value}
        onChange={setValue}
        errorMessage={validation === true ? undefined : validation}
      />
      <output>{JSON.stringify(value)}</output>
    </>
  );
};
const renderField = (initial = empty) =>
  render(
    <ThemeProvider theme={theme}>
      <Harness initial={initial} />
    </ThemeProvider>,
  );
beforeEach(() => {
  // Native closed dialogs cannot receive focus; jsdom otherwise applies React autoFocus early.
  const nativeFocus = HTMLElement.prototype.focus;
  vi.spyOn(HTMLElement.prototype, "focus").mockImplementation(function (
    this: HTMLElement,
    options?: FocusOptions,
  ) {
    const dialog = this.closest("dialog");
    if (dialog && !dialog.open) return;
    nativeFocus.call(this, options);
  });
  let nativeOpener: Element | null = null;
  Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
    configurable: true,
    value: function (this: HTMLDialogElement) {
      nativeOpener = document.activeElement;
      this.open = true;
    },
  });
  Object.defineProperty(HTMLDialogElement.prototype, "close", {
    configurable: true,
    value: function (this: HTMLDialogElement) {
      if (!this.open) return;
      this.open = false;
      if (nativeOpener instanceof HTMLElement && nativeOpener.isConnected) {
        nativeOpener.focus();
      }
    },
  });
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      disconnect() {}
    },
  );
  vi.spyOn(apiClient, "request").mockResolvedValue({
    data: {
      data: {
        places: [
          {
            placeName: "검색 제공자 이름",
            roadAddress: "검색 제공자 주소",
            placeId: "123",
            placeUrl: "https://place.map.kakao.com/123?original=true",
          },
        ],
        hasNext: false,
      },
    },
  });
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("ExhibitionLocationField", () => {
  it("장소를 선택하면 입력칸 대신 등록된 장소 영역으로 포커스를 옮긴다", async () => {
    renderField({ ...empty, placeName: "직접 입력한 장소" });
    const opener = screen.getByRole("button", { name: "장소 검색" });
    opener.focus();
    fireEvent.click(opener);
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "전시" },
    });
    fireEvent.click(screen.getByRole("button", { name: "검색 실행" }));
    fireEvent.click(
      await screen.findByRole("button", { name: "검색 제공자 이름 선택" }),
    );
    expect(opener.isConnected).toBe(false);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("group", { name: "등록된 장소" })).toHaveFocus();
    expect(
      screen.getByRole("textbox", { name: "전시 장소명" }),
    ).not.toHaveFocus();
  });
  it.each([
    "back",
    "escape",
  ])("%s로 검색을 취소하면 등록 버튼으로 포커스를 돌린다", (method) => {
    renderField({ ...empty, placeName: "직접 입력한 장소" });
    const opener = screen.getByRole("button", { name: "장소 검색" });
    opener.focus();
    fireEvent.click(opener);
    expect(screen.getByRole("searchbox")).toHaveFocus();
    if (method === "back")
      fireEvent.click(screen.getByRole("button", { name: "뒤로 가기" }));
    else fireEvent.keyDown(screen.getByRole("searchbox"), { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });
  it("검색 결과의 이름과 주소를 PostHog 자동 수집에서 제외한다", async () => {
    renderField({ ...empty, placeName: "직접 입력한 장소" });
    fireEvent.click(screen.getByRole("button", { name: "장소 검색" }));
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "전시" },
    });
    fireEvent.click(screen.getByRole("button", { name: "검색 실행" }));
    const button = await screen.findByRole("button", {
      name: "검색 제공자 이름 선택",
    });
    const result = autocapturePropertiesForElement(button, {
      e: new MouseEvent("click"),
      maskAllElementAttributes: false,
      maskAllText: false,
      elementsChainAsString: false,
      disableCaptureUrlHashes: false,
    });
    expect(result).toEqual({ props: {}, explicitNoCapture: true });
  });
  it.each([
    "",
    "   ",
  ])("장소명이 %j이면 검색을 비활성하고 입력 후 활성한다", (placeName) => {
    renderField({ ...empty, placeName });
    expect(screen.getByRole("button", { name: "장소 검색" })).toBeDisabled();
    fireEvent.change(screen.getByRole("textbox", { name: "전시 장소명" }), {
      target: { value: "직접 입력" },
    });
    expect(screen.getByRole("button", { name: "장소 검색" })).toBeEnabled();
  });
  it("선택과 이름 편집은 직접 입력한 이름과 연결만 보관하며 검색 결과를 폐기한다", async () => {
    renderField({ ...empty, placeName: "직접 입력한 장소" });
    fireEvent.click(screen.getByRole("button", { name: "장소 검색" }));
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "전시" },
    });
    fireEvent.click(screen.getByRole("button", { name: "검색 실행" }));
    fireEvent.click(
      await screen.findByRole("button", { name: "검색 제공자 이름 선택" }),
    );
    expect(screen.getByRole("textbox", { name: "전시 장소명" })).toHaveValue(
      "직접 입력한 장소",
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByText("등록된 장소")).toBeInTheDocument();
    fireEvent.change(screen.getByRole("textbox", { name: "전시 장소명" }), {
      target: { value: "수정한 장소" },
    });
    expect(screen.getByRole("status").textContent).toBe(
      '{"placeName":"수정한 장소","placeId":"123","placeUrl":"https://place.map.kakao.com/123?original=true"}',
    );
  });
  it("연결 후 빈 이름 오류를 보이고 연결 해제하면 오류와 두 연결값을 제거한다", () => {
    renderField({
      placeName: "이름",
      placeId: "123",
      placeUrl: "https://place.map.kakao.com/123",
    });
    const name = screen.getByRole("textbox", { name: "전시 장소명" });
    fireEvent.change(name, { target: { value: "   " } });
    expect(screen.getByRole("alert")).toHaveTextContent(
      "장소명을 입력하거나 등록된 장소를 제거해주세요.",
    );
    fireEvent.click(screen.getByRole("button", { name: "카카오맵 연결 해제" }));
    expect(name).toHaveValue("   ");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByRole("status").textContent).toBe(
      '{"placeName":"   ","placeId":"","placeUrl":""}',
    );
  });
  it("복합 이모지를 한 글자로 세고 50자를 초과하면 오류를 표시한다", () => {
    renderField({ ...empty, placeName: "👨‍👩‍👧‍👦".repeat(50) });
    expect(screen.getByText("50 / 50자")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    fireEvent.change(screen.getByRole("textbox", { name: "전시 장소명" }), {
      target: { value: "👨‍👩‍👧‍👦".repeat(51) },
    });
    expect(screen.getByRole("alert")).toHaveTextContent("50자 이하");
  });
});
