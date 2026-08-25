import { useState } from "react";
import { withApiVersion } from "@/api/apiVersion";
import { useGetV3 } from "@/api/generated/product-전시-작품";
import { useGetSpaceInformation } from "@/api/generated/space-스페이스";
import type {
  ApiResponseProductsResponse,
  ApiResponseSpaceResponse,
  ProductsResponse,
  SpaceResponse,
} from "@/api/model";
import IcLink from "@/assets/icons/ic_link.svg?react";
import ArtworkPlaceholderGraphic from "@/assets/images/artwork_card_placeholder.svg?react";
import Divider from "@/components/@common/Divider/Divider";
import ArtworkCard from "@/components/UI/ArtworkCard/ArtworkCard";
import SwiperAction from "@/components/UI/SwiperAction/SwiperAction";
import { useIsTruncated } from "@/hooks/@common/useIsTruncated";
import { getImageUrl } from "@/utils/getImageUrl";
import * as S from "./GuestArtworkPage.styles";

/** 이전/다음 작품 카드가 좌우에 대칭으로 살짝 보이는 정도(카드 폭 대비 비율) */
const CAROUSEL_SIDE_PEEK_RATIO = 0.02;

/** 섹션 구분선 색상 */
const SECTION_DIVIDER_COLOR = "rgba(17, 17, 17, 0.7)";

interface GuestArtworkPageProps {
  /** 스페이스 ID */
  spaceId: string;
  /** 작품 카드 클릭 핸들러 */
  onArtworkClick?: (artworkId: number) => void;
}

const GuestArtworkPage = ({
  spaceId,
  onArtworkClick = () => {},
}: GuestArtworkPageProps) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [activeArtworkIndex, setActiveArtworkIndex] = useState(0);

  const {
    data: space,
    isPending: isSpacePending,
    isError: isSpaceError,
  } = useGetSpaceInformation<SpaceResponse>(spaceId, {
    query: {
      select: (response) =>
        // TODO: 응답 content-type이 `*/*`로 내려와 orval이 실제 스키마 대신 Blob으로 추론함 — 백엔드가 application/json으로 명시하면 캐스팅 제거 가능
        (response as unknown as ApiResponseSpaceResponse).data ?? {},
    },
  });

  const { ref: descriptionRef, isTruncated: isDescriptionTruncated } =
    useIsTruncated<HTMLParagraphElement>([space?.description]);

  const {
    data: products,
    isPending: isProductsPending,
    isError: isProductsError,
  } = useGetV3<ProductsResponse>(spaceId, {
    query: {
      select: (response) =>
        (response as unknown as ApiResponseProductsResponse).data ?? {},
    },
    // 작품 목록 조회는 x-api-version: 3 헤더가 있어야 정상 라우팅됨
    request: withApiVersion(3),
  });

  // TODO: 에러 UI 구현
  if (isSpaceError || isProductsError) {
    return;
  }

  if (isSpacePending || isProductsPending) {
    return (
      <S.ScrollArea>
        <S.ProfileRow>
          <S.UserAvatar aria-hidden />
        </S.ProfileRow>

        <S.TitleSkeleton />
        <S.DescriptionSkeleton />

        <Divider color={SECTION_DIVIDER_COLOR} height={8} marginTop={24} />

        <S.SectionHeader>
          <S.SectionTitle>작품</S.SectionTitle>
        </S.SectionHeader>

        <S.CarouselWrapper>
          <S.CardSkeleton />
        </S.CarouselWrapper>
      </S.ScrollArea>
    );
  }

  const artworks = (products.products ?? []).filter(
    (product): product is typeof product & { id: number } =>
      product.id !== undefined,
  );
  const host = space.host;

  return (
    <S.ScrollArea>
      <S.ProfileRow>
        {host?.photoPath ? (
          <S.UserAvatarImage
            src={getImageUrl(host.photoPath)}
            alt=""
            aria-hidden
          />
        ) : (
          <S.UserAvatar aria-hidden />
        )}
        <S.UserName>{host?.nickname ?? ""}</S.UserName>
      </S.ProfileRow>

      <S.TitleRow>
        <S.Title>{space.name}</S.Title>
      </S.TitleRow>

      {space.linkUrl && (
        <S.SpaceLink
          href={space.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="링크 열기"
        >
          <IcLink width={16} height={16} aria-hidden="true" />
          {space.linkName || space.linkUrl}
        </S.SpaceLink>
      )}

      <S.DescriptionRow $isExpanded={isDescriptionExpanded}>
        <S.Description ref={descriptionRef} $isExpanded={isDescriptionExpanded}>
          {space.description}
        </S.Description>
        {isDescriptionTruncated && (
          <S.MoreButton
            type="button"
            onClick={() => setIsDescriptionExpanded((prev) => !prev)}
          >
            {isDescriptionExpanded ? "접기" : "더보기"}
          </S.MoreButton>
        )}
      </S.DescriptionRow>

      <Divider color={SECTION_DIVIDER_COLOR} height={8} marginTop={24} />

      <S.SectionHeader>
        <S.SectionTitle>작품 {artworks.length}건</S.SectionTitle>
      </S.SectionHeader>

      {artworks.length === 0 ? (
        <S.EmptyState>
          <S.EmptyStateGraphic aria-hidden>
            <ArtworkPlaceholderGraphic />
          </S.EmptyStateGraphic>
          <S.EmptyStateText>아직 등록된 작품이 없어요</S.EmptyStateText>
        </S.EmptyState>
      ) : (
        <S.CarouselWrapper>
          <SwiperAction
            activeIndex={activeArtworkIndex}
            onIndexChange={setActiveArtworkIndex}
            sidePeekRatio={CAROUSEL_SIDE_PEEK_RATIO}
            swiperElement={artworks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                title={artwork.title ?? ""}
                imageUrl={artwork.firstPhoto?.path}
                onClick={() => onArtworkClick(artwork.id)}
              />
            ))}
          />
        </S.CarouselWrapper>
      )}

      <S.BottomSpacer />
    </S.ScrollArea>
  );
};

export default GuestArtworkPage;
