import * as S from "./ExhibitionLocationDetail.styles";

interface ExhibitionLocationDetailProps {
  placeName?: string;
  placeUrl?: string;
}

const ExhibitionLocationDetail = ({
  placeName,
  placeUrl,
}: ExhibitionLocationDetailProps) => {
  if (!placeName) return null;

  return (
    <S.Row>
      <S.Label>전시 장소</S.Label>
      <S.Content>
        <S.PlaceName>{placeName}</S.PlaceName>
        {placeUrl ? (
          <S.MapLink href={placeUrl} target="_blank" rel="noopener noreferrer">
            카카오맵으로 열기 ↗
          </S.MapLink>
        ) : null}
      </S.Content>
    </S.Row>
  );
};

export default ExhibitionLocationDetail;
