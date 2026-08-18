import * as S from "./GuestHeader.styles";

// TODO: 정식 포게더 랜딩 페이지 URL이 정해지면 교체 필요
const FORGATHER_LANDING_URL = "https://dev.forgather.app";

/** 게스트 화면 상단에 공통으로 노출되는 브랜드 헤더(로고 + 포게더 둘러보기 링크) */
const GuestHeader = () => {
  return (
    <S.Wrapper>
      <S.Logo width={107} height={24} aria-hidden />
      <S.BrowseLink
        href={FORGATHER_LANDING_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        포게더 둘러보기
      </S.BrowseLink>
    </S.Wrapper>
  );
};

export default GuestHeader;
