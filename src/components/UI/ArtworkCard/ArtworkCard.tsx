import { ARTWORK_CARD_FALLBACK_IMAGE } from "@/constants/routes";
import { handleImageError } from "@/utils/handleImageError";
import * as S from "./ArtworkCard.styles";

const artworkCardFallback = ARTWORK_CARD_FALLBACK_IMAGE;

interface ArtworkCardProps {
  /** 작품 제목. 1줄까지 표시되며 초과 시 말줄임 처리됩니다. */
  title: string;
  /** 작가명. 미전달 또는 빈 문자열이면 표시하지 않습니다. */
  authorName?: string;
  /** 작품 이미지 URL. 미전달·빈 문자열 또는 에러 시 fallback 그래픽 표시 */
  imageUrl?: string;
  /** 카드 클릭 핸들러 */
  onClick?: () => void;
}

const ArtworkCard = ({
  title,
  authorName,
  imageUrl,
  onClick,
}: ArtworkCardProps) => {
  return (
    <S.Card
      type="button"
      onClick={onClick}
      aria-label={
        authorName ? `작품: ${title}, 작가: ${authorName}` : `작품: ${title}`
      }
    >
      <S.Thumbnail
        src={imageUrl || artworkCardFallback}
        onError={(e) => handleImageError(e, artworkCardFallback)}
        alt=""
        aria-hidden
      />
      <S.Content>
        <S.Title>{title}</S.Title>
        {authorName && <S.AuthorName>{authorName}</S.AuthorName>}
      </S.Content>
    </S.Card>
  );
};

export default ArtworkCard;
