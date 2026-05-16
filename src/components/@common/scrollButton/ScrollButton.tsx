import type { ButtonHTMLAttributes, ReactNode } from "react";
import doubleArrowDown from "../../../assets/ic-double-arrow-down.svg";
import doubleArrowUp from "../../../assets/ic-double-arrow-up.svg";
import * as S from "./ScrollButton.styles";

export type ScrollButtonDirection = "down" | "up";

const ICON_BY_DIRECTION: Record<ScrollButtonDirection, string> = {
  down: doubleArrowDown,
  up: doubleArrowUp,
};

interface ScrollButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 라벨 또는 자식 노드 */
  children: ReactNode;
  /**
   * 더블 화살표 방향.
   *
   * - `down`: 아래로 스크롤 (기본값)
   * - `up`: 위로 스크롤
   */
  direction?: ScrollButtonDirection;
}

const ScrollButton = ({
  children,
  direction = "down",
  type = "button",
  ...rest
}: ScrollButtonProps) => {
  return (
    <S.Button type={type} {...rest}>
      <S.Label>{children}</S.Label>
      <S.Icon src={ICON_BY_DIRECTION[direction]} alt="" aria-hidden="true" />
    </S.Button>
  );
};

export default ScrollButton;
