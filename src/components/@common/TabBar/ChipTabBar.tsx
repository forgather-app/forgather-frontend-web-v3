import DisplayChip from "../Chip/DisplayChip/DisplayChip";
import * as S from "./ChipTabBar.styles";

interface TabItem {
  /** 탭 텍스트 */
  text: string;
  /** 탭 클릭 핸들러 */
  onClick: () => void;
  /** 카운터 뱃지 텍스트 */
  chipText: string;
}

interface ChipTabBarProps {
  /** 현재 활성 탭 */
  activeTab: "left" | "right";
  /** 왼쪽 탭 */
  left: TabItem;
  /** 오른쪽 탭 */
  right: TabItem;
}

const ChipTabBar = ({ activeTab, left, right }: ChipTabBarProps) => {
  const isRightActive = activeTab === "right";

  return (
    <S.Container role="tablist">
      <S.Indicator isRightActive={isRightActive} aria-hidden="true" />
      <S.TabButton
        isActive={!isRightActive}
        onClick={left.onClick}
        role="tab"
        aria-selected={!isRightActive}
      >
        {left.text}
        <DisplayChip text={left.chipText} variant="counter" />
      </S.TabButton>
      <S.TabButton
        isActive={isRightActive}
        onClick={right.onClick}
        role="tab"
        aria-selected={isRightActive}
      >
        {right.text}
        <DisplayChip text={right.chipText} variant="counter" />
      </S.TabButton>
    </S.Container>
  );
};

export default ChipTabBar;
