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
}

const DUMMY_CARDS = [
  {
    id: 1,
    isNew: true,
    author: "김이름",
    text: "졸업 전시 축하해요!",
    isPhotoExist: false,
    createdAt: new Date(2024, 4, 12, 14, 30),
  },
  {
    id: 2,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: false,
    createdAt: new Date(2024, 4, 11, 10, 15),
  },
  {
    id: 3,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: true,
    createdAt: new Date(2024, 4, 10, 9, 0),
  },
  {
    id: 4,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: false,
    createdAt: new Date(2024, 4, 9, 18, 45),
  },
  {
    id: 5,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: true,
    createdAt: new Date(2024, 4, 8, 13, 20),
  },
  {
    id: 6,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: false,
    createdAt: new Date(2024, 4, 7, 11, 5),
  },
  {
    id: 7,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: false,
    createdAt: new Date(2024, 4, 6, 16, 40),
  },
  {
    id: 8,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: true,
    createdAt: new Date(2024, 4, 5, 20, 10),
  },
  {
    id: 9,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: false,
    createdAt: new Date(2024, 4, 4, 8, 55),
  },
  {
    id: 10,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: true,
    createdAt: new Date(2024, 4, 3, 19, 30),
  },
  {
    id: 11,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: false,
    createdAt: new Date(2024, 4, 2, 12, 0),
  },
];

const GuestBookPage = ({
  onBack,
  onCardClick,
  onNewStackClick,
}: GuestBookPageProps) => {
  const newCards = DUMMY_CARDS.filter((card) => card.isNew);
  const hasNewCards = newCards.length > 0;
  const regularCards = DUMMY_CARDS.filter((card) => !card.isNew);

  // TODO: API 응답으로 대체 필요
  const totalCount = regularCards.length;

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
        {regularCards.map((card) => (
          <GuestList
            key={card.id}
            nickname={card.author}
            message={card.text}
            createdAt={card.createdAt}
            hasPhoto={card.isPhotoExist}
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
          // TODO: 작품 탭 페이지 구현 후 연동 필요
          left={{ text: "작품", onClick: () => {} }}
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
