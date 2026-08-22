import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { withApiVersion } from "@/api/apiVersion";
import { useGetProfile } from "@/api/generated/host-호스트";
import { useGetV3 } from "@/api/generated/product-전시-작품";
import {
  getGetSpaceInformationQueryKey,
  getGetSpacesInformationQueryKey,
  useDelete,
  useGetSpaceInformation,
  useUnfeatureSpaces,
} from "@/api/generated/space-스페이스";
import type {
  ApiResponseHostProfileResponse,
  ApiResponseProductsResponse,
  ApiResponseSpaceResponse,
  ProductsResponse,
  SpaceResponse,
} from "@/api/model";
import IcEdit from "@/assets/icons/ic_edit.svg?react";
import IcLink from "@/assets/icons/ic_link.svg?react";
import IcPlus from "@/assets/icons/ic_plus.svg?react";
import IcVerticalDots from "@/assets/icons/ic_vertical_dots.svg?react";
import ArtworkPlaceholderGraphic from "@/assets/images/artwork_card_placeholder.svg?react";
import Button from "@/components/@common/Button/Button";
import Dropdown from "@/components/@common/Dropdown/Dropdown";
import Tooltip from "@/components/@common/tooltip/Tooltip";
import ArtworkCard from "@/components/UI/ArtworkCard/ArtworkCard";
import Modal from "@/components/UI/Modal/Modal";
import SwiperAction from "@/components/UI/SwiperAction/SwiperAction";
import { ERROR_MESSAGES } from "@/constants/error";
import { useIsTruncated } from "@/hooks/@common/useIsTruncated";
import useSnackBar from "@/hooks/@common/useSnackBar";
import { getImageUrl } from "@/utils/getImageUrl";
import * as S from "./ArtworkPage.styles";

/** 이전/다음 작품 카드가 좌우에 대칭으로 살짝 보이는 정도(카드 폭 대비 비율) */
const CAROUSEL_SIDE_PEEK_RATIO = 0.02;

interface ArtworkPageProps {
  /** 스페이스 ID */
  spaceId: string;
  /** 전시 정보 수정 버튼 클릭 핸들러 */
  onEditClick?: () => void;
  /** 스페이스 삭제 성공 후 호출되는 핸들러 (예: 홈으로 이동) */
  onDeleteSuccess?: () => void;
  /** 작품 추가 버튼 클릭 핸들러 */
  onAddArtworkClick?: () => void;
  /** 작품 카드 클릭 핸들러 */
  onArtworkClick?: (artworkId: number) => void;
}

const ArtworkPage = ({
  spaceId,
  onEditClick = () => {},
  onDeleteSuccess = () => {},
  onAddArtworkClick = () => {},
  onArtworkClick = () => {},
}: ArtworkPageProps) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [activeArtworkIndex, setActiveArtworkIndex] = useState(0);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const { showSnackBar } = useSnackBar();
  const queryClient = useQueryClient();
  const { mutate: deleteSpace } = useDelete();
  const { mutate: unfeatureSpace } = useUnfeatureSpaces();

  const handleConfirmDelete = () => {
    deleteSpace(
      { spaceCode: spaceId },
      {
        onSuccess: () => {
          setIsDeleteConfirmOpen(false);
          showSnackBar("스페이스를 삭제했어요", "alert");
          queryClient.invalidateQueries({
            queryKey: getGetSpacesInformationQueryKey(),
          });
          onDeleteSuccess();
        },
        onError: () => {
          setIsDeleteConfirmOpen(false);
          showSnackBar("스페이스 삭제에 실패했어요", "error");
        },
      },
    );
  };

  const handleUnfeature = () => {
    unfeatureSpace(
      { data: { spaceCodes: [spaceId] } },
      {
        onSuccess: () => {
          showSnackBar("진행을 해제했어요", "alert");
          queryClient.invalidateQueries({
            queryKey: getGetSpacesInformationQueryKey(),
          });
          queryClient.invalidateQueries({
            queryKey: getGetSpaceInformationQueryKey(spaceId),
          });
        },
        onError: () => {
          showSnackBar(ERROR_MESSAGES.SPACE_UNFEATURE_FAILED, "error");
        },
      },
    );
  };

  const { data: profile } = useGetProfile({
    query: {
      select: (response) =>
        (response as unknown as ApiResponseHostProfileResponse).data,
    },
  });

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
          <S.UserProfile>
            {profile?.photoPath ? (
              <S.UserAvatarImage
                src={getImageUrl(profile.photoPath)}
                alt=""
                aria-hidden
              />
            ) : (
              <S.UserAvatar aria-hidden />
            )}
            <S.UserName>{profile?.nickname ?? ""}</S.UserName>
          </S.UserProfile>
          <S.ActionsWrapper>
            <S.EditButton
              type="button"
              aria-label="전시 정보 수정"
              onClick={onEditClick}
            >
              <IcEdit width={28} height={28} />
            </S.EditButton>
            <S.MenuWrapper>
              <S.MoreMenuButton
                type="button"
                aria-label="더보기"
                onClick={() => setIsMoreMenuOpen((prev) => !prev)}
              >
                <IcVerticalDots width={28} height={28} />
              </S.MoreMenuButton>
              <Dropdown
                isOpen={isMoreMenuOpen}
                onClose={() => setIsMoreMenuOpen(false)}
                items={[
                  {
                    label: "삭제하기",
                    onClick: () => setIsDeleteConfirmOpen(true),
                  },
                  {
                    label: "진행 해제하기",
                    onClick: handleUnfeature,
                    disabled: !space?.isFeatured,
                  },
                ]}
              />
            </S.MenuWrapper>
          </S.ActionsWrapper>
        </S.ProfileRow>

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
      <S.ProfileRow>
        <S.UserProfile>
          {profile?.photoPath ? (
            <S.UserAvatarImage
              src={getImageUrl(profile.photoPath)}
              alt=""
              aria-hidden
            />
          ) : (
            <S.UserAvatar aria-hidden />
          )}
          <S.UserName>{profile?.nickname ?? ""}</S.UserName>
        </S.UserProfile>
        <S.ActionsWrapper>
          <S.EditButton
            type="button"
            aria-label="전시 정보 수정"
            onClick={onEditClick}
          >
            <IcEdit width={28} height={28} />
          </S.EditButton>
          <S.MenuWrapper>
            <S.MoreMenuButton
              type="button"
              aria-label="더보기"
              onClick={() => setIsMoreMenuOpen((prev) => !prev)}
            >
              <IcVerticalDots width={28} height={28} />
            </S.MoreMenuButton>
            <Dropdown
              isOpen={isMoreMenuOpen}
              onClose={() => setIsMoreMenuOpen(false)}
              items={[
                {
                  label: "삭제하기",
                  onClick: () => setIsDeleteConfirmOpen(true),
                },
                {
                  label: "진행 해제하기",
                  onClick: handleUnfeature,
                  disabled: !space?.isFeatured,
                },
              ]}
            />
          </S.MenuWrapper>
        </S.ActionsWrapper>
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
            activeIndex={activeArtworkIndex}
            onIndexChange={setActiveArtworkIndex}
            sidePeekRatio={CAROUSEL_SIDE_PEEK_RATIO}
            swiperElement={artworks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                title={artwork.title ?? ""}
                imageUrl={
                  artwork.firstPhoto?.path
                    ? getImageUrl(artwork.firstPhoto.path)
                    : undefined
                }
                onClick={() => onArtworkClick(artwork.id)}
              />
            ))}
          />
        </S.CarouselWrapper>
      )}

      <S.BottomSpacer />

      <Modal
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
      >
        <Modal.Overlay />
        <Modal.Content>
          <S.ConfirmBody>
            <S.ConfirmTextGroup>
              <S.ConfirmTitle>스페이스를 삭제할까요?</S.ConfirmTitle>
              <S.ConfirmSubtitle>삭제하면 되돌릴 수 없어요</S.ConfirmSubtitle>
            </S.ConfirmTextGroup>
            <S.ConfirmActions>
              <Button
                variant="tertiary"
                text="취소"
                onClick={() => setIsDeleteConfirmOpen(false)}
                style={{ flex: 1 }}
              />
              <Button
                variant="danger"
                text="삭제하기"
                onClick={handleConfirmDelete}
                style={{ flex: 1 }}
              />
            </S.ConfirmActions>
          </S.ConfirmBody>
        </Modal.Content>
      </Modal>
    </S.ScrollArea>
  );
};

export default ArtworkPage;
