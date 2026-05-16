import type { ButtonHTMLAttributes } from "react";
import type { ButtonVariant } from "./Button.styles";
import * as S from "./Button.styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼 시각 변형.
   *
   * - `primary`: 주요 액션 (보라색 배경)
   * - `secondary`: 보조 액션 (연보라 배경)
   * - `tertiary`: 부가 액션 (흰색 배경)
   * - `underlined`: 텍스트 링크형 액션 (배경 없음, 밑줄)
   */
  variant?: ButtonVariant;
  /** 버튼 텍스트 */
  text: string;
}

const Button = ({
  variant = "primary",
  type = "button",
  text,
  ...rest
}: ButtonProps) => {
  return (
    <S.Button $variant={variant} type={type} {...rest}>
      {text}
    </S.Button>
  );
};

export default Button;
