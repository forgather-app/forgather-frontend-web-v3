import { useReadGuestBookV2Suspense } from "@/api/generated/spaceguestbook-스페이스-방명록";
import type {
  ApiResponseGuestBookResponse,
  GuestBookCardSimpleResponse,
  GuestBookResponse,
} from "@/api/model";
import IcLeftArrow from "@/assets/icons/ic_left_arrow.svg?react";
import IcLink from "@/assets/icons/ic_link.svg?react";
import GuestList from "@/components/@common/GuestList/GuestList";
import GuestListStack from "@/components/@common/GuestListStack/GuestListStack";
import TabMenu from "@/components/@common/TabMenu/TabMenu";
import * as S from "./GuestBookPage.styles";

interface GuestBookPageProps {
  /** 스페이스 ID */
  spaceId: string;
  /** 뒤로가기 핸들러 */
  onBack: () => void;
  /** 일반 방명록 카드 클릭 핸들러 */
  onCardClick: (guestbookId: number) => void;
  /** 새 방명록 스택 클릭 핸들러 (새 방명록 목록 페이지로 이동) */
  onNewStackClick: () => void;
  /** 작품 탭 클릭 핸들러 */
  onArtworkTabClick: () => void;
}

const GuestBookPage = ({
  spaceId,
  onBack,
  onCardClick,
  onNewStackClick,
  onArtworkTabClick,
}: GuestBookPageProps) => {
  const { data: guestBook } = useReadGuestBookV2Suspense<GuestBookResponse>(
    spaceId,
    {
      query: {
        select: (response) =>
          // TODO: 응답 content-type이 `*/*`로 내려와 orval이 실제 스키마 대신 Blob으로 추론함 — 백엔드가 application/json으로 명시하면 캐스팅 제거 가능
          (response as unknown as ApiResponseGuestBookResponse).data ?? {},
      },
    },
  );

  const guestBookCards = (guestBook.guestBookCards ?? []).filter(
    (card): card is GuestBookCardSimpleResponse & { id: number } =>
      card.id !== undefined,
  );
  const hasNewCards = (guestBook.unreadCount ?? 0) > 0;
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
          <GuestListStack onClick={onNewStackClick} />
        </S.GuestCardWrapper>
      )}

      <S.GuestListContainer>
        {guestBookCards.map((card) => (
          <GuestList
            key={card.id}
            nickname={card.nickname ?? ""}
            // TODO: 목록 API(GuestBookCardSimpleResponse)에 message/createdAt이 없어 상세 API 스펙 보완 전까지 비워둠
            hasPhoto={card.containsPhoto}
            onClick={() => onCardClick(card.id)}
          />
        ))}
      </S.GuestListContainer>
      <S.BottomSpacer />
      <S.BottomBar>
        <S.FloatingIconButton
          type="button"
          aria-label="뒤로 가기"
          onClick={onBack}
        >
          <IcLeftArrow width={24} height={24} />
        </S.FloatingIconButton>
        <TabMenu
          variant="pill"
          activeTab="right"
          left={{ text: "작품", onClick: onArtworkTabClick }}
          right={{ text: "방명록", onClick: () => {} }}
        />
        <S.FloatingIconButton
          type="button"
          aria-label="링크 공유"
          // TODO: 링크 공유 기능 연동
          onClick={() => {}}
        >
          <IcLink width={24} height={24} />
        </S.FloatingIconButton>
      </S.BottomBar>
    </S.ScrollArea>
  );
};

export default GuestBookPage;
