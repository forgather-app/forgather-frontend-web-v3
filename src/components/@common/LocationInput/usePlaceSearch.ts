import { useCallback, useEffect, useRef, useState } from "react";
import { search } from "@/api/generated/space-스페이스";
import type { ApiResponsePlaceSearchResponse } from "@/api/model/apiResponsePlaceSearchResponse";
import type { PlaceResult } from "@/api/model/placeResult";

interface SearchState {
  hasSearched: boolean;
  places: PlaceResult[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: unknown;
  hasNext: boolean;
}
interface SearchSession {
  keyword: string;
  page: number;
  hasNext: boolean;
  failedPage: number | null;
  controller: AbortController | null;
  disposed: boolean;
}
const emptyState: SearchState = {
  hasSearched: false,
  places: [],
  isLoading: false,
  isLoadingMore: false,
  error: null,
  hasNext: false,
};
const dispose = (session: SearchSession | null) => {
  if (!session) return;
  session.disposed = true;
  session.controller?.abort();
};

const usePlaceSearch = () => {
  const [state, setState] = useState<SearchState>(emptyState);
  const sessionRef = useRef<SearchSession | null>(null);

  const requestPage = useCallback(
    async (session: SearchSession, page: number) => {
      if (session.disposed || session.controller || page > 45) return;
      const controller = new AbortController();
      session.controller = controller;
      session.failedPage = null;
      setState((previous) => ({
        ...previous,
        error: null,
        isLoading: page === 1,
        isLoadingMore: page > 1,
      }));
      try {
        // customFetcher returns the JSON envelope; the generated Blob type is inaccurate.
        const response = (await search(
          { keyword: session.keyword, page },
          { signal: controller.signal },
        )) as unknown as ApiResponsePlaceSearchResponse;
        if (session.disposed || controller.signal.aborted) return;
        if (!response.data)
          throw new Error("장소 검색 응답을 확인할 수 없습니다.");
        session.page = page;
        session.hasNext = Boolean(response.data.hasNext) && page < 45;
        const incoming = response.data.places ?? [];
        setState((previous) => {
          const places = page === 1 ? [] : [...previous.places];
          const seen = new Set(places.map((place) => place.placeId));
          for (const place of incoming) {
            if (seen.has(place.placeId)) continue;
            seen.add(place.placeId);
            places.push(place);
          }
          return {
            hasSearched: true,
            places,
            error: null,
            hasNext: session.hasNext,
            isLoading: false,
            isLoadingMore: false,
          };
        });
      } catch (error) {
        if (session.disposed || controller.signal.aborted) return;
        session.failedPage = page;
        setState((previous) => ({
          ...previous,
          error,
          isLoading: false,
          isLoadingMore: false,
        }));
      } finally {
        if (session.controller === controller) session.controller = null;
      }
    },
    [],
  );

  const startSearch = useCallback(
    (keyword: string) => {
      const trimmedKeyword = keyword.trim();
      if (!trimmedKeyword) return;
      dispose(sessionRef.current);
      const session: SearchSession = {
        keyword: trimmedKeyword,
        page: 0,
        hasNext: false,
        failedPage: null,
        controller: null,
        disposed: false,
      };
      sessionRef.current = session;
      setState({ ...emptyState, hasSearched: true, isLoading: true });
      void requestPage(session, 1);
    },
    [requestPage],
  );

  useEffect(() => () => dispose(sessionRef.current), []);

  const loadMore = useCallback(() => {
    const session = sessionRef.current;
    if (!session || !session.hasNext || session.failedPage !== null) return;
    void requestPage(session, session.page + 1);
  }, [requestPage]);
  const retry = useCallback(() => {
    const session = sessionRef.current;
    if (session?.failedPage) void requestPage(session, session.failedPage);
  }, [requestPage]);
  const cancel = useCallback(() => {
    dispose(sessionRef.current);
    sessionRef.current = null;
    setState(emptyState);
  }, []);

  return { ...state, startSearch, loadMore, retry, cancel };
};

export default usePlaceSearch;
