import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { search } from "@/api/generated/space-스페이스";
import type { PlaceResult } from "@/api/model/placeResult";
import usePlaceSearch from "./usePlaceSearch";

vi.mock("@/api/generated/space-스페이스", () => ({ search: vi.fn() }));
const mockedSearch = vi.mocked(search);
const place = (id: string): PlaceResult => ({
  placeId: id,
  placeName: `장소 ${id}`,
  placeUrl: `https://place.map.kakao.com/${id}`,
  address: "지번",
  roadAddress: "도로명",
});
const response = (places: PlaceResult[], hasNext = false) =>
  ({
    code: "SUCCESS",
    message: "성공",
    data: { places, hasNext },
  }) as unknown as Awaited<ReturnType<typeof search>>;
const deferred = () => {
  let resolve!: (value: Awaited<ReturnType<typeof search>>) => void;
  const promise = new Promise<Awaited<ReturnType<typeof search>>>((done) => {
    resolve = done;
  });
  return { promise, resolve };
};
const advance = async () => {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(300);
  });
};

beforeEach(() => {
  vi.useFakeTimers();
  mockedSearch.mockReset();
  mockedSearch.mockResolvedValue(response([]));
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("usePlaceSearch", () => {
  it("명시적으로 시작할 때만 정규화된 검색어를 요청하고 같은 검색어도 새로 요청한다", async () => {
    const { result } = renderHook(() => usePlaceSearch());
    await advance();
    expect(mockedSearch).not.toHaveBeenCalled();
    await act(async () => {
      result.current.startSearch("   ");
    });
    expect(result.current.hasSearched).toBe(false);
    expect(mockedSearch).not.toHaveBeenCalled();
    await act(async () => {
      result.current.startSearch(" 전시 ");
    });
    expect(result.current.hasSearched).toBe(true);
    await act(async () => {
      result.current.startSearch("전시");
    });
    expect(mockedSearch.mock.calls.map(([params]) => params)).toEqual([
      { keyword: "전시", page: 1 },
      { keyword: "전시", page: 1 },
    ]);
  });

  it("새 명시적 검색은 이전 요청을 취소하고 늦은 응답을 무시한다", async () => {
    const old = deferred();
    mockedSearch
      .mockReturnValueOnce(old.promise)
      .mockResolvedValueOnce(response([place("new")]));
    const { result } = renderHook(() => usePlaceSearch());
    act(() => result.current.startSearch("이전"));
    const signal = mockedSearch.mock.calls[0]?.[1]?.signal;
    await act(async () => {
      result.current.startSearch("새 검색");
    });
    expect(signal?.aborted).toBe(true);
    await act(async () => {
      old.resolve(response([place("old")]));
    });
    expect(result.current.places.map((item) => item.placeId)).toEqual(["new"]);
  });

  it("페이지를 순서대로 중복 없이 요청하고 장소 ID 중복과 마지막 페이지를 처리한다", async () => {
    const next = deferred();
    mockedSearch
      .mockResolvedValueOnce(response([place("1")], true))
      .mockReturnValueOnce(next.promise);
    const { result } = renderHook(() => usePlaceSearch());
    await act(async () => {
      result.current.startSearch("전시");
    });
    act(() => {
      result.current.loadMore();
      result.current.loadMore();
    });
    expect(mockedSearch.mock.calls.map(([params]) => params.page)).toEqual([
      1, 2,
    ]);
    expect(result.current.isLoadingMore).toBe(true);
    await act(async () => {
      next.resolve(response([place("1"), place("2")], false));
    });
    expect(result.current.places.map((item) => item.placeId)).toEqual([
      "1",
      "2",
    ]);
    expect(result.current.hasNext).toBe(false);
    act(() => result.current.loadMore());
    expect(mockedSearch).toHaveBeenCalledTimes(2);
  });

  it("제공자가 다음 페이지가 있다고 해도 45페이지에서 멈춘다", async () => {
    mockedSearch.mockImplementation(async (params) =>
      response([place(String(params.page))], true),
    );
    const { result } = renderHook(() => usePlaceSearch());
    await act(async () => {
      result.current.startSearch("전시");
    });
    for (let page = 2; page <= 46; page++)
      await act(async () => {
        result.current.loadMore();
      });
    expect(result.current.places).toHaveLength(45);
    expect(result.current.hasNext).toBe(false);
    expect(mockedSearch).toHaveBeenCalledTimes(45);
  });

  it("첫 요청 실패를 표시하고 같은 첫 페이지를 재시도한다", async () => {
    mockedSearch
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValueOnce(response([place("1")]));
    const { result } = renderHook(() => usePlaceSearch());
    await act(async () => {
      result.current.startSearch("전시");
    });
    expect(result.current.error).toBeTruthy();
    expect(result.current.isLoading).toBe(false);
    await act(async () => {
      result.current.retry();
    });
    expect(result.current.error).toBeNull();
    expect(result.current.places).toEqual([place("1")]);
    expect(mockedSearch.mock.calls.map(([params]) => params.page)).toEqual([
      1, 1,
    ]);
  });

  it("추가 요청 실패는 기존 결과를 유지하고 같은 페이지 재시도만 허용한다", async () => {
    mockedSearch
      .mockResolvedValueOnce(response([place("1")], true))
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValueOnce(response([place("2")]));
    const { result } = renderHook(() => usePlaceSearch());
    await act(async () => {
      result.current.startSearch("전시");
    });
    await act(async () => {
      result.current.loadMore();
    });
    expect(result.current.error).toBeTruthy();
    expect(result.current.places).toEqual([place("1")]);
    act(() => result.current.loadMore());
    expect(mockedSearch).toHaveBeenCalledTimes(2);
    await act(async () => {
      result.current.retry();
    });
    expect(result.current.places.map((item) => item.placeId)).toEqual([
      "1",
      "2",
    ]);
    expect(mockedSearch.mock.calls.map(([params]) => params.page)).toEqual([
      1, 2, 2,
    ]);
  });

  it("같은 검색어를 다시 실행해도 누적 페이지와 실패 상태를 첫 페이지로 초기화한다", async () => {
    mockedSearch
      .mockResolvedValueOnce(response([place("1")], true))
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValueOnce(response([place("fresh")]));
    const { result } = renderHook(() => usePlaceSearch());
    await act(async () => {
      result.current.startSearch("전시");
    });
    await act(async () => {
      result.current.loadMore();
    });
    expect(result.current.error).toBeTruthy();
    await act(async () => {
      result.current.startSearch(" 전시 ");
    });
    expect(result.current.places).toEqual([place("fresh")]);
    expect(result.current.error).toBeNull();
    expect(result.current.hasNext).toBe(false);
    act(() => result.current.retry());
    expect(mockedSearch.mock.calls.map(([params]) => params)).toEqual([
      { keyword: "전시", page: 1 },
      { keyword: "전시", page: 2 },
      { keyword: "전시", page: 1 },
    ]);
  });

  it("화면 종료는 요청을 취소하고 결과를 폐기한다", async () => {
    const next = deferred();
    mockedSearch
      .mockResolvedValueOnce(response([place("1")], true))
      .mockReturnValueOnce(next.promise);
    const { result } = renderHook(() => usePlaceSearch());
    await act(async () => {
      result.current.startSearch("전시");
    });
    act(() => result.current.loadMore());
    const signal = mockedSearch.mock.calls[1]?.[1]?.signal;
    act(() => result.current.cancel());
    expect(signal?.aborted).toBe(true);
    expect(result.current.places).toEqual([]);
    await act(async () => {
      next.resolve(response([place("2")]));
    });
    expect(result.current.places).toEqual([]);
  });

  it("언마운트는 진행 중 요청을 취소하고 늦은 응답을 무시한다", async () => {
    const pending = deferred();
    mockedSearch.mockReturnValueOnce(pending.promise);
    const { result, unmount } = renderHook(() => usePlaceSearch());
    act(() => result.current.startSearch("전시"));
    const signal = mockedSearch.mock.calls[0]?.[1]?.signal;
    unmount();
    expect(signal?.aborted).toBe(true);
    await act(async () => {
      pending.resolve(response([place("late")]));
    });
    expect(result.current.places).toEqual([]);
  });
});
