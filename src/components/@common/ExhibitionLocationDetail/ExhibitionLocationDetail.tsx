import * as S from "./ExhibitionLocationDetail.styles";

interface ExhibitionLocationDetailProps {
  placeName?: string;
  placeUrl?: string;
  emptyMessage?: string;
}

// 카카오 로컬 API의 place_url은 http로 내려오는 경우가 있고, 그대로 쓰면 카카오맵 앱이
// 설치되지 않은 환경(RN WebView 등)에서 cleartext/ATS 정책에 막혀 로딩이 실패한다.
// 경로·쿼리·해시는 그대로 두고 scheme만 https로 맞춘다.
const toHttpsUrl = (url: string) => url.replace(/^http:\/\//i, "https://");

const ExhibitionLocationDetail = ({
  placeName,
  placeUrl,
  emptyMessage,
}: ExhibitionLocationDetailProps) => {
  if (!placeName && !emptyMessage) return null;

  return (
    <S.Row>
      <S.Label>전시 장소</S.Label>
      <S.Content>
        <S.PlaceName>{placeName || emptyMessage}</S.PlaceName>
        {placeName && placeUrl ? (
          <S.MapLink
            href={toHttpsUrl(placeUrl)}
            target="_blank"
            rel="noopener noreferrer"
          >
            카카오맵으로 열기 ↗
          </S.MapLink>
        ) : null}
      </S.Content>
    </S.Row>
  );
};

export default ExhibitionLocationDetail;
