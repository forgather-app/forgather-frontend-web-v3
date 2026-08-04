import type { ReactNode } from "react";
import IcBack from "@/assets/icons/ic_back.svg?react";
import * as S from "./NavigationBar.styles";

export interface NavigationBarProps {
  /** 오른쪽에 표시할 콘텐츠 — SVG 아이콘(32×32 권장) 또는 텍스트(예: "나중에 하기") */
  rightContent?: ReactNode;
  /** 중앙에 표시할 타이틀 텍스트 */
  title?: string;
  /** rightContent가 아이콘일 때의 접근성 레이블. 텍스트일 때는 불필요합니다 */
  rightAriaLabel?: string;
  /** 뒤로가기 버튼 클릭 핸들러 — 전달 시 왼쪽에 뒤로가기 버튼 표시 */
  onBackClick?: () => void;
  /** 오른쪽 버튼(rightContent) 클릭 핸들러 */
  onRightClick?: () => void;
}

const NavigationBar = ({
  rightContent,
  title,
  rightAriaLabel = "메뉴",
  onBackClick,
  onRightClick,
}: NavigationBarProps) => {
  const hasBackButton = !!onBackClick;
  const hasRightButton = !!rightContent && !!onRightClick;
  const isTextContent = typeof rightContent === "string";

  return (
    <S.Wrapper role="navigation" aria-label={title ?? "네비게이션"}>
      <S.Slot $align="start">
        {hasBackButton && (
          <S.IconButton
            type="button"
            $align="start"
            onClick={onBackClick}
            aria-label="뒤로 가기"
          >
            <IcBack aria-hidden="true" />
          </S.IconButton>
        )}
      </S.Slot>
      <S.Title>{title}</S.Title>
      <S.Slot $align="end">
        {hasRightButton && isTextContent && (
          <S.TextButton type="button" onClick={onRightClick}>
            {rightContent}
          </S.TextButton>
        )}
        {hasRightButton && !isTextContent && (
          <S.IconButton
            type="button"
            $align="end"
            onClick={onRightClick}
            aria-label={rightAriaLabel}
          >
            {rightContent}
          </S.IconButton>
        )}
      </S.Slot>
    </S.Wrapper>
  );
};

export default NavigationBar;
