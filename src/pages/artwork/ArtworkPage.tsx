import IcEdit from "@/assets/icons/ic_edit.svg?react";
import IcLeftArrow from "@/assets/icons/ic_left_arrow.svg?react";
import IcLink from "@/assets/icons/ic_link.svg?react";
import IcPlus from "@/assets/icons/ic_plus.svg?react";
import TabMenu from "@/components/@common/TabMenu/TabMenu";
import ArtworkCard from "@/components/UI/ArtworkCard/ArtworkCard";
import SwiperAction from "@/components/UI/SwiperAction/SwiperAction";
import * as S from "./ArtworkPage.styles";

interface Artwork {
  id: number;
  title: string;
  imageUrl?: string;
}

interface ArtworkPageProps {
  /** 뒤로가기 핸들러 */
  onBack: () => void;
  /** 방명록 탭 클릭 핸들러 */
  onGuestBookTabClick: () => void;
  /** 전시 정보 수정 버튼 클릭 핸들러 */
  onEditClick?: () => void;
  /** 작품 추가 버튼 클릭 핸들러 */
  onAddArtworkClick?: () => void;
  /** 작품 카드 클릭 핸들러 */
  onArtworkClick?: (artworkId: number) => void;
}

const DUMMY_EXHIBITION = {
  title: "포게더 : 작가와 방문객이 연결되는 곳",
  description:
    "전시 제목을 작성해주세요전시 제목을 작성해주세요전시 제목을 작성해주세요전시 제목을 작성해주 전시 제목을 작성해주세요전시 제목을 작성해주세요전시 제목을 작성해주...",
};

const DUMMY_ARTWORKS: Artwork[] = [
  {
    id: 1,
    title:
      "작품 제목이 들어가는 곳입니다. 최대 2줄까지 작성 가능 이후 텍스트는 생략됩니",
  },
  { id: 2, title: "작품 제목이 들어가는 곳입니다." },
  { id: 3, title: "작품 제목이 들어가는 곳입니다." },
];

const ArtworkPage = ({
  onBack,
  onGuestBookTabClick,
  onEditClick = () => {},
  onAddArtworkClick = () => {},
  onArtworkClick = () => {},
}: ArtworkPageProps) => {
  return (
    <S.ScrollArea>
      <S.TitleRow>
        <S.Title>{DUMMY_EXHIBITION.title}</S.Title>
        <S.EditButton
          type="button"
          aria-label="전시 정보 수정"
          onClick={onEditClick}
        >
          <IcEdit width={29} height={29} />
        </S.EditButton>
      </S.TitleRow>

      <S.DescriptionRow>
        <S.Description>{DUMMY_EXHIBITION.description}</S.Description>
        <S.MoreButton type="button">더보기</S.MoreButton>
      </S.DescriptionRow>

      <S.Divider />

      <S.SectionHeader>
        <S.SectionTitle>작품</S.SectionTitle>
        <S.AddButton
          type="button"
          aria-label="작품 추가"
          onClick={onAddArtworkClick}
        >
          <IcPlus width={24} height={24} />
        </S.AddButton>
      </S.SectionHeader>

      <S.CarouselWrapper>
        <SwiperAction
          swiperElement={DUMMY_ARTWORKS.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              title={artwork.title}
              imageUrl={artwork.imageUrl}
              onClick={() => onArtworkClick(artwork.id)}
            />
          ))}
        />
      </S.CarouselWrapper>

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
          activeTab="left"
          left={{ text: "작품", onClick: () => {} }}
          right={{ text: "방명록", onClick: onGuestBookTabClick }}
        />
        <S.FloatingIconButton
          type="button"
          aria-label="링크 공유"
          onClick={() => {}}
        >
          <IcLink width={24} height={24} />
        </S.FloatingIconButton>
      </S.BottomBar>
    </S.ScrollArea>
  );
};

export default ArtworkPage;
