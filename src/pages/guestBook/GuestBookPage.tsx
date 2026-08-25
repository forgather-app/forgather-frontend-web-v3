import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { withApiVersion } from "@/api/apiVersion";
import { customFetcher } from "@/api/customFetcher";
import type {
  ApiResponseGuestBookResponse,
  GuestBookCardSimpleResponse,
} from "@/api/model";
import GuestBookEmptyGraphic from "@/assets/images/guestbook_empty_placeholder.svg?react";
import GuestList from "@/components/@common/GuestList/GuestList";
import GuestListStack from "@/components/@common/GuestListStack/GuestListStack";
import { CONSTRAINTS } from "@/constants/constraints";
import { ERROR_MESSAGES } from "@/constants/error";
import useDelayedLoading from "@/hooks/@common/useDelayedLoading";
import useInfiniteScroll from "@/hooks/@common/useInfiniteScroll";
import useSnackBar from "@/hooks/@common/useSnackBar";
import * as S from "./GuestBookPage.styles";

const SKELETON_CARD_COUNT = 4;

interface GuestBookPageProps {
  /** 스페이스 ID */
  spaceId: string;
  /** 일반 방명록 카드 클릭 핸들러 */
  onCardClick: (guestbookId: number) => void;
}

// OpenAPI 스펙에는 page/size 쿼리 파라미터가 문서화되어 있지 않지만, 실제 서버 응답은 이미 페이지네이션되어 내려온다(#186).
// 같은 서버의 다른 엔드포인트(GET /guestbook/me/reports)가 Spring Pageable(0-base page) 컨벤션을 쓰는 것으로 보아 이 엔드포인트도 동일하게 0-base로 가정한다.
const fetchGuestBookPage = (spaceId: string, page: number) =>
  customFetcher<ApiResponseGuestBookResponse>(
    `/spaces/${spaceId}/guestbook?page=${page}&size=${CONSTRAINTS.GUEST_BOOK_LIST.PAGE_SIZE}`,
    withApiVersion(2),
  );

// 생성된 useReadUnreadGuestBook 훅은 OpenAPI 스펙의 응답 미디어 타입 누락으로 응답 데이터가 Blob으로 잘못 타이핑되어 그대로 사용할 수 없다.
// 위 방명록 목록 조회(v2)와 동일한 GuestBookResponse 스키마이므로 같은 방식으로 customFetcher를 직접 호출한다.
const fetchUnreadGuestBook = (spaceId: string) =>
  customFetcher<ApiResponseGuestBookResponse>(
    `/spaces/${spaceId}/guestbook/unread`,
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
  } = useInfiniteQuery({
    queryKey: ["guestbook", spaceId, "list"],
    queryFn: ({ pageParam }) => fetchGuestBookPage(spaceId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (_lastPage, allPages) => {
      const totalPages = allPages.at(-1)?.data?.totalPages;
      if (totalPages === undefined || allPages.length >= totalPages) {
        return undefined;
      }
      return allPages.length;
    },
  });

  const {
    data: unreadData,
    isPending: isUnreadPending,
    isError: isUnreadError,
  } = useQuery({
    queryKey: ["guestbook", spaceId, "unread"],
    queryFn: () => fetchUnreadGuestBook(spaceId),
  });

  const pages = data?.pages.map((page) => page.data ?? {}) ?? [];
  const guestBookCards = pages
    .flatMap((page) => page.guestBookCards ?? [])
    .filter(
      (card): card is GuestBookCardSimpleResponse & { id: number } =>
        card.id !== undefined,
    );

  const unreadCount =
    pages[0]?.unreadCount ?? unreadData?.data?.totalCount ?? 0;
  const hasNewCards = unreadCount > 0;
  const readTotalCount = pages[0]?.totalCount ?? guestBookCards.length;
  const totalCount = readTotalCount + unreadCount;
  const firstUnreadCard = unreadData?.data?.guestBookCards?.find(
    (card): card is GuestBookCardSimpleResponse & { id: number } =>
      card.id !== undefined,
  );

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

  const isLoading = isPending || isUnreadPending;
  const showSkeleton = useDelayedLoading(isLoading);

  // TODO: 에러 UI 구현
  if (isError || isUnreadError) return;

  if (isLoading) {
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

      {hasNewCards && firstUnreadCard && (
        <S.GuestCardWrapper>
          <GuestListStack
            count={unreadCount}
            onClick={() => onCardClick(firstUnreadCard.id)}
          />
        </S.GuestCardWrapper>
      )}

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
              hasPhoto={card.containsPhoto}
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
