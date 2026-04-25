import type { ButtonHTMLAttributes, ReactNode } from "react";
import * as S from "./UnderlinedButton.styles";

interface UnderlinedButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 라벨 또는 자식 노드 */
  children: ReactNode;
}

const UnderlinedButton = ({
  type = "button",
  children,
  ...rest
}: UnderlinedButtonProps) => {
  return (
    <S.Button type={type} {...rest}>
      {children}
    </S.Button>
  );
};

export default UnderlinedButton;
