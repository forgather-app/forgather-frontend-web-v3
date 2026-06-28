import { useRef, useState } from "react";
import FilterChip from "@/components/@common/Chip/FilterChip/FilterChip";
import GuestCard from "@/components/@common/GuestCard/GuestCard";
import GuestCardStack from "@/components/@common/GuestCardStack/GuestCardStack";
import GuestList from "@/components/@common/GuestList/GuestList";
import GuestListStack from "@/components/@common/GuestListStack/GuestListStack";
import TabMenu from "@/components/@common/TabMenu/TabMenu";
import Tooltip from "@/components/@common/tooltip/Tooltip";
import NavigationBarLayout from "@/components/layout/NavigationBarLayout/NavigationBarLayout";
import * as S from "./GuestBookPage.styles";

// TODO: API 연동 시 서버 응답으로 대체
const MOCK_NEW_COUNT = 3;

type GuestBookView = "card" | "list";

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
  },
  {
    id: 2,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: false,
    isScrapped: false,
  },
  {
    id: 3,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: true,
    isScrapped: true,
  },
  {
    id: 4,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: false,
    isScrapped: false,
  },
  {
    id: 5,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: true,
    isScrapped: true,
  },
  {
    id: 6,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: false,
    isScrapped: false,
  },
  {
    id: 7,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: false,
    isScrapped: false,
  },
  {
    id: 8,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: true,
    isScrapped: false,
  },
  {
    id: 9,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: false,
    isScrapped: true,
  },
  {
    id: 10,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: true,
    isScrapped: false,
  },
  {
    id: 11,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: false,
    isScrapped: false,
  },
];

const GuestBookPage = ({
  spaceName = "스페이스 이름",
  onBack,
  onCardClick,
  onNewStackClick,
}: GuestBookPageProps) => {
  const [activeView, setActiveView] = useState<GuestBookView>("card");
  const [activeFilter, setActiveFilter] = useState<GuestBookFilter>("all");
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const isTooltipDismissed = useRef(false);
  // TODO: API 연동 시 서버 상태로 대체
  const [scrappedIds, setScrappedIds] = useState<Set<number>>(
    () => new Set(DUMMY_CARDS.filter((c) => c.isScrapped).map((c) => c.id)),
  );

  const hasNewCards = DUMMY_CARDS.some((card) => card.isNew);
  const regularCards = DUMMY_CARDS.filter((card) => !card.isNew);

  const filteredCards = regularCards.filter((card) => {
    if (activeFilter === "photo") return card.isPhotoExist;
    if (activeFilter === "scrap") return scrappedIds.has(card.id);
    return true;
  });

  // TODO: API 응답으로 대체 필요
  const totalCount = filteredCards.length;

  function toggleScrap(id: number) {
    setScrappedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function renderCardView() {
    return (
      <S.CardGrid>
        {hasNewCards && <GuestCardStack onClick={onNewStackClick} />}
        {filteredCards.map((card) => (
          <GuestCard
            key={card.id}
            author={card.author}
            text={card.text}
            isPhotoExist={card.isPhotoExist}
            onClick={() => onCardClick(card.id)}
            headerType={{
              iconType: "scrap",
              isScrapped: scrappedIds.has(card.id),
              toggleScrap: () => toggleScrap(card.id),
            }}
          />
        ))}
      </S.CardGrid>
    );
  }

  function renderListView() {
    return (
      <S.GuestListContainer>
        {hasNewCards && <GuestListStack onClick={onNewStackClick} />}
        {filteredCards.map((card) => (
          <GuestList
            key={card.id}
            title={card.author}
            hasPhoto={card.isPhotoExist}
            onClick={() => onCardClick(card.id)}
          />
        ))}
      </S.GuestListContainer>
    );
  }

  function renderContent() {
    switch (activeView) {
      case "card":
        return renderCardView();
      case "list":
        return renderListView();
    }
  }

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
              ariaLabel={`${MOCK_NEW_COUNT}개의 새 방명록`}
            >
              <S.TooltipText>
                <S.TooltipCount>{MOCK_NEW_COUNT}개</S.TooltipCount>
                <S.TooltipSub>의 새 방명록</S.TooltipSub>
              </S.TooltipText>
            </Tooltip>
          </S.TooltipAnchor>
        )}
        {renderContent()}
      </S.ContentWrapper>
      <S.BottomSpacer />
      <S.BottomTabWrapper>
        <TabMenu
          variant="pill"
          activeTab={activeView === "card" ? "left" : "right"}
          left={{ text: "카드 보기", onClick: () => setActiveView("card") }}
          right={{ text: "목록 보기", onClick: () => setActiveView("list") }}
        />
      </S.BottomTabWrapper>
    </NavigationBarLayout>
  );
};

export default GuestBookPage;
