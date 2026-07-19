import type { ReactNode } from "react";
import Button from "@/components/@common/Button/Button";
import type { ButtonVariant } from "@/components/@common/Button/Button.styles";
import * as S from "./ItemLayout.styles";

interface ItemLayoutProps {
  /** 스크롤 가능한 콘텐츠 영역 */
  children: ReactNode;
  /** 하단 버튼 텍스트 */
  text: string;
  /** 하단 버튼 시각 변형 */
  variant?: ButtonVariant;
  /** 하단 버튼 비활성화 여부 */
  disabled?: boolean;
  /** 하단 버튼 클릭 핸들러 */
  onClick: () => void;
}

const ItemLayout = ({
  children,
  text,
  variant,
  disabled,
  onClick,
}: ItemLayoutProps) => {
  return (
    <S.Wrapper>
      <S.ScrollArea>{children}</S.ScrollArea>
      <S.Footer>
        <Button
          text={text}
          variant={variant}
          disabled={disabled}
          onClick={onClick}
        />
      </S.Footer>
    </S.Wrapper>
  );
};

export default ItemLayout;
