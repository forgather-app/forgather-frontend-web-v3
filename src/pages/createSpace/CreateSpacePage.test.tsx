import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "@/api/apiClient";
import { theme } from "@/styles/theme";
import CreateSpacePage from "./CreateSpacePage";

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
const scrollIntoView = vi.fn();
const originalScrollIntoView = Object.getOwnPropertyDescriptor(
  Element.prototype,
  "scrollIntoView",
);
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
        <CreateSpacePage onSuccess={onSuccess} />
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
    .filter((config) => config.method === "POST");
const next = async () => {
  fireEvent.click(screen.getByRole("button", { name: "다음" }));
  return screen.findByRole("heading", { name: "기간과 장소를 추가해주세요." });
};
const back = () =>
  fireEvent.click(screen.getByRole("button", { name: "뒤로 가기" }));
const getForm = (name = "완료") => {
  const form = screen.getByRole("button", { name }).closest("form");
  if (!form) throw new Error("폼을 찾을 수 없습니다.");
  return form;
};
const submit = async () => {
  await waitFor(() =>
    expect(screen.getByRole("button", { name: "완료" })).toBeEnabled(),
  );
  fireEvent.click(screen.getByRole("button", { name: "완료" }));
  await waitFor(() => expect(mutationCalls()).toHaveLength(1));
  return JSON.parse(mutationCalls()[0].data as string);
};
const choosePlace = async () => {
  fireEvent.click(screen.getByRole("button", { name: "카카오맵 연동하기" }));
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
  scrollIntoView.mockClear();
  Object.defineProperty(Element.prototype, "scrollIntoView", {
    configurable: true,
    value: scrollIntoView,
  });
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
    if (config.method === "GET") return { data: { data: original } };
    return { data: { data: { spaceCode: "created-space" } } };
  });
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.useRealTimers();
  if (originalScrollIntoView) {
    Object.defineProperty(
      Element.prototype,
      "scrollIntoView",
      originalScrollIntoView,
    );
  } else {
    Reflect.deleteProperty(Element.prototype, "scrollIntoView");
  }
});

const fillIntroduction = () => {
  change("스페이스명", "작성 중인 스페이스");
  change("스페이스 소개", "작성 중인 소개");
  change("링크 URL", "https://example.com/draft");
  change("링크 제목", "작성 중인 링크");
};

const choosePeriod = () => {
  vi.setSystemTime(new Date(2026, 9, 15, 12));
  fireEvent.click(screen.getByRole("button", { name: "시작일" }));
  const cells = screen.getAllByRole("gridcell");
  const startCell = cells.find((cell) => cell.textContent === "20");
  const endCell = cells.find((cell) => cell.textContent === "22");
  if (!startCell || !endCell) throw new Error("달력 날짜를 찾을 수 없습니다.");
  fireEvent.click(within(startCell).getByRole("button"));
  fireEvent.click(within(endCell).getByRole("button"));
  fireEvent.click(screen.getByRole("button", { name: "확인" }));
};

describe("CreateSpacePage 생성 단계", () => {
  it("현재 단계의 필드, 진행률과 제목을 표시하고 전환할 때 스크롤과 포커스를 이동한다", async () => {
    renderPage();
    expect(
      screen.getByRole("heading", { name: "스페이스를 소개해주세요!" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "50",
    );
    for (const name of [
      "스페이스명",
      "스페이스 소개",
      "링크 URL",
      "링크 제목",
    ]) {
      expect(screen.getByRole("textbox", { name })).toBeInTheDocument();
    }
    expect(screen.getByRole("textbox", { name: "링크 URL" })).toHaveAttribute(
      "placeholder",
      "관련된 링크를 첨부해주세요.",
    );
    expect(
      screen.queryByRole("button", { name: "시작일" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("textbox", { name: "전시 장소" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("radio")).not.toBeInTheDocument();
    expect(screen.queryByRole("switch")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "완료" }),
    ).not.toBeInTheDocument();

    const main = screen.getByRole("main");
    main.scrollTop = 240;
    change("스페이스명", "새 전시");
    expect(await next()).toHaveFocus();
    expect(main.scrollTop).toBe(0);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "100",
    );
    expect(screen.getByRole("button", { name: "시작일" })).toHaveTextContent(
      "시작일",
    );
    expect(screen.getByRole("button", { name: "종료일" })).toHaveTextContent(
      "종료일",
    );
    expect(screen.getByRole("textbox", { name: "전시 장소" })).toHaveAttribute(
      "placeholder",
      "장소명을 입력해주세요.",
    );
    expect(
      screen.getByRole("button", { name: "카카오맵 연동하기" }),
    ).toBeDisabled();
    expect(screen.getByRole("radio", { name: "항상 작성 가능" })).toBeChecked();
    expect(
      screen.getByRole("switch", { name: "방명록 나만 보기" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "완료" })).toBeInTheDocument();
    for (const name of [
      "스페이스명",
      "스페이스 소개",
      "링크 URL",
      "링크 제목",
    ]) {
      expect(screen.queryByRole("textbox", { name })).not.toBeInTheDocument();
    }
    expect(
      screen.queryByRole("button", { name: "다음" }),
    ).not.toBeInTheDocument();

    main.scrollTop = 150;
    back();
    expect(
      screen.getByRole("heading", { name: "스페이스를 소개해주세요!" }),
    ).toHaveFocus();
    expect(main.scrollTop).toBe(0);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "50",
    );
    expect(mutationCalls()).toHaveLength(0);
  });

  it("1단계에서 뒤로 가기를 누르면 브라우저 기록을 사용한다", () => {
    const historyBack = vi
      .spyOn(window.history, "back")
      .mockImplementation(() => {});
    renderPage();
    back();
    expect(historyBack).toHaveBeenCalledOnce();
  });

  it("스페이스명이 필수 입력 조건을 충족할 때만 다음을 활성화한다", async () => {
    const user = userEvent.setup();
    renderPage();
    const name = screen.getByRole("textbox", { name: "스페이스명" });
    const nextButton = screen.getByRole("button", { name: "다음" });
    expect(nextButton).toBeDisabled();

    await user.type(name, "   ");
    expect(nextButton).toBeDisabled();

    await user.clear(name);
    await user.type(name, "가".repeat(30));
    expect(nextButton).toBeEnabled();

    await user.type(name, "가");
    expect(nextButton).toBeDisabled();

    await user.keyboard("{Backspace}");
    expect(nextButton).toBeEnabled();

    await user.clear(name);
    expect(nextButton).toBeDisabled();
    expect(mutationCalls()).toHaveLength(0);
  });

  it.each([
    ["스페이스명", "   ", "스페이스명을 입력해주세요."],
    ["스페이스명", "가".repeat(31), "30자 이내로 입력해주세요."],
    ["스페이스 소개", "가".repeat(501), "500자 이내로 입력해주세요."],
    ["링크 제목", "가".repeat(31), "30자 이내로 입력해주세요."],
    ["링크 URL", "javascript:alert(1)", "올바른 URL 형식을 입력해주세요."],
  ])("%s에 유효하지 않은 값을 입력하면 1단계에 머문다", async (name, value, errorMessage) => {
    renderPage();
    change("스페이스명", "새 전시");
    change(name, value);
    await act(async () => {
      if (name === "스페이스명") {
        fireEvent.submit(getForm("다음"));
      } else {
        const nextButton = screen.getByRole("button", { name: "다음" });
        expect(nextButton).toBeEnabled();
        fireEvent.click(nextButton);
      }
    });
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "50",
    );
    expect(screen.getByRole("alert")).toHaveTextContent(errorMessage);
    expect(mutationCalls()).toHaveLength(0);
  });

  it("1단계에서 Enter를 눌러도 생성 요청을 보내지 않는다", async () => {
    const user = userEvent.setup();
    renderPage();
    const name = screen.getByRole("textbox", { name: "스페이스명" });
    await user.type(name, "새 전시{Enter}");
    expect(
      await screen.findByRole("heading", {
        name: "기간과 장소를 추가해주세요.",
      }),
    ).toHaveFocus();
    expect(mutationCalls()).toHaveLength(0);
  });

  it("다음을 더블클릭해도 생성 요청 없이 2단계로 이동한다", async () => {
    const user = userEvent.setup();
    const { onSuccess } = renderPage();
    change("스페이스명", "새 전시");

    await user.dblClick(screen.getByRole("button", { name: "다음" }));
    const complete = await screen.findByRole("button", { name: "완료" });
    expect(mutationCalls()).toHaveLength(0);

    await user.click(complete);
    await waitFor(() =>
      expect(onSuccess).toHaveBeenCalledExactlyOnceWith("created-space"),
    );
    expect(mutationCalls()).toHaveLength(1);
  });

  it("뒤로 갔다 돌아와도 각 단계의 입력과 설정을 보존하고 전체 입력을 전송한다", async () => {
    const { onSuccess } = renderPage();
    fillIntroduction();
    await next();
    change("전시 장소", "직접 입력한 장소");
    await choosePlace();
    choosePeriod();
    fireEvent.click(
      screen.getByRole("radio", { name: "전시 기간에만 작성 가능" }),
    );
    fireEvent.click(screen.getByRole("switch", { name: "방명록 나만 보기" }));

    back();
    expect(screen.getByRole("textbox", { name: "스페이스명" })).toHaveValue(
      "작성 중인 스페이스",
    );
    expect(screen.getByRole("textbox", { name: "스페이스 소개" })).toHaveValue(
      "작성 중인 소개",
    );
    expect(screen.getByRole("textbox", { name: "링크 URL" })).toHaveValue(
      "https://example.com/draft",
    );
    expect(screen.getByRole("textbox", { name: "링크 제목" })).toHaveValue(
      "작성 중인 링크",
    );
    await next();
    expect(screen.getByRole("textbox", { name: "전시 장소" })).toHaveValue(
      "직접 입력한 장소",
    );
    expect(
      screen.getByRole("group", { name: "카카오맵 연동 완료" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: "전시 기간에만 작성 가능" }),
    ).toBeChecked();
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("button", { name: "시작일" })).toHaveTextContent(
      "2026. 10. 20 (화)",
    );
    expect(screen.getByRole("button", { name: "종료일" })).toHaveTextContent(
      "2026. 10. 22 (목)",
    );
    expect(mutationCalls()).toHaveLength(0);
    expect(await submit()).toEqual({
      name: "작성 중인 스페이스",
      description: "작성 중인 소개",
      linkUrl: "https://example.com/draft",
      linkName: "작성 중인 링크",
      exhibitionStartDate: "2026-10-20",
      exhibitionEndDate: "2026-10-22",
      placeName: "직접 입력한 장소",
      placeId: "123",
      placeUrl: "https://place.map.kakao.com/123?original=true",
      guestBookWritingPolicy: "EXHIBITION_PERIOD",
      isPublic: false,
    });
    await waitFor(() =>
      expect(onSuccess).toHaveBeenCalledExactlyOnceWith("created-space"),
    );
  });

  it("2단계의 오류는 1단계의 다음을 막지 않으며 완료는 계속 차단한다", async () => {
    renderPage();
    change("스페이스명", "새 전시");
    await next();
    change("전시 장소", "직접 입력한 장소");
    await choosePlace();
    change("전시 장소", "   ");
    fireEvent.click(
      screen.getByRole("radio", { name: "전시 기간에만 작성 가능" }),
    );
    expect(
      await screen.findByText(
        "장소명을 입력하거나 등록된 장소를 제거해주세요.",
      ),
    ).toBeInTheDocument();
    back();
    await next();
    expect(
      await screen.findByText(
        "장소명을 입력하거나 등록된 장소를 제거해주세요.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "전시 기간에만 작성하도록 설정하려면 전시 기간을 입력해주세요.",
      ),
    ).toBeInTheDocument();
    const complete = screen.getByRole("button", { name: "완료" });
    expect(complete).toBeDisabled();
    await act(async () => {
      fireEvent.submit(getForm());
    });
    expect(mutationCalls()).toHaveLength(0);
  });

  it.each([
    "성공",
    "실패",
  ])("완료 요청이 %s하기 전까지 중복 제출과 뒤로 가기를 막는다", async (result) => {
    const { onSuccess } = renderPage();
    change("스페이스명", "새 전시");
    await next();
    let finishRequest = () => {};
    const responsePending = new Promise<void>((resolve) => {
      finishRequest = resolve;
    });
    request.mockImplementationOnce(async () => {
      await responsePending;
      if (result === "실패") throw new Error("offline");
      return { data: { data: { spaceCode: "created-space" } } };
    });
    const complete = screen.getByRole("button", { name: "완료" });
    const backButton = screen.getByRole("button", { name: "뒤로 가기" });
    await waitFor(() => expect(complete).toBeEnabled());
    const form = getForm();
    await act(async () => {
      fireEvent.submit(form);
      fireEvent.submit(form);
    });
    await waitFor(() => expect(mutationCalls()).toHaveLength(1));
    expect(complete).toBeDisabled();
    expect(backButton).toBeDisabled();
    back();
    expect(
      screen.getByRole("heading", { name: "기간과 장소를 추가해주세요." }),
    ).toBeInTheDocument();
    await act(async () => {
      fireEvent.submit(form);
      finishRequest();
    });
    await waitFor(() => expect(backButton).toBeEnabled());
    expect(complete).toBeEnabled();
    if (result === "성공") {
      expect(onSuccess).toHaveBeenCalledExactlyOnceWith("created-space");
    } else {
      expect(onSuccess).not.toHaveBeenCalled();
    }
    expect(mutationCalls()).toHaveLength(1);
  });
});

describe("CreateSpacePage 장소 연결", () => {
  it("조합 확인 Enter는 IME 기본 동작을 유지하며 바깥 폼을 저장하지 않는다", async () => {
    const user = userEvent.setup();
    renderPage();
    change("스페이스명", "작성 중인 스페이스");
    await next();
    change("전시 장소", "직접 입력한 장소");
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "완료" })).toBeEnabled(),
    );
    await user.click(screen.getByRole("button", { name: "카카오맵 연동하기" }));
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
    change("스페이스명", "작성 중인 스페이스");
    await next();
    change("전시 장소", "직접 입력한 장소");
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "완료" })).toBeEnabled(),
    );
    await user.click(screen.getByRole("button", { name: "카카오맵 연동하기" }));
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
    expect(screen.getByRole("textbox", { name: "전시 장소" })).toHaveValue(
      "직접 입력한 장소",
    );
    expect(
      screen.getByRole("group", { name: "카카오맵 연동 완료" }),
    ).toHaveFocus();
    expect(mutationCalls()).toHaveLength(0);
    expect(await submit()).toMatchObject({
      placeName: "직접 입력한 장소",
      placeId: "123",
      placeUrl: "https://place.map.kakao.com/123?original=true",
    });
  });

  it("생성 요청에는 직접 입력한 장소명과 선택한 ID, 원본 URL만 저장한다", async () => {
    const { onSuccess } = renderPage();
    change("스페이스명", "새 스페이스");
    await next();
    change("전시 장소", "직접 입력한 장소");
    await choosePlace();
    const payload = await submit();
    expect(payload).toEqual({
      guestBookWritingPolicy: "ALWAYS",
      name: "새 스페이스",
      description: "",
      isPublic: true,
      linkName: "",
      linkUrl: "",
      placeName: "직접 입력한 장소",
      placeId: "123",
      placeUrl: "https://place.map.kakao.com/123?original=true",
    });
    expect(JSON.stringify(payload)).not.toContain("저장되면 안 되는");
    await waitFor(() =>
      expect(onSuccess).toHaveBeenCalledWith("created-space"),
    );
  });
  it("연결한 장소명을 비우면 오류를 표시하고 생성 요청을 막으며 해제 후 저장한다", async () => {
    renderPage();
    change("스페이스명", "새 스페이스");
    await next();
    change("전시 장소", "직접 입력한 장소");
    await choosePlace();
    change("전시 장소", "   ");
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "장소명을 입력하거나 등록된 장소를 제거해주세요.",
    );
    expect(screen.getByRole("button", { name: "완료" })).toBeDisabled();
    await act(async () => {
      fireEvent.submit(getForm());
    });
    expect(mutationCalls()).toHaveLength(0);
    fireEvent.click(screen.getByRole("button", { name: "해제하기" }));
    expect(await submit()).toMatchObject({
      placeName: "",
      placeId: "",
      placeUrl: "",
    });
  });
  it.each([
    false,
    true,
  ])("검색 닫기 후 전체 폼을 보존한다 (검색 실패: %s)", async (failure) => {
    renderPage();
    fillIntroduction();
    await next();
    change("전시 장소", "직접 입력한 장소");
    fireEvent.click(screen.getByRole("switch", { name: "방명록 나만 보기" }));
    choosePeriod();
    const dates = [
      screen.getByRole("button", { name: "시작일" }).textContent,
      screen.getByRole("button", { name: "종료일" }).textContent,
    ];
    fireEvent.click(screen.getByRole("button", { name: "카카오맵 연동하기" }));
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
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
    expect([
      screen.getByRole("button", { name: "시작일" }).textContent,
      screen.getByRole("button", { name: "종료일" }).textContent,
    ]).toEqual(dates);
    expect(await submit()).toMatchObject({
      name: "작성 중인 스페이스",
      description: "작성 중인 소개",
      isPublic: false,
      linkUrl: "https://example.com/draft",
      linkName: "작성 중인 링크",
      placeName: "직접 입력한 장소",
      placeId: "",
      placeUrl: "",
    });
  });
});

describe("CreateSpacePage 작성 정책", () => {
  it("기본 정책을 전송한다", async () => {
    renderPage();
    change("스페이스명", "새 전시");
    await next();
    expect(screen.getByRole("radio", { name: "항상 작성 가능" })).toBeChecked();
    expect(await submit()).toMatchObject({ guestBookWritingPolicy: "ALWAYS" });
  });
  it("날짜 없는 제한을 유지하고 저장을 차단하며 상시로 바꾸면 해제한다", async () => {
    renderPage();
    change("스페이스명", "새 전시");
    await next();
    fireEvent.click(
      screen.getByRole("radio", { name: "전시 기간에만 작성 가능" }),
    );
    expect(
      screen.getByRole("radio", { name: "전시 기간에만 작성 가능" }),
    ).toBeChecked();
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "전시 기간에만 작성하도록 설정하려면 전시 기간을 입력해주세요.",
    );
    expect(screen.getByRole("button", { name: "시작일" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByRole("button", { name: "완료" })).toBeDisabled();
    expect(scrollIntoView).toHaveBeenCalled();
    await act(async () => {
      fireEvent.submit(getForm());
    });
    expect(mutationCalls()).toHaveLength(0);
    fireEvent.click(screen.getByRole("radio", { name: "항상 작성 가능" }));
    await waitFor(() =>
      expect(screen.queryByRole("alert")).not.toBeInTheDocument(),
    );
    expect(await submit()).toMatchObject({ guestBookWritingPolicy: "ALWAYS" });
  });
  it("제한 정책에서 날짜를 삭제하고 다시 입력할 수 있다", async () => {
    renderPage();
    change("스페이스명", "새 전시");
    await next();
    choosePeriod();
    fireEvent.click(
      screen.getByRole("radio", { name: "전시 기간에만 작성 가능" }),
    );
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "완료" })).toBeEnabled(),
    );
    fireEvent.click(screen.getByRole("button", { name: "시작일 삭제" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "전시 기간에만 작성하도록 설정하려면 전시 기간을 입력해주세요.",
    );
    expect(
      screen.getByRole("radio", { name: "전시 기간에만 작성 가능" }),
    ).toBeChecked();
    expect(screen.getByRole("button", { name: "완료" })).toBeDisabled();
    choosePeriod();
    await waitFor(() =>
      expect(screen.queryByRole("alert")).not.toBeInTheDocument(),
    );
    expect(await submit()).toMatchObject({
      guestBookWritingPolicy: "EXHIBITION_PERIOD",
    });
  });
});
