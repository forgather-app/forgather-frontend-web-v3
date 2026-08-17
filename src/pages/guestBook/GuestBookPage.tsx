import { useState } from "react";
import { withApiVersion } from "@/api/apiVersion";
import { useReadGuestBookV2Suspense } from "@/api/generated/spaceguestbook-스페이스-방명록";
import type {
  ApiResponseGuestBookResponse,
  GuestBookCardSimpleResponse,
  GuestBookResponse,
} from "@/api/model";
import GuestList from "@/components/@common/GuestList/GuestList";
import GuestListStack from "@/components/@common/GuestListStack/GuestListStack";
import { CONSTRAINTS } from "@/constants/constraints";
import useInfiniteScroll from "@/hooks/@common/useInfiniteScroll";
import * as S from "./GuestBookPage.styles";

interface GuestBookPageProps {
  /** 스페이스 ID */
  spaceId: string;
  /** 일반 방명록 카드 클릭 핸들러 */
  onCardClick: (guestbookId: number) => void;
}

const GuestBookPage = ({ spaceId, onCardClick }: GuestBookPageProps) => {
  const { data: guestBook } = useReadGuestBookV2Suspense<GuestBookResponse>(
    spaceId,
    {
      query: {
        select: (response) =>
          // TODO: 응답 content-type이 `*/*`로 내려와 orval이 실제 스키마 대신 Blob으로 추론함 — 백엔드가 application/json으로 명시하면 캐스팅 제거 가능
          (response as unknown as ApiResponseGuestBookResponse).data ?? {},
      },
      request: withApiVersion(2),
    },
  );

  const guestBookCards = (guestBook.guestBookCards ?? []).filter(
    (card): card is GuestBookCardSimpleResponse & { id: number } =>
      card.id !== undefined,
  );
  const unreadCount = guestBook.unreadCount ?? 0;
  const hasNewCards = unreadCount > 0;
  const totalCount = guestBook.totalCount ?? guestBookCards.length;
  const firstUnreadCard = guestBookCards.find((card) => !card.isRead);

  const [visibleCount, setVisibleCount] = useState(
    CONSTRAINTS.GUEST_BOOK_LIST.PAGE_SIZE,
  );
  const visibleCards = guestBookCards.slice(0, visibleCount);
  const hasNextPage = visibleCount < guestBookCards.length;

  const { targetRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage: false,
    onIntersect: () =>
      setVisibleCount((prev) => prev + CONSTRAINTS.GUEST_BOOK_LIST.PAGE_SIZE),
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
          <GuestListStack
            count={unreadCount}
            onClick={
              firstUnreadCard
                ? () => onCardClick(firstUnreadCard.id)
                : undefined
            }
          />
        </S.GuestCardWrapper>
      )}

      <S.GuestListContainer>
        {visibleCards.map((card) => (
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
