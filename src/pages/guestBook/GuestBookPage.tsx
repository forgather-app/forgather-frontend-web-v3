import { useState } from "react";
import FilterChip from "@/components/@common/Chip/FilterChip/FilterChip";
import GuestCard from "@/components/@common/GuestCard/GuestCard";
import GuestList from "@/components/@common/GuestList/GuestList";
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
}

const DUMMY_CARDS = [
  {
    id: 1,
    isNew: true,
    author: "김이름",
    text: "졸업 전시 축하해요!",
    isPhotoExist: false,
  },
  {
    id: 2,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: false,
  },
  {
    id: 3,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: true,
  },
  {
    id: 4,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: false,
  },
  {
    id: 5,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: true,
  },
  {
    id: 6,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: false,
  },
  {
    id: 7,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: false,
  },
  {
    id: 8,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: true,
  },
  {
    id: 9,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: false,
  },
  {
    id: 10,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: true,
  },
  {
    id: 11,
    isNew: false,
    author: "김이름",
    text: "졸업 전시 축하해졸업 전시 축하해졸업 전시 축하해 졸업 전시 축하해 전시 축하해 졸업",
    isPhotoExist: false,
  },
];

const GuestBookPage = ({
  spaceName = "스페이스 이름",
  onBack,
}: GuestBookPageProps) => {
  const [activeView, setActiveView] = useState<GuestBookView>("card");
  const [activeFilter, setActiveFilter] = useState<GuestBookFilter>("all");
  // TODO: API 연동 시 mutation(읽음 처리) + invalidateQueries로 교체 필요. isNew는 서버 상태
  const [openedCardIds, setOpenedCardIds] = useState<Set<number>>(new Set());
  const [isTooltipVisible, setIsTooltipVisible] = useState(MOCK_NEW_COUNT > 0);
  // TODO: API 응답으로 대체 필요
  const totalCount = DUMMY_CARDS.length;

  function renderCardView() {
    return (
      <S.CardGrid>
        {DUMMY_CARDS.map((card) => (
          <GuestCard
            key={card.id}
            isNew={card.isNew}
            author={card.author}
            text={card.text}
            isPhotoExist={card.isPhotoExist}
            headerType={{
              iconType: "scrap",
              isScrapped: false,
              // TODO: API 연동 후 스크랩 기능 구현
              toggleScrap: () => {},
            }}
          />
        ))}
      </S.CardGrid>
    );
  }

  function renderListView() {
    return (
      <S.GuestListContainer>
        {DUMMY_CARDS.map((card) => {
          if (card.isNew && !openedCardIds.has(card.id)) {
            return (
              <GuestList
                key={card.id}
                isNew
                onClick={() =>
                  setOpenedCardIds((prev) => new Set(prev).add(card.id))
                }
              />
            );
          }
          return (
            <GuestList
              key={card.id}
              title={card.author}
              hasPhoto={card.isPhotoExist}
              onClick={() => {}}
            />
          );
        })}
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
            onClick={() => setActiveFilter("all")}
          />
          <FilterChip
            label="이미지 방명록"
            isSelected={activeFilter === "photo"}
            onClick={() => setActiveFilter("photo")}
          />
          <FilterChip
            label="스크랩"
            isSelected={activeFilter === "scrap"}
            onClick={() => setActiveFilter("scrap")}
          />
        </S.ChipRow>
      </S.FilterSection>

      <S.ContentWrapper>
        {isTooltipVisible && (
          <S.TooltipAnchor>
            <Tooltip
              onClose={() => setIsTooltipVisible(false)}
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
