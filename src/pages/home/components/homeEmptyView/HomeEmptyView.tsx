import HomeEmptyGraphic from "@/assets/images/home_empty_graphic.svg?react";
import * as S from "./HomeEmptyView.styles";

const HomeEmptyView = () => {
  return (
    <S.Wrapper>
      <HomeEmptyGraphic width={200} height={200} aria-hidden />
      <S.TextGroup>
        <S.Title>아직 스페이스가 없어요!</S.Title>
        <S.SubText>
          {
            "스페이스에서는 작품을 등록하고,\n링크를 공유해 방명록을 받을 수 있어요."
          }
        </S.SubText>
      </S.TextGroup>
    </S.Wrapper>
  );
};

export default HomeEmptyView;
