import { useState } from "react";
import FilterChip from "@/components/@common/Chip/FilterChip/FilterChip";
import GuestCard from "@/components/@common/guestCard/GuestCard";
import TabMenu from "@/components/@common/TabMenu/TabMenu";
import NavigationBarLayout from "@/components/layout/NavigationBarLayout/NavigationBarLayout";
import * as S from "./GuestBookPage.styles";

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
];

const GuestBookPage = ({
  spaceName = "스페이스 이름",
  onBack,
}: GuestBookPageProps) => {
  const [activeTab, setActiveTab] = useState<"left" | "right">("left");
  const [activeFilter, setActiveFilter] = useState<"all" | "photo" | "scrap">(
    "all",
  );

  return (
    <NavigationBarLayout title={spaceName} onBackClick={onBack}>
      <S.FilterSection>
        <S.CountText>
          총 <S.CountNumber>00</S.CountNumber>개의 방명록
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
              toggleScrap: () => {},
            }}
          />
        ))}
      </S.CardGrid>
      <S.BottomSpacer />
      <S.BottomTabWrapper>
        <TabMenu
          variant="pill"
          activeTab={activeTab}
          left={{ text: "카드 보기", onClick: () => setActiveTab("left") }}
          right={{ text: "목록 보기", onClick: () => setActiveTab("right") }}
        />
      </S.BottomTabWrapper>
    </NavigationBarLayout>
  );
};

export default GuestBookPage;
