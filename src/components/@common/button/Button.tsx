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

/**
 * 기본 버튼 컴포넌트.
 *
 * 3가지 변형(primary, secondary, tertiary)을 지원하며,
 * `disabled` 속성으로 Figma `inactive` 상태를 표현합니다.
 * hover와 pressed 상태는 CSS pseudo-class(`:hover`, `:active`)로 처리됩니다.
 */
const Button = ({
  variant = "primary",
  type = "button",
  children,
  ...rest
}: ButtonProps) => {
  return (
    <S.Button variant={variant} type={type} {...rest}>
      {children}
    </S.Button>
  );
};

export default Button;
