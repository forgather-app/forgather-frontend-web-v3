import { useCallback, useEffect, useRef } from "react";

/**
 * IntersectionObserver 기반 무한스크롤 트리거 훅.
 *
 * @param props.hasNextPage - 다음 페이지 존재 여부
 * @param props.isFetchingNextPage - 다음 페이지 요청 중 여부 (중복 요청 방지)
 * @param props.onIntersect - 감지 요소가 뷰포트에 들어왔을 때 호출되는 콜백
 * @param props.rootMargin - 감지 요소가 뷰포트에 들어오기 전 미리 트리거할 여백, px 단위 (기본값: 0)
 */

interface UseInfiniteScrollProps {
  /** 다음 페이지 존재 여부 */
  hasNextPage: boolean;
  /** 다음 페이지 요청 중 여부. true인 동안 onIntersect 호출을 막아 중복 요청을 방지. */
  isFetchingNextPage: boolean;
  /** 감지 요소가 뷰포트에 들어왔을 때 호출되는 콜백 */
  onIntersect: () => void;
  /** 감지 요소가 뷰포트에 들어오기 전 미리 트리거할 여백, px 단위 */
  rootMargin?: number;
}

const useInfiniteScroll = ({
  hasNextPage,
  isFetchingNextPage,
  onIntersect,
  rootMargin = 0,
}: UseInfiniteScrollProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const canLoadMoreRef = useRef(false);
  const onIntersectRef = useRef(onIntersect);

  useEffect(() => {
    canLoadMoreRef.current = hasNextPage && !isFetchingNextPage;
    onIntersectRef.current = onIntersect;
  });

  const targetRef = useCallback(
    (element: HTMLElement | null) => {
      observerRef.current?.disconnect();
      observerRef.current = null;

      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting && canLoadMoreRef.current) {
            onIntersectRef.current();
          }
        },
        { rootMargin: `${rootMargin}px` },
      );

      observer.observe(element);
      observerRef.current = observer;
    },
    [rootMargin],
  );

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, []);

  return { targetRef };
};

export default useInfiniteScroll;
