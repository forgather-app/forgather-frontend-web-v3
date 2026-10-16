import "@testing-library/jest-dom/vitest";
import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "@/api/apiClient";
import { theme } from "@/styles/theme";
import GuestArtworkPage from "./GuestArtworkPage";

const spaceResponse = {
  data: {
    name: "테스트 스페이스",
    description: "소개 1줄\n소개 2줄\n소개 3줄",
    host: { nickname: "테스트 작가" },
  },
};
const productsResponse = { data: { products: [] } };

const deferred = () => {
  let resolve!: (value: { data: unknown }) => void;
  const promise = new Promise<{ data: unknown }>((done) => {
    resolve = done;
  });
  return { promise, resolve };
};

const renderPage = (
  queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  }),
) =>
  render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GuestArtworkPage spaceId="test" />
      </ThemeProvider>
    </QueryClientProvider>,
  );

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("스페이스 소개 더보기", () => {
  const mockMeasurements = (scrollHeight: number) => {
    vi.spyOn(HTMLElement.prototype, "scrollHeight", "get").mockReturnValue(
      scrollHeight,
    );
    vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(40);
  };

  it.each([
    "space",
    "products",
  ])("%s 응답이 먼저 와도 잘린 소개에 더보기를 표시한다", async (first) => {
    mockMeasurements(60);
    const space = deferred();
    const products = deferred();
    vi.spyOn(apiClient, "request").mockImplementation(
      (config) =>
        (config.url?.endsWith("/products")
          ? products.promise
          : space.promise) as ReturnType<typeof apiClient.request>,
    );
    renderPage();

    await act(async () => {
      if (first === "space") space.resolve({ data: spaceResponse });
      else products.resolve({ data: productsResponse });
      // React Query는 구독 알림을 다음 작업으로 예약하므로 첫 응답을 별도 렌더로 확정한다.
      await new Promise((resolve) => setTimeout(resolve, 20));
    });
    expect(screen.queryByText("테스트 스페이스")).not.toBeInTheDocument();

    await act(async () => {
      if (first === "space") products.resolve({ data: productsResponse });
      else space.resolve({ data: spaceResponse });
    });
    await screen.findByRole("heading", { name: "테스트 스페이스" });
    expect(screen.getByRole("button", { name: "더보기" })).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "더보기" }));
    expect(screen.getByRole("button", { name: "접기" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "접기" }));
    expect(screen.getByRole("button", { name: "더보기" })).toBeInTheDocument();
  });

  it.each([
    60, 40,
  ])("캐시된 소개의 전체 높이가 %spx일 때 잘림에 맞춰 표시한다", (scrollHeight) => {
    mockMeasurements(scrollHeight);
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false, staleTime: Infinity } },
    });
    queryClient.setQueryData(["/spaces/test"], spaceResponse);
    queryClient.setQueryData(["/spaces/test/products"], productsResponse);
    renderPage(queryClient);

    expect(Boolean(screen.queryByRole("button", { name: "더보기" }))).toBe(
      scrollHeight > 40,
    );
  });
});
