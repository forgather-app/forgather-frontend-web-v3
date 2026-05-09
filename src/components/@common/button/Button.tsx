import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { ButtonVariant } from "./Button.styles";
import * as S from "./Button.styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼 시각 변형.
   *
   * - `primary`: 주요 액션 (보라색 배경)
   * - `secondary`: 보조 액션 (연보라 배경)
   * - `tertiary`: 부가 액션 (흰색 배경)
   */
  variant?: ButtonVariant;
  /** 버튼 라벨 또는 자식 노드 */
  children: ReactNode;
}

const Button = ({
  variant = "primary",
  type = "button",
  children,
  ...rest
}: ButtonProps) => {
  return (
    <S.Button $variant={variant} type={type} {...rest}>
      {children}
    </S.Button>
  );
};

export default Button;
