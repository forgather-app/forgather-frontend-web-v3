import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "@/api/apiClient";
import { useGuestBookWritingAvailability } from "./useGuestBookWritingAvailability";

const space = {
  guestBookWritingPolicy: "EXHIBITION_PERIOD",
  exhibitionStartDate: "2026-10-20",
  exhibitionEndDate: "2026-10-22",
  isGuestBookWritable: true,
};
function setup(response = space) {
  const request = vi
    .spyOn(apiClient, "request")
    .mockResolvedValue({ data: { data: response } });
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const hook = renderHook(() => useGuestBookWritingAvailability("test"), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    ),
  });
  return { ...hook, request };
}
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.useRealTimers();
});
describe("guestbook writing availability", () => {
  it("blocks until loaded and honors server refusal even inside dates", async () => {
    vi.spyOn(Date, "now").mockReturnValue(Date.parse("2026-10-21T00:00:00Z"));
    const { result } = setup({ ...space, isGuestBookWritable: false });
    expect(result.current.isWritable).toBe(false);
    await waitFor(() => expect(result.current.space).toBeDefined());
    expect(result.current.isWritable).toBe(false);
    expect(await result.current.checkAvailability()).toBe(false);
  });
  it("expires at KST midnight and refreshes stale server true", async () => {
    vi.spyOn(Date, "now").mockReturnValue(Date.parse("2026-10-22T14:59:59Z"));
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    const { result, request } = setup();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10);
    });
    expect(result.current.isWritable).toBe(true);
    vi.mocked(Date.now).mockReturnValue(Date.parse("2026-10-22T15:00:00Z"));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });
    expect(result.current.isWritable).toBe(false);
    expect(request.mock.calls.length).toBeGreaterThan(1);
  });
  it("refreshes server false when the KST start day begins", async () => {
    vi.spyOn(Date, "now").mockReturnValue(Date.parse("2026-10-19T14:59:59Z"));
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    const { result, request } = setup({ ...space, isGuestBookWritable: false });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10);
    });
    expect(result.current.isWritable).toBe(false);
    request.mockResolvedValue({ data: { data: space } });
    vi.mocked(Date.now).mockReturnValue(Date.parse("2026-10-19T15:00:00Z"));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });
    expect(result.current.isWritable).toBe(true);
  });
  it("does not use mount time when an old server response arrives after expiry", async () => {
    vi.spyOn(Date, "now").mockReturnValue(Date.parse("2026-10-22T14:59:59Z"));
    let resolve!: (value: { data: { data: typeof space } }) => void;
    vi.spyOn(apiClient, "request").mockImplementation(
      () =>
        new Promise((done) => {
          resolve = done;
        }),
    );
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const { result } = renderHook(
      () => useGuestBookWritingAvailability("test"),
      {
        wrapper: ({ children }) => (
          <QueryClientProvider client={client}>{children}</QueryClientProvider>
        ),
      },
    );
    vi.mocked(Date.now).mockReturnValue(Date.parse("2026-10-22T15:00:00Z"));
    await act(async () => {
      resolve({ data: { data: space } });
    });
    await waitFor(() => expect(result.current.space).toBeDefined());
    expect(result.current.isWritable).toBe(false);
  });
});
