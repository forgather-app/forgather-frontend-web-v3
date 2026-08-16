import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { withApiVersion } from "@/api/apiVersion";
import { customFetcher } from "@/api/customFetcher";
import type {
  ApiResponseGuestBookResponse,
  GuestBookCardSimpleResponse,
} from "@/api/model";
import GuestList from "@/components/@common/GuestList/GuestList";
import GuestListStack from "@/components/@common/GuestListStack/GuestListStack";
import { CONSTRAINTS } from "@/constants/constraints";
import useInfiniteScroll from "@/hooks/@common/useInfiniteScroll";
import useSnackBar from "@/hooks/@common/useSnackBar";
import * as S from "./GuestBookPage.styles";

interface GuestBookPageProps {
  /** 스페이스 ID */
  spaceId: string;
  /** 일반 방명록 카드 클릭 핸들러 */
  onCardClick: (guestbookId: number) => void;
  /** 새 방명록 스택 클릭 핸들러 (새 방명록 목록 페이지로 이동) */
  onNewStackClick: () => void;
}

// OpenAPI 스펙에는 page/size 쿼리 파라미터가 문서화되어 있지 않지만, 실제 서버 응답은 이미 페이지네이션되어 내려온다(#186).
// 같은 서버의 다른 엔드포인트(GET /guestbook/me/reports)가 Spring Pageable(0-base page) 컨벤션을 쓰는 것으로 보아 이 엔드포인트도 동일하게 0-base로 가정한다.
const fetchGuestBookPage = (spaceId: string, page: number) =>
  customFetcher<ApiResponseGuestBookResponse>(
    `/spaces/${spaceId}/guestbook?page=${page}&size=${CONSTRAINTS.GUEST_BOOK_LIST.PAGE_SIZE}`,
    withApiVersion(2),
  );

const GuestBookPage = ({
  spaceId,
  onCardClick,
  onNewStackClick,
}: GuestBookPageProps) => {
  const { showSnackBar } = useSnackBar();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
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

  const pages = data.pages.map((page) => page.data ?? {});
  const guestBookCards = pages
    .flatMap((page) => page.guestBookCards ?? [])
    .filter(
      (card): card is GuestBookCardSimpleResponse & { id: number } =>
        card.id !== undefined,
    );
  const unreadCount = pages[0]?.unreadCount ?? 0;
  const hasNewCards = unreadCount > 0;
  const totalCount = pages[0]?.totalCount ?? guestBookCards.length;

  const { targetRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    onIntersect: () => {
      fetchNextPage().then((result) => {
        if (result.isError) {
          showSnackBar("방명록을 더 불러오지 못했어요", "error");
        }
      });
    },
  });

  return (
    <S.ScrollArea>
      <S.TitleRow>
        <S.Title>방명록</S.Title>
        <S.CountGroup>
          총 <S.CountNumber>{totalCount}</S.CountNumber>개의 방명록
        </S.CountGroup>
      </S.TitleRow>

      {hasNewCards && (
        <S.GuestCardWrapper>
          <GuestListStack count={unreadCount} onClick={onNewStackClick} />
        </S.GuestCardWrapper>
      )}

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
      <S.BottomSpacer />
    </S.ScrollArea>
  );
};

export default GuestBookPage;
