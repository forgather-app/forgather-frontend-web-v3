import * as S from "./GuestHeader.styles";

/** 게스트 화면 상단에 공통으로 노출되는 브랜드 헤더(로고 + 포게더 둘러보기 링크) */
const GuestHeader = () => {
  return (
    <S.Wrapper>
      <S.Logo width={107} height={24} aria-hidden />
      <S.BrowseLink to="/landing">포게더 둘러보기</S.BrowseLink>
    </S.Wrapper>
  );
};

export default GuestHeader;
