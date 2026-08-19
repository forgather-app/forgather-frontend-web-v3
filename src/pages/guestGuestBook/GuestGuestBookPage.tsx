import { useInfiniteQuery } from "@tanstack/react-query";
import { withApiVersion } from "@/api/apiVersion";
import { customFetcher } from "@/api/customFetcher";
import { useGetSpaceInformation } from "@/api/generated/space-스페이스";
import type {
  ApiResponseGuestBookResponse,
  ApiResponseSpaceResponse,
  GuestBookCardSimpleResponse,
  SpaceResponse,
} from "@/api/model";
import GuestList from "@/components/@common/GuestList/GuestList";
import { CONSTRAINTS } from "@/constants/constraints";
import { ERROR_MESSAGES } from "@/constants/error";
import useInfiniteScroll from "@/hooks/@common/useInfiniteScroll";
import useSnackBar from "@/hooks/@common/useSnackBar";
import PrivateGuestBookOverlay from "./components/privateGuestBookOverlay/PrivateGuestBookOverlay";
import * as S from "./GuestGuestBookPage.styles";

const SKELETON_CARD_COUNT = 4;

interface GuestGuestBookPageProps {
  /** 스페이스 ID */
  spaceId: string;
  /** 방명록 카드 클릭 핸들러 */
  onCardClick: (guestbookId: number) => void;
}

// OpenAPI 스펙에는 page/size 쿼리 파라미터가 문서화되어 있지 않지만, 실제 서버 응답은 이미 페이지네이션되어 내려온다(#186).
const fetchGuestBookPage = (spaceId: string, page: number) =>
  customFetcher<ApiResponseGuestBookResponse>(
    `/spaces/${spaceId}/guestbook?page=${page}&size=${CONSTRAINTS.GUEST_BOOK_LIST.PAGE_SIZE}`,
    withApiVersion(2),
  );

const GuestGuestBookPage = ({
  spaceId,
  onCardClick,
}: GuestGuestBookPageProps) => {
  const { showSnackBar } = useSnackBar();

  const {
    data: space,
    isPending: isSpacePending,
    isError: isSpaceError,
  } = useGetSpaceInformation<SpaceResponse>(spaceId, {
    query: {
      select: (response) =>
        (response as unknown as ApiResponseSpaceResponse).data ?? {},
    },
  });

  // 방명록이 공개되지 않은 스페이스는 목록 API 자체가 호스트에게만 허용되므로, isPublic이 확정되기 전까지는 요청하지 않는다
  const isPublic = space?.isPublic !== false;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isGuestBookPending,
    isError: isGuestBookError,
  } = useInfiniteQuery({
    queryKey: ["guestbook", spaceId, "list"],
    queryFn: ({ pageParam }) => fetchGuestBookPage(spaceId, pageParam),
    initialPageParam: 0,
    enabled: !isSpacePending && isPublic,
    getNextPageParam: (_lastPage, allPages) => {
      const totalPages = allPages.at(-1)?.data?.totalPages;
      if (totalPages === undefined || allPages.length >= totalPages) {
        return undefined;
      }
      return allPages.length;
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

  // TODO: 에러 UI 구현
  if (isSpaceError) return;

  if (isSpacePending || (isPublic && isGuestBookPending)) {
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
      </S.ScrollArea>
    );
  }

  if (!isPublic) {
    return (
      <S.ScrollArea>
        <S.PrivateWrapper>
          <S.BlurredContent>
            <S.TitleRow>
              <S.Title>방명록</S.Title>
            </S.TitleRow>

            <S.GuestListContainer aria-hidden>
              {Array.from({ length: SKELETON_CARD_COUNT }).map((_, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: 블러 배경용 고정 개수 플레이스홀더
                <S.PrivatePlaceholder key={index} />
              ))}
            </S.GuestListContainer>
          </S.BlurredContent>
          <PrivateGuestBookOverlay />
        </S.PrivateWrapper>
      </S.ScrollArea>
    );
  }

  // TODO: 에러 UI 구현
  if (isGuestBookError) return;

  return (
    <S.ScrollArea>
      <S.TitleRow>
        <S.Title>방명록</S.Title>
        <S.CountGroup>
          총 <S.CountNumber>{totalCount}</S.CountNumber>개의 방명록
        </S.CountGroup>
      </S.TitleRow>

      <S.GuestListContainer>
        {guestBookCards.map((card) => (
          <GuestList
            key={card.id}
            nickname={card.nickname ?? ""}
            message={card.message}
            createdAt={card.createdAt ? new Date(card.createdAt) : undefined}
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

export default GuestGuestBookPage;
