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
import IcEdit from "@/assets/icons/ic_edit.svg?react";
import IcPlus from "@/assets/icons/ic_plus.svg?react";
import ArtworkPlaceholderGraphic from "@/assets/images/artwork_card_placeholder.svg?react";
import Tooltip from "@/components/@common/tooltip/Tooltip";
import ArtworkCard from "@/components/UI/ArtworkCard/ArtworkCard";
import SwiperAction from "@/components/UI/SwiperAction/SwiperAction";
import { useIsTruncated } from "@/hooks/@common/useIsTruncated";
import * as S from "./ArtworkPage.styles";

interface ArtworkPageProps {
  /** 스페이스 ID */
  spaceId: string;
  /** 전시 정보 수정 버튼 클릭 핸들러 */
  onEditClick?: () => void;
  /** 작품 추가 버튼 클릭 핸들러 */
  onAddArtworkClick?: () => void;
  /** 작품 카드 클릭 핸들러 */
  onArtworkClick?: (artworkId: number) => void;
}

const ArtworkPage = ({
  spaceId,
  onEditClick = () => {},
  onAddArtworkClick = () => {},
  onArtworkClick = () => {},
}: ArtworkPageProps) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

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
        <S.TitleSkeleton />
        <S.DescriptionSkeleton />

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
          <S.CardSkeleton />
        </S.CarouselWrapper>
      </S.ScrollArea>
    );
  }

  const artworks = (products.products ?? []).filter(
    (product): product is typeof product & { id: number } =>
      product.id !== undefined,
  );

  return (
    <S.ScrollArea>
      <S.TitleRow>
        <S.Title>{space.name}</S.Title>
        <S.EditButton
          type="button"
          aria-label="전시 정보 수정"
          onClick={onEditClick}
        >
          <IcEdit width={29} height={29} />
        </S.EditButton>
      </S.TitleRow>

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

      <S.Divider />

      <S.SectionHeader>
        <S.SectionTitle>작품 {artworks.length}개</S.SectionTitle>
        <S.AddButtonWrapper>
          <S.AddButton
            type="button"
            aria-label="작품 추가"
            onClick={onAddArtworkClick}
          >
            <IcPlus width={24} height={24} />
          </S.AddButton>
          {artworks.length === 0 && (
            <S.EmptyStateTooltipWrapper>
              <Tooltip
                variant="gradient"
                ariaLabel="첫번째 작품을 소개해주세요!"
              >
                <S.EmptyStateTooltipText>
                  첫번째 작품을 소개해주세요!
                </S.EmptyStateTooltipText>
              </Tooltip>
            </S.EmptyStateTooltipWrapper>
          )}
        </S.AddButtonWrapper>
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

export default ArtworkPage;
