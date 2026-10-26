import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "@/api/apiClient";
import { theme } from "@/styles/theme";
import EditSpacePage from "./EditSpacePage";

const providerPlace = {
  placeName: "저장되면 안 되는 검색 이름",
  roadAddress: "저장되면 안 되는 도로명 주소",
  address: "저장되면 안 되는 지번 주소",
  placeId: "123",
  placeUrl: "https://place.map.kakao.com/123?original=true",
};
const original = {
  name: "기존 스페이스",
  description: "기존 소개",
  isPublic: true,
  linkName: "기존 링크",
  linkUrl: "https://example.com/exhibition",
  exhibitionStartDate: "2026-10-20",
  exhibitionEndDate: "2026-10-22",
  placeName: "직접 입력한 장소",
  placeId: "123",
  placeUrl: providerPlace.placeUrl,
};
let failSearch = false;
let savedPolicy: "ALWAYS" | "EXHIBITION_PERIOD" = "ALWAYS";
const spyRequest = () => vi.spyOn(apiClient, "request");
let request: ReturnType<typeof spyRequest>;
const renderPage = () => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  const onSuccess = vi.fn();
  const invalidate = vi.spyOn(client, "invalidateQueries");
  render(
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <EditSpacePage spaceId="test" onSuccess={onSuccess} />
      </ThemeProvider>
    </QueryClientProvider>,
  );
  return { client, onSuccess, invalidate };
};
const change = (name: string, value: string) =>
  fireEvent.change(screen.getByRole("textbox", { name }), {
    target: { value },
  });
const mutationCalls = () =>
  request.mock.calls
    .map(([config]) => config)
    .filter((config) => config.method === "PATCH");
const submit = async () => {
  await waitFor(() =>
    expect(screen.getByRole("button", { name: "완료" })).toBeEnabled(),
  );
  fireEvent.click(screen.getByRole("button", { name: "완료" }));
  await waitFor(() => expect(mutationCalls()).toHaveLength(1));
  return JSON.parse(mutationCalls()[0].data as string);
};
const choosePlace = async () => {
  fireEvent.click(screen.getByRole("button", { name: "장소 검색" }));
  fireEvent.change(screen.getByRole("searchbox"), {
    target: { value: "검색어" },
  });
  fireEvent.click(screen.getByRole("button", { name: "검색 실행" }));
  fireEvent.click(
    await screen.findByRole("button", {
      name: `${providerPlace.placeName} 선택`,
    }),
  );
};
beforeEach(() => {
  failSearch = false;
  savedPolicy = "ALWAYS";
  Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
    configurable: true,
    value: function (this: HTMLDialogElement) {
      this.open = true;
    },
  });
  Object.defineProperty(HTMLDialogElement.prototype, "close", {
    configurable: true,
    value: function (this: HTMLDialogElement) {
      this.open = false;
    },
  });
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      disconnect() {}
    },
  );
  request = spyRequest().mockImplementation(async (config) => {
    if (config.url?.includes("/places")) {
      if (failSearch) throw new Error("offline");
      return { data: { data: { places: [providerPlace], hasNext: false } } };
    }
    if (config.method === "GET")
      return {
        data: { data: { ...original, guestBookWritingPolicy: savedPolicy } },
      };
    return { data: { data: { spaceCode: "created-space" } } };
  });
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("EditSpacePage 장소 연결", () => {
  it("조합 확인 Enter는 IME 기본 동작을 유지하며 바깥 폼을 저장하지 않는다", async () => {
    const user = userEvent.setup();
    renderPage();
    await screen.findByRole("textbox", { name: "전시 장소명" });
    fireEvent.click(screen.getByRole("button", { name: "카카오맵 연결 해제" }));
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "완료" })).toBeEnabled(),
    );
    await user.click(screen.getByRole("button", { name: "장소 검색" }));
    const input = screen.getByRole("searchbox");
    fireEvent.compositionStart(input);
    await user.type(input, "한글");
    await user.keyboard("{Enter}");
    fireEvent.compositionEnd(input, { data: "한글" });
    expect(mutationCalls()).toHaveLength(0);
    expect(
      request.mock.calls.filter(([config]) => config.url?.includes("/places")),
    ).toHaveLength(0);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(input).toHaveFocus();
    expect(input).toHaveValue("한글");
  });

  it.each([
    "",
    "검색어",
  ])("검색 입력 Enter는 %s 검색어에서도 저장하지 않고 결과 버튼 Enter는 선택한다", async (keyword) => {
    const user = userEvent.setup();
    renderPage();
    await screen.findByRole("textbox", { name: "전시 장소명" });
    fireEvent.click(screen.getByRole("button", { name: "카카오맵 연결 해제" }));
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "완료" })).toBeEnabled(),
    );
    await user.click(screen.getByRole("button", { name: "장소 검색" }));
    const input = screen.getByRole("searchbox");
    if (keyword) await user.type(input, keyword);
    await user.keyboard("{Enter}");
    expect(mutationCalls()).toHaveLength(0);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(input).toHaveFocus();
    expect(input).toHaveValue(keyword);
    expect(
      request.mock.calls.filter(([config]) => config.url?.includes("/places")),
    ).toHaveLength(keyword ? 1 : 0);
    if (!keyword) {
      await user.type(input, "검색어");
      await user.keyboard("{Enter}");
    }
    const select = await screen.findByRole("button", {
      name: `${providerPlace.placeName} 선택`,
    });
    select.focus();
    await user.keyboard("{Enter}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "전시 장소명" })).toHaveValue(
      "직접 입력한 장소",
    );
    expect(screen.getByRole("group", { name: "등록된 장소" })).toHaveFocus();
    expect(mutationCalls()).toHaveLength(0);
    expect(await submit()).toMatchObject({
      placeName: "직접 입력한 장소",
      placeId: "123",
      placeUrl: "https://place.map.kakao.com/123?original=true",
    });
  });

  it.each([
    [
      "그대로",
      "직접 입력한 장소",
      "123",
      "https://place.map.kakao.com/123?original=true",
    ],
    [
      "이름만 변경",
      "바꾼 장소",
      "123",
      "https://place.map.kakao.com/123?original=true",
    ],
    ["연결만 해제", "직접 입력한 장소", "", ""],
    ["전체 삭제", "", "", ""],
  ])("기존 세 값을 초기화하고 %s 요청을 정확히 전송한다", async (action, placeName, placeId, placeUrl) => {
    const { onSuccess, invalidate } = renderPage();
    const input = await screen.findByRole("textbox", { name: "전시 장소명" });
    expect(input).toHaveValue("직접 입력한 장소");
    expect(screen.getByText("등록된 장소")).toBeInTheDocument();
    if (action === "이름만 변경") change("전시 장소명", "바꾼 장소");
    if (action === "연결만 해제" || action === "전체 삭제")
      fireEvent.click(
        screen.getByRole("button", { name: "카카오맵 연결 해제" }),
      );
    if (action === "전체 삭제") change("전시 장소명", "   ");
    const payload = await submit();
    expect(payload).toEqual({
      name: "기존 스페이스",
      description: "기존 소개",
      isPublic: true,
      linkName: "기존 링크",
      linkUrl: "https://example.com/exhibition",
      exhibitionStartDate: "2026-10-20",
      exhibitionEndDate: "2026-10-22",
      placeName,
      placeId,
      placeUrl,
    });
    expect(Object.values(payload)).not.toContain(null);
    await waitFor(() => expect(onSuccess).toHaveBeenCalledOnce());
    expect(invalidate).toHaveBeenCalledWith({ queryKey: ["/spaces/test"] });
  });
  it("검색 선택은 직접 입력한 장소명을 덮어쓰거나 주소를 수정 요청에 넣지 않는다", async () => {
    renderPage();
    await screen.findByRole("textbox", { name: "전시 장소명" });
    fireEvent.click(screen.getByRole("button", { name: "카카오맵 연결 해제" }));
    change("전시 장소명", "새로 직접 입력한 장소");
    await choosePlace();
    const payload = await submit();
    expect(payload).toMatchObject({
      placeName: "새로 직접 입력한 장소",
      placeId: "123",
      placeUrl: "https://place.map.kakao.com/123?original=true",
    });
    expect(Object.keys(payload).sort()).toEqual(
      [
        "name",
        "description",
        "isPublic",
        "linkName",
        "linkUrl",
        "exhibitionStartDate",
        "exhibitionEndDate",
        "placeName",
        "placeId",
        "placeUrl",
      ].sort(),
    );
    expect(JSON.stringify(payload)).not.toContain("저장되면 안 되는");
  });
  it("연결 후 빈 이름은 수정 요청을 막고 연결 해제 시 이름을 보존하며 오류를 해제한다", async () => {
    renderPage();
    await screen.findByRole("textbox", { name: "전시 장소명" });
    change("전시 장소명", "   ");
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "장소명을 입력하거나 등록된 장소를 제거해주세요.",
    );
    expect(screen.getByRole("button", { name: "완료" })).toBeDisabled();
    const form = screen.getByRole("button", { name: "완료" }).closest("form");
    if (!form) throw new Error("폼을 찾을 수 없습니다.");
    await act(async () => {
      fireEvent.submit(form);
    });
    expect(mutationCalls()).toHaveLength(0);
    fireEvent.click(screen.getByRole("button", { name: "카카오맵 연결 해제" }));
    expect(screen.getByRole("textbox", { name: "전시 장소명" })).toHaveValue(
      "   ",
    );
    await waitFor(() =>
      expect(screen.queryByRole("alert")).not.toBeInTheDocument(),
    );
    expect(await submit()).toMatchObject({
      placeName: "",
      placeId: "",
      placeUrl: "",
    });
  });
  it.each([
    false,
    true,
  ])("검색 종료 후 작성 중인 수정 폼을 보존한다 (검색 실패: %s)", async (failure) => {
    renderPage();
    await screen.findByRole("textbox", { name: "전시 장소명" });
    change("스페이스명", "수정 중인 스페이스");
    change("스페이스 소개", "수정 중인 소개");
    change("링크 URL", "https://example.com/draft");
    change("링크 제목", "수정 중인 링크");
    fireEvent.click(screen.getByRole("switch"));
    fireEvent.click(screen.getByRole("button", { name: "카카오맵 연결 해제" }));
    fireEvent.click(screen.getByRole("button", { name: "장소 검색" }));
    if (failure) {
      failSearch = true;
      fireEvent.change(screen.getByRole("searchbox"), {
        target: { value: "검색" },
      });
      fireEvent.click(screen.getByRole("button", { name: "검색 실행" }));
      expect(await screen.findByRole("alert")).toHaveTextContent(
        "장소를 불러오지 못했습니다.",
      );
    }
    fireEvent.keyDown(screen.getByRole("searchbox"), { key: "Escape" });
    expect(screen.getByRole("textbox", { name: "스페이스명" })).toHaveValue(
      "수정 중인 스페이스",
    );
    expect(screen.getByRole("textbox", { name: "스페이스 소개" })).toHaveValue(
      "수정 중인 소개",
    );
    expect(screen.getByRole("textbox", { name: "링크 URL" })).toHaveValue(
      "https://example.com/draft",
    );
    expect(screen.getByRole("textbox", { name: "링크 제목" })).toHaveValue(
      "수정 중인 링크",
    );
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("button", { name: "시작일" })).toHaveTextContent(
      "2026.10.20",
    );
    expect(screen.getByRole("button", { name: "종료일" })).toHaveTextContent(
      "2026.10.22",
    );
    expect(await submit()).toMatchObject({
      name: "수정 중인 스페이스",
      description: "수정 중인 소개",
      isPublic: false,
      linkUrl: "https://example.com/draft",
      linkName: "수정 중인 링크",
      exhibitionStartDate: "2026-10-20",
      exhibitionEndDate: "2026-10-22",
      placeName: "직접 입력한 장소",
      placeId: "",
      placeUrl: "",
    });
  });
});

describe("EditSpacePage 작성 정책", () => {
  it("저장된 제한 정책을 복원하고 변경하지 않으면 생략한다", async () => {
    savedPolicy = "EXHIBITION_PERIOD";
    renderPage();
    expect(
      await screen.findByRole("radio", { name: "전시 기간에만 작성 가능" }),
    ).toBeChecked();
    expect(await submit()).not.toHaveProperty("guestBookWritingPolicy");
  });
  it("정책 변경과 기간 삭제를 함께 전송한다", async () => {
    savedPolicy = "EXHIBITION_PERIOD";
    renderPage();
    await screen.findByRole("radio", { name: "전시 기간에만 작성 가능" });
    fireEvent.click(screen.getByRole("button", { name: "시작일 삭제" }));
    fireEvent.click(screen.getByRole("button", { name: "종료일 삭제" }));
    expect(await screen.findByRole("alert")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "완료" })).toBeDisabled();
    fireEvent.click(screen.getByRole("radio", { name: "항상 작성 가능" }));
    const payload = await submit();
    expect(payload).toMatchObject({
      guestBookWritingPolicy: "ALWAYS",
      isDeleteExhibitionPeriod: true,
    });
    expect(payload).not.toHaveProperty("exhibitionStartDate");
    expect(payload).not.toHaveProperty("exhibitionEndDate");
  });
  it("제한 정책으로 변경한 경우 값을 전송한다", async () => {
    renderPage();
    fireEvent.click(
      await screen.findByRole("radio", { name: "전시 기간에만 작성 가능" }),
    );
    expect(await submit()).toMatchObject({
      guestBookWritingPolicy: "EXHIBITION_PERIOD",
    });
  });
});
