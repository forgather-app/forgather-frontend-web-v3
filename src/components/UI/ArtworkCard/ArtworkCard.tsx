import { EXHIBITION_LIST_FALLBACK_IMAGE } from "@/constants/routes";
import { handleImageError } from "@/utils/handleImageError";
import * as S from "./ArtworkCard.styles";

const artworkCardFallback = EXHIBITION_LIST_FALLBACK_IMAGE;

interface ArtworkCardProps {
  /** 작품 제목. 최대 2줄까지 표시되며 초과 시 말줄임 처리됩니다. */
  title: string;
  /** 작품 이미지 URL. 미전달·빈 문자열 또는 에러 시 fallback 그래픽 표시 */
  imageUrl?: string;
  // TODO: 작가명(authorName) prop 추가 — 작품 목록 조회 API(SimpleProductResponse)에 아직 필드가 없어 보류
  /** 카드 클릭 핸들러 */
  onClick?: () => void;
}

const ArtworkCard = ({ title, imageUrl, onClick }: ArtworkCardProps) => {
  return (
    <S.Card type="button" onClick={onClick} aria-label={`작품: ${title}`}>
      <S.Thumbnail
        src={imageUrl || artworkCardFallback}
        onError={(e) => handleImageError(e, artworkCardFallback)}
        alt=""
        aria-hidden
      />
      <S.Content>
        <S.Title>{title}</S.Title>
        {/* TODO: 작가명 표시 — authorName 데이터 제공되면 SpaceCard의 MetaRow(방명록 수 자리)처럼 추가 */}
      </S.Content>
    </S.Card>
  );
};

export default ArtworkCard;
