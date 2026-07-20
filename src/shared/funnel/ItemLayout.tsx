import type { ReactNode } from "react";
import * as S from "./ItemLayout.styles";

interface ItemLayoutProps {
  /** 스크롤 가능한 콘텐츠 영역 */
  children: ReactNode;
  /** 하단 버튼 슬롯 */
  button: ReactNode;
}

const ItemLayout = ({ children, button }: ItemLayoutProps) => {
  return (
    <S.Wrapper>
      <S.ScrollArea>{children}</S.ScrollArea>
      <S.Footer>{button}</S.Footer>
    </S.Wrapper>
  );
};

export default ItemLayout;
