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
   * - `danger`: 위험 액션 (붉은 반투명 배경, 탈퇴 등 파괴적 동작)
   * - `underlined`: 텍스트 링크형 액션 (배경 없음, 밑줄)
   * - `pill`: 소형 필 버튼 (흰색 활성 / 어두운 비활성)
   * - `pillWeak`: 소형 필 버튼 (흰색 활성 / 회색 비활성)
   * - `action`: 아이콘+텍스트 CTA 버튼 (보라색 배경)
   * - `icon`: 40×40 원형 아이콘 버튼 (텍스트 없음)
   */
  variant?: ButtonVariant;
  /** 버튼 텍스트. `icon` variant에서는 사용하지 않습니다. */
  text?: string;
  /** 버튼 내 아이콘. `action`, `icon` variant와 `pill`/`pillWeak`의 선택적 아이콘에 사용합니다. */
  icon?: ReactNode;
}

const Button = ({
  variant = "primary",
  type = "button",
  text,
  icon,
  ...rest
}: ButtonProps) => {
  return (
    <S.Button $variant={variant} type={type} {...rest}>
      {icon && <S.IconWrapper aria-hidden="true">{icon}</S.IconWrapper>}
      {text}
    </S.Button>
  );
};

export default Button;
