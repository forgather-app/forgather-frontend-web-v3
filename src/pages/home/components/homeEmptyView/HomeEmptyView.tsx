import EmptyHomeImage from "@/assets/images/empty_home.svg?react";
import * as S from "./HomeEmptyView.styles";

const HomeEmptyView = () => {
  return (
    <S.Wrapper aria-label="스페이스가 없습니다">
      <EmptyHomeImage aria-hidden />
      <S.Message>작가님의 첫번째 작품을{"\n"}업로드해보세요!</S.Message>
    </S.Wrapper>
  );
};

export default HomeEmptyView;
