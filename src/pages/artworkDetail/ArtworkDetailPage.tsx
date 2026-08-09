import { useState } from "react";
import { withApiVersion } from "@/api/apiVersion";
import { useGet } from "@/api/generated/product-전시-작품";
import type { ApiResponseProductResponse, ProductResponse } from "@/api/model";
import IcLeftArrow from "@/assets/icons/ic_left_arrow.svg?react";
import IcVerticalDots from "@/assets/icons/ic_vertical_dots.svg?react";
import Button from "@/components/@common/Button/Button";
import ImageLightbox from "@/components/UI/ImageLightbox/ImageLightbox";
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
  /** 더보기(케밥) 메뉴 클릭 핸들러 */
  onMenuClick?: () => void;
}

const ArtworkDetailPage = ({
  spaceId,
  artworkId,
  onBack,
  onMenuClick,
}: ArtworkDetailPageProps) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const {
    data: artwork,
    isPending,
    isError,
    refetch,
  } = useGet<ProductResponse>(spaceId, artworkId, {
    query: {
      select: (response) =>
        // TODO: 응답 content-type이 `*/*`로 내려와 orval이 실제 스키마 대신 Blob으로 추론함 — 백엔드가 application/json으로 명시하면 캐스팅 제거 가능
        (response as unknown as ApiResponseProductResponse).data ?? {},
    },
    request: withApiVersion(1),
  });

  if (isError) {
    return (
      <S.ScrollArea>
        <S.ErrorState>
          <S.ErrorMessage>정보를 불러오지 못했어요.</S.ErrorMessage>
          <Button
            variant="secondary"
            text="다시 시도"
            onClick={() => refetch()}
          />
        </S.ErrorState>
      </S.ScrollArea>
    );
  }

  if (isPending) {
    return <S.ScrollArea />;
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
        <S.IconButton
          type="button"
          aria-label="더보기 메뉴"
          onClick={onMenuClick}
        >
          <IcVerticalDots width={24} height={24} />
        </S.IconButton>
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
    </S.ScrollArea>
  );
};

export default ArtworkDetailPage;
