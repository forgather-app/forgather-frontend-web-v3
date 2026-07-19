import HomeEmptyGraphic from "@/assets/images/home_empty_graphic.svg?react";
import * as S from "./HomeEmptyView.styles";

const HomeEmptyView = () => {
  return (
    <S.Wrapper>
      <HomeEmptyGraphic width={240} height={240} aria-hidden />
      <S.TextGroup>
        <S.Title>아직 스페이스가 없어요!</S.Title>
        {/* TODO: 서브텍스트 문구 확정 필요 (디자인 placeholder) */}
        <S.SubText>
          {"서브텍스트 서브텍스트\n서브텍스트 서브텍스트 서브텍스트"}
        </S.SubText>
      </S.TextGroup>
    </S.Wrapper>
  );
};

export default HomeEmptyView;
