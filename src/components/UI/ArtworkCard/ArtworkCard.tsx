import { useState } from "react";
import ArtworkPlaceholderGraphic from "@/assets/images/artwork_card_placeholder.svg?react";
import * as S from "./ArtworkCard.styles";

interface ArtworkCardProps {
  /** 작품 제목. 최대 2줄까지 표시되며 초과 시 말줄임 처리됩니다. */
  title: string;
  /** 작품 이미지 URL. 미전달 또는 로드 실패 시 플레이스홀더 그래픽이 표시됩니다. */
  imageUrl?: string;
  /** 카드 클릭 핸들러 */
  onClick?: () => void;
}

const ArtworkCard = ({ title, imageUrl, onClick }: ArtworkCardProps) => {
  const [imageError, setImageError] = useState(false);
  const showImage = Boolean(imageUrl) && !imageError;

  return (
    <S.Card role="button" onClick={onClick} aria-label={`작품: ${title}`}>
      <S.TitleBox>
        <S.Title>{title}</S.Title>
      </S.TitleBox>
      <S.ImageFrame>
        {showImage ? (
          <S.Thumbnail
            src={imageUrl}
            alt=""
            onError={() => setImageError(true)}
          />
        ) : (
          <S.PlaceholderWrapper aria-hidden>
            <ArtworkPlaceholderGraphic />
          </S.PlaceholderWrapper>
        )}
      </S.ImageFrame>
    </S.Card>
  );
};

export default ArtworkCard;
