import { isAxiosError } from "axios";
import { useState } from "react";
import { withApiVersion } from "@/api/apiVersion";
import { useGet } from "@/api/generated/product-전시-작품";
import type { ApiResponseProductResponse, ProductResponse } from "@/api/model";
import Button from "@/components/@common/Button/Button";
import NavigationBar from "@/components/@common/NavigationBar/NavigationBar";
import ImageLightbox from "@/components/UI/ImageLightbox/ImageLightbox";
import useDelayedLoading from "@/hooks/@common/useDelayedLoading";
import { getImageUrl } from "@/utils/getImageUrl";
import { getYoutubeEmbedUrl } from "@/utils/getYoutubeEmbedUrl";
import * as S from "./GuestArtworkDetailPage.styles";

interface GuestArtworkDetailPageProps {
  /** 스페이스 ID */
  spaceId: string;
  /** 작품 ID */
  artworkId: number;
  /** 뒤로가기 핸들러 */
  onBack: () => void;
  /** "방명록 작성하기" 버튼 클릭 핸들러 */
  onWriteClick: () => void;
}

const GuestArtworkDetailPage = ({
  spaceId,
  artworkId,
  onBack,
  onWriteClick,
}: GuestArtworkDetailPageProps) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxStartIndex, setLightboxStartIndex] = useState(0);

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
        <NavigationBar onBackClick={onBack} />
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
        <NavigationBar onBackClick={onBack} />
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
  const images = (artwork.photos ?? [])
    .map((photo) =>
      photo.path
        ? {
            id: photo.id,
            url: getImageUrl(photo.path),
            order: photo.order ?? 0,
          }
        : null,
    )
    .filter((image): image is NonNullable<typeof image> => image !== null)
    .sort((a, b) => a.order - b.order)
    .map((image) => ({ id: image.id, url: image.url, name: title }));
  const embedUrl = artwork.videoUrl
    ? getYoutubeEmbedUrl(artwork.videoUrl)
    : null;
  // isVideoAfterPhoto가 false면 영상을 사진보다 먼저 보여준다 (필드 없으면 기존 기본 순서인 사진 → 영상 유지)
  const isVideoFirst = artwork.isVideoAfterPhoto === false;

  const videoSection = embedUrl && (
    <S.VideoSection>
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

  const imageSection = images.length > 0 && (
    <S.ImageList>
      {images.map((image, index) => (
        <S.ArtworkImageButton
          key={image.id ?? image.url}
          type="button"
          aria-label="작품 이미지 확대보기"
          onClick={() => {
            setLightboxStartIndex(index);
            setIsLightboxOpen(true);
          }}
        >
          <S.ArtworkImage src={image.url} alt={title} />
        </S.ArtworkImageButton>
      ))}
    </S.ImageList>
  );

  return (
    <S.ScrollArea>
      <NavigationBar onBackClick={onBack} />

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

      {images.length > 0 && (
        <ImageLightbox
          key={lightboxStartIndex}
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          images={images}
          startIndex={lightboxStartIndex}
          allowSave={false}
        />
      )}

      <S.WriteCtaWrapper>
        <Button
          text="방명록 작성하기"
          onClick={onWriteClick}
          variant="tertiary"
        />
      </S.WriteCtaWrapper>
    </S.ScrollArea>
  );
};

export default GuestArtworkDetailPage;
