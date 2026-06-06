import type { ReactNode } from "react";
import Button from "@/components/@common/button/Button";
import * as S from "./ItemLayout.styles";

interface ItemLayoutProps {
  /** 스크롤 가능한 콘텐츠 영역 */
  children: ReactNode;
  /** 하단 버튼 텍스트 */
  text: string;
  /** 하단 버튼 비활성화 여부 */
  disabled?: boolean;
  /** 하단 버튼 클릭 핸들러 */
  onClick: () => void;
}

const ItemLayout = ({ children, text, disabled, onClick }: ItemLayoutProps) => {
  return (
    <S.Wrapper>
      <S.ScrollArea>{children}</S.ScrollArea>
      <S.Footer>
        <Button text={text} disabled={disabled} onClick={onClick} />
      </S.Footer>
    </S.Wrapper>
  );
};

export default ItemLayout;
