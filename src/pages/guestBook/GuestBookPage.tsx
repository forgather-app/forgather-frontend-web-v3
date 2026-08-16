import { withApiVersion } from "@/api/apiVersion";
import { useReadGuestBookV2 } from "@/api/generated/spaceguestbook-스페이스-방명록";
import type {
  ApiResponseGuestBookResponse,
  GuestBookCardSimpleResponse,
  GuestBookResponse,
} from "@/api/model";
import GuestList from "@/components/@common/GuestList/GuestList";
import GuestListStack from "@/components/@common/GuestListStack/GuestListStack";
import * as S from "./GuestBookPage.styles";

const SKELETON_CARD_COUNT = 4;

interface GuestBookPageProps {
  /** 스페이스 ID */
  spaceId: string;
  /** 일반 방명록 카드 클릭 핸들러 */
  onCardClick: (guestbookId: number) => void;
  /** 새 방명록 스택 클릭 핸들러 (새 방명록 목록 페이지로 이동) */
  onNewStackClick: () => void;
}

const GuestBookPage = ({
  spaceId,
  onCardClick,
  onNewStackClick,
}: GuestBookPageProps) => {
  const {
    data: guestBook,
    isPending,
    isError,
  } = useReadGuestBookV2<GuestBookResponse>(spaceId, {
    query: {
      select: (response) =>
        // TODO: 응답 content-type이 `*/*`로 내려와 orval이 실제 스키마 대신 Blob으로 추론함 — 백엔드가 application/json으로 명시하면 캐스팅 제거 가능
        (response as unknown as ApiResponseGuestBookResponse).data ?? {},
    },
    request: withApiVersion(2),
  });

  // TODO: 에러 UI 구현
  if (isError) return;

  if (isPending) {
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

  const guestBookCards = (guestBook.guestBookCards ?? []).filter(
    (card): card is GuestBookCardSimpleResponse & { id: number } =>
      card.id !== undefined,
  );
  const unreadCount = guestBook.unreadCount ?? 0;
  const hasNewCards = unreadCount > 0;
  const totalCount = guestBook.totalCount ?? guestBookCards.length;

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
      </S.GuestListContainer>
      <S.BottomSpacer />
    </S.ScrollArea>
  );
};

export default GuestBookPage;
