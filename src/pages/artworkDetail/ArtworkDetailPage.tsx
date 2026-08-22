import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useState } from "react";
import { withApiVersion } from "@/api/apiVersion";
import {
  getGetQueryKey,
  getGetV3QueryKey,
  useDeleteV2,
  useGet,
} from "@/api/generated/product-전시-작품";
import type { ApiResponseProductResponse, ProductResponse } from "@/api/model";
import IcLeftArrow from "@/assets/icons/ic_left_arrow.svg?react";
import IcVerticalDots from "@/assets/icons/ic_vertical_dots.svg?react";
import Button from "@/components/@common/Button/Button";
import Dropdown from "@/components/@common/Dropdown/Dropdown";
import ImageLightbox from "@/components/UI/ImageLightbox/ImageLightbox";
import Modal from "@/components/UI/Modal/Modal";
import useDelayedLoading from "@/hooks/@common/useDelayedLoading";
import useSnackBar from "@/hooks/@common/useSnackBar";
import { getImageUrl } from "@/utils/getImageUrl";
import { getYoutubeEmbedUrl } from "@/utils/getYoutubeEmbedUrl";
import * as S from "./ArtworkDetailPage.styles";

interface ArtworkDetailPageProps {
  /** 스페이스 ID */
  spaceId: string;
  /** 작품 ID */
  artworkId: number;
  /** 뒤로가기 핸들러 */
  onBack: () => void;
  /** '수정하기' 선택 핸들러 */
  onEditClick?: () => void;
  /** 삭제 성공 후 호출되는 핸들러 (예: 목록으로 이동) */
  onDeleteSuccess?: () => void;
}

const ArtworkDetailPage = ({
  spaceId,
  artworkId,
  onBack,
  onEditClick = () => {},
  onDeleteSuccess = () => {},
}: ArtworkDetailPageProps) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const { showSnackBar } = useSnackBar();
  const queryClient = useQueryClient();
  const { mutate: deleteArtwork } = useDeleteV2({
    request: withApiVersion(1),
  });

  const handleConfirmDelete = () => {
    deleteArtwork(
      { spaceCode: spaceId, productId: artworkId },
      {
        onSuccess: () => {
          setIsDeleteConfirmOpen(false);
          showSnackBar("작품을 삭제했어요", "alert");
          // 목록/상세 캐시를 무효화해 뒤로가기 등으로 재접근해도 삭제된 상태가 바로 반영되게 한다
          queryClient.invalidateQueries({
            queryKey: getGetV3QueryKey(spaceId),
          });
          queryClient.invalidateQueries({
            queryKey: getGetQueryKey(spaceId, artworkId),
          });
          onDeleteSuccess();
        },
        onError: () => {
          setIsDeleteConfirmOpen(false);
          showSnackBar("작품 삭제에 실패했어요", "error");
        },
      },
    );
  };

  const {
    data: artwork,
    isPending,
    isError,
    error,
    refetch,
  } = useGet<ProductResponse>(spaceId, artworkId, {
    query: {
      select: (response) =>
        // TODO: 응답 content-type이 `*/*`로 내려와 orval이 실제 스키마 대신 Blob으로 추론함 — 백엔드가 application/json으로 명시하면 캐스팅 제거 가능
        (response as unknown as ApiResponseProductResponse).data ?? {},
    },
    request: withApiVersion(1),
  });
  const showSkeleton = useDelayedLoading(isPending);

  if (isError) {
    const isNotFound = isAxiosError(error) && error.response?.status === 404;

    return (
      <S.ScrollArea>
        <S.ErrorState>
          <S.ErrorMessage>
            {isNotFound ? "잘못된 접근입니다." : "정보를 불러오지 못했어요."}
          </S.ErrorMessage>
          {isNotFound ? (
            <Button variant="secondary" text="돌아가기" onClick={onBack} />
          ) : (
            <Button
              variant="secondary"
              text="다시 시도"
              onClick={() => refetch()}
            />
          )}
        </S.ErrorState>
      </S.ScrollArea>
    );
  }

  if (isPending) {
    if (!showSkeleton) return null;

    return (
      <S.ScrollArea>
        <S.Nav>
          <S.IconButton type="button" aria-label="뒤로 가기" onClick={onBack}>
            <IcLeftArrow width={24} height={24} />
          </S.IconButton>
          <S.IconButton type="button" aria-label="더보기 메뉴" disabled>
            <IcVerticalDots width={24} height={24} />
          </S.IconButton>
        </S.Nav>

        <S.Content>
          <S.TitleSection>
            <S.TitleSkeleton />
            <S.ArtistSkeleton />
          </S.TitleSection>

          <S.MediaSkeleton />

          <S.DescriptionSkeleton />
        </S.Content>
      </S.ScrollArea>
    );
  }

  const title = artwork.title ?? "";
  const artistName = artwork.authorName ?? "";
  const imageUrl = artwork.photos?.[0]?.path
    ? getImageUrl(artwork.photos[0].path)
    : undefined;
  const embedUrl = artwork.videoUrl
    ? getYoutubeEmbedUrl(artwork.videoUrl)
    : null;
  // isVideoAfterPhoto가 false면 영상을 사진보다 먼저 보여준다 (필드 없으면 기존 기본 순서인 사진 → 영상 유지)
  const isVideoFirst = artwork.isVideoAfterPhoto === false;

  const videoSection = embedUrl && (
    <S.VideoSection>
      <S.SectionTitle>영상</S.SectionTitle>
      <S.VideoFrame>
        <S.VideoIframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </S.VideoFrame>
    </S.VideoSection>
  );

  const imageSection = imageUrl && (
    <S.ArtworkImageButton
      type="button"
      aria-label="작품 이미지 확대보기"
      onClick={() => setIsLightboxOpen(true)}
    >
      <S.ArtworkImage src={imageUrl} alt={title} />
    </S.ArtworkImageButton>
  );

  return (
    <S.ScrollArea>
      <S.Nav>
        <S.IconButton type="button" aria-label="뒤로 가기" onClick={onBack}>
          <IcLeftArrow width={24} height={24} />
        </S.IconButton>
        <S.MenuWrapper>
          <S.IconButton
            type="button"
            aria-label="더보기 메뉴"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <IcVerticalDots width={24} height={24} />
          </S.IconButton>
          <Dropdown
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            items={[
              {
                label: "삭제하기",
                onClick: () => setIsDeleteConfirmOpen(true),
              },
              { label: "수정하기", onClick: onEditClick },
            ]}
          />
        </S.MenuWrapper>
      </S.Nav>

      <S.Content>
        <S.TitleSection>
          <S.Title>{title}</S.Title>
          <S.Artist>{artistName}</S.Artist>
        </S.TitleSection>

        {isVideoFirst ? (
          <>
            {videoSection}
            {imageSection}
          </>
        ) : (
          <>
            {imageSection}
            {videoSection}
          </>
        )}

        <S.Description>{artwork.description}</S.Description>
      </S.Content>

      {imageUrl && (
        <ImageLightbox
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          images={[{ url: imageUrl, name: title }]}
        />
      )}

      <Modal
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
      >
        <Modal.Overlay />
        <Modal.Content>
          <S.ConfirmBody>
            <S.ConfirmTextGroup>
              <S.ConfirmTitle>작품을 삭제할까요?</S.ConfirmTitle>
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
                variant="primary"
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

export default ArtworkDetailPage;
