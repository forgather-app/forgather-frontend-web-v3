import type { ReactNode } from "react";
import IcBack from "../../../assets/icons/ic_back.svg?react";
import * as S from "./NavigationBar.styles";

interface NavigationBarProps {
  /** 오른쪽 아이콘 (32×32 SVG 권장) */
  rightIcon?: ReactNode;
  /** 중앙에 표시할 타이틀 텍스트 */
  title?: string;
  /** 오른쪽 아이콘 버튼의 접근성 레이블 */
  rightIconAriaLabel?: string;
  /** 뒤로가기 버튼 클릭 핸들러 — 전달 시 왼쪽에 뒤로가기 버튼 표시 */
  onBackClick?: () => void;
  /** 오른쪽 아이콘 클릭 핸들러 */
  onRightIconClick?: () => void;
}

const NavigationBar = ({
  rightIcon,
  title,
  rightIconAriaLabel = "메뉴",
  onBackClick,
  onRightIconClick,
}: NavigationBarProps) => {
  const hasBackButton = !!onBackClick;
  const hasRightButton = !!rightIcon && !!onRightIconClick;

  return (
    <S.Wrapper role="navigation" aria-label={title ?? "네비게이션"}>
      <S.Slot $align="start">
        {hasBackButton && (
          <S.IconButton
            type="button"
            onClick={onBackClick}
            aria-label="뒤로 가기"
          >
            <IcBack aria-hidden="true" />
          </S.IconButton>
        )}
      </S.Slot>
      <S.Title>{title}</S.Title>
      <S.Slot $align="end">
        {hasRightButton && (
          <S.IconButton
            type="button"
            onClick={onRightIconClick}
            aria-label={rightIconAriaLabel}
          >
            {rightIcon}
          </S.IconButton>
        )}
      </S.Slot>
    </S.Wrapper>
  );
};

export default NavigationBar;
