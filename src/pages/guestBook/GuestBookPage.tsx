import { useInfiniteQuery } from "@tanstack/react-query";
import { customFetcher } from "@/api/customFetcher";
import type {
  ApiResponseGuestBookResponse,
  GuestBookCardSimpleResponse,
} from "@/api/model";
import GuestBookEmptyGraphic from "@/assets/images/guestbook_empty_placeholder.svg?react";
import GuestList from "@/components/@common/GuestList/GuestList";
import { CONSTRAINTS } from "@/constants/constraints";
import { ERROR_MESSAGES } from "@/constants/error";
import useDelayedLoading from "@/hooks/@common/useDelayedLoading";
import useInfiniteScroll from "@/hooks/@common/useInfiniteScroll";
import useSnackBar from "@/hooks/@common/useSnackBar";
import { throwIfRoutableError } from "@/utils/throwIfRoutableError";
import * as S from "./GuestBookPage.styles";

const SKELETON_CARD_COUNT = 4;

interface GuestBookPageProps {
  /** 스페이스 ID */
  spaceId: string;
  /** 일반 방명록 카드 클릭 핸들러 */
  onCardClick: (guestbookId: number) => void;
}

// 생성된 useReadGuestBook 훅은 OpenAPI 스펙의 응답 미디어 타입 누락으로 응답 데이터가 Blob으로 잘못 타이핑되어 그대로 사용할 수 없다.
// X-API-Version 헤더 없이(ver1) 호출하면 읽은/읽지 않은 방명록이 섞인 하나의 목록과 카드별 isRead를 받는다.
const fetchGuestBookPage = (spaceId: string, page: number) =>
  customFetcher<ApiResponseGuestBookResponse>(
    `/spaces/${spaceId}/guestbook?page=${page}&size=${CONSTRAINTS.GUEST_BOOK_LIST.PAGE_SIZE}`,
  );

const GuestBookPage = ({ spaceId, onCardClick }: GuestBookPageProps) => {
  const { showSnackBar } = useSnackBar();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["guestbook", spaceId, "list"],
    queryFn: ({ pageParam }) => fetchGuestBookPage(spaceId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => {
      const totalPages = allPages.at(-1)?.data?.totalPages;
      if (totalPages === undefined || allPages.length >= totalPages) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });

  const pages = data?.pages.map((page) => page.data ?? {}) ?? [];
  const guestBookCards = pages
    .flatMap((page) => page.guestBookCards ?? [])
    .filter(
      (card): card is GuestBookCardSimpleResponse & { id: number } =>
        card.id !== undefined,
    );

  const totalCount = pages[0]?.totalCount ?? guestBookCards.length;

  const { targetRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    onIntersect: () => {
      fetchNextPage().then((result) => {
        if (result.isError) {
          showSnackBar(
            ERROR_MESSAGES.GUEST_BOOK_LIST_LOAD_MORE_FAILED,
            "error",
          );
        }
      });
    },
  });

  const showSkeleton = useDelayedLoading(isPending);

  // 최초 로드가 실패했을 때만 전역 에러로 처리한다. useInfiniteQuery는 fetchNextPage()가
  // 실패해도 error/isError가 함께 바뀌므로, 이미 로드된 목록이 있으면(=최초 로드는 성공)
  // "더 불러오기" 실패로 페이지 전체가 죽어선 안 된다 — 그 경우는 위 onIntersect에서
  // 이미 스낵바로 안내한다.
  throwIfRoutableError(data ? undefined : error);
  if (isError && !data) return null;

  if (isPending) {
    if (!showSkeleton) return null;

    return (
      <S.ScrollArea>
        <S.TitleRow>
          <S.Title>방명록</S.Title>
          <S.CountSkeleton aria-hidden />
        </S.TitleRow>

        <S.GuestListContainer>
          {Array.from({ length: SKELETON_CARD_COUNT }).map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: 로딩 중 고정 개수 플레이스홀더라 index만 사용 가능함
            <S.GuestListSkeleton key={index} aria-hidden />
          ))}
        </S.GuestListContainer>
        <S.BottomSpacer />
      </S.ScrollArea>
    );
  }

  return (
    <S.ScrollArea>
      <S.TitleRow>
        <S.Title>방명록</S.Title>
        <S.CountGroup>
          총 <S.CountNumber>{totalCount}</S.CountNumber>개의 방명록
        </S.CountGroup>
      </S.TitleRow>

      {guestBookCards.length === 0 ? (
        <S.EmptyState>
          <S.EmptyStateGraphic aria-hidden>
            <GuestBookEmptyGraphic />
          </S.EmptyStateGraphic>
          <S.EmptyStateText>아직 방명록이 없어요</S.EmptyStateText>
        </S.EmptyState>
      ) : (
        <S.GuestListContainer>
          {guestBookCards.map((card) => (
            <GuestList
              key={card.id}
              nickname={card.nickname ?? ""}
              message={card.message}
              createdAt={card.createdAt ? new Date(card.createdAt) : undefined}
              hasPhoto={card.containsPhoto}
              isNew={card.isRead === false}
              onClick={() => onCardClick(card.id)}
            />
          ))}
          {hasNextPage && <S.ScrollSentinel ref={targetRef} />}
        </S.GuestListContainer>
      )}
      <S.BottomSpacer />
    </S.ScrollArea>
  );
};

export default GuestBookPage;
