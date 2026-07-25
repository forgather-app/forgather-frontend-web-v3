import { useRef, useState } from "react";
import IcLeftArrow from "@/assets/icons/ic_left_arrow.svg?react";
import IcLink from "@/assets/icons/ic_link.svg?react";
import FilterChip from "@/components/@common/Chip/FilterChip/FilterChip";
import GuestList from "@/components/@common/GuestList/GuestList";
import GuestListStack from "@/components/@common/GuestListStack/GuestListStack";
import Tooltip from "@/components/@common/tooltip/Tooltip";
import NavigationBarLayout from "@/components/layout/NavigationBarLayout/NavigationBarLayout";
import * as S from "./GuestBookPage.styles";

type GuestBookFilter = "all" | "photo" | "scrap";

interface GuestBookPageProps {
  /** 스페이스 ID */
  spaceId: string;
  /** 스페이스 이름 */
  spaceName?: string;
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
    isScrapped: false,
    createdAt: new Date(2024, 4, 12, 14, 30),
  },
  {
    id: 2,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: false,
    isScrapped: false,
    createdAt: new Date(2024, 4, 11, 10, 15),
  },
  {
    id: 3,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: true,
    isScrapped: true,
    createdAt: new Date(2024, 4, 10, 9, 0),
  },
  {
    id: 4,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: false,
    isScrapped: false,
    createdAt: new Date(2024, 4, 9, 18, 45),
  },
  {
    id: 5,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: true,
    isScrapped: true,
    createdAt: new Date(2024, 4, 8, 13, 20),
  },
  {
    id: 6,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: false,
    isScrapped: false,
    createdAt: new Date(2024, 4, 7, 11, 5),
  },
  {
    id: 7,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: false,
    isScrapped: false,
    createdAt: new Date(2024, 4, 6, 16, 40),
  },
  {
    id: 8,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: true,
    isScrapped: false,
    createdAt: new Date(2024, 4, 5, 20, 10),
  },
  {
    id: 9,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: false,
    isScrapped: true,
    createdAt: new Date(2024, 4, 4, 8, 55),
  },
  {
    id: 10,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: true,
    isScrapped: false,
    createdAt: new Date(2024, 4, 3, 19, 30),
  },
  {
    id: 11,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: false,
    isScrapped: false,
    createdAt: new Date(2024, 4, 2, 12, 0),
  },
];

const GuestBookPage = ({
  spaceName = "스페이스 이름",
  onBack,
  onCardClick,
  onNewStackClick,
}: GuestBookPageProps) => {
  const [activeFilter, setActiveFilter] = useState<GuestBookFilter>("all");
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const isTooltipDismissed = useRef(false);
  // TODO: API 연동 시 서버 상태로 대체
  const [scrappedIds] = useState<Set<number>>(
    () => new Set(DUMMY_CARDS.filter((c) => c.isScrapped).map((c) => c.id)),
  );

  const newCards = DUMMY_CARDS.filter((card) => card.isNew);
  const hasNewCards = newCards.length > 0;
  const regularCards = DUMMY_CARDS.filter((card) => !card.isNew);

  const filteredCards = regularCards.filter((card) => {
    switch (activeFilter) {
      case "photo":
        return card.isPhotoExist;
      case "scrap":
        return scrappedIds.has(card.id);
      default:
        return true;
    }
  });

  // TODO: API 응답으로 대체 필요
  const totalCount = filteredCards.length;

  return (
    <NavigationBarLayout title={spaceName} onBackClick={onBack}>
      <S.FilterSection>
        <S.CountText>
          총 <S.CountNumber>{totalCount}</S.CountNumber>개의 방명록
        </S.CountText>
        <S.ChipRow>
          <FilterChip
            label="전체"
            isSelected={activeFilter === "all"}
            onClick={() => {
              setActiveFilter("all");
              setIsTooltipVisible(false);
            }}
          />
          <FilterChip
            label="이미지 방명록"
            isSelected={activeFilter === "photo"}
            onClick={() => {
              setActiveFilter("photo");
              if (!isTooltipDismissed.current) setIsTooltipVisible(hasNewCards);
            }}
          />
          <FilterChip
            label="스크랩"
            isSelected={activeFilter === "scrap"}
            onClick={() => {
              setActiveFilter("scrap");
              if (!isTooltipDismissed.current) setIsTooltipVisible(hasNewCards);
            }}
          />
        </S.ChipRow>
      </S.FilterSection>

      <S.ContentWrapper>
        {isTooltipVisible && (
          <S.TooltipAnchor>
            <Tooltip
              onClose={() => {
                setIsTooltipVisible(false);
                isTooltipDismissed.current = true;
              }}
              ariaLabel={`${newCards.length}개의 새 방명록`}
            >
              <S.TooltipText>
                <S.TooltipCount>{newCards.length}개</S.TooltipCount>
                <S.TooltipSub>의 새 방명록</S.TooltipSub>
              </S.TooltipText>
            </Tooltip>
          </S.TooltipAnchor>
        )}
        <S.GuestListContainer>
          {hasNewCards && <GuestListStack onClick={onNewStackClick} />}
          {filteredCards.map((card) => (
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
      </S.ContentWrapper>
      <S.BottomSpacer />
      <S.BottomBar>
        <S.FloatingIconButton
          type="button"
          aria-label="뒤로 가기"
          onClick={onBack}
        >
          <IcLeftArrow width={24} height={24} />
        </S.FloatingIconButton>
        <S.FloatingIconButton
          type="button"
          aria-label="링크 공유"
          // TODO: 링크 공유 기능 연동
          onClick={() => {}}
        >
          <IcLink width={24} height={24} />
        </S.FloatingIconButton>
      </S.BottomBar>
    </NavigationBarLayout>
  );
};

export default GuestBookPage;
