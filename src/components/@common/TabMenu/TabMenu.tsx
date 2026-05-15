import * as S from "./TabMenu.styles";

interface TabItem {
  /** 탭 텍스트 */
  text: string;
  /** 탭 클릭 핸들러 */
  onClick: () => void;
}

interface TabMenuProps {
  /** 탭 메뉴 스타일 variant */
  variant: "pill" | "box";
  /** 현재 활성 탭 */
  activeTab: "left" | "right";
  /** 왼쪽 탭 */
  left: TabItem;
  /** 오른쪽 탭 */
  right: TabItem;
}

const TabMenu = ({ variant, activeTab, left, right }: TabMenuProps) => {
  const isRightActive = activeTab === "right";

  return (
    <S.Container variant={variant} role="tablist">
      <S.Indicator
        variant={variant}
        isRightActive={isRightActive}
        aria-hidden="true"
      />
      <S.TabButton
        type="button"
        variant={variant}
        isActive={!isRightActive}
        onClick={left.onClick}
        role="tab"
        aria-selected={!isRightActive}
      >
        {left.text}
      </S.TabButton>
      <S.TabButton
        type="button"
        variant={variant}
        isActive={isRightActive}
        onClick={right.onClick}
        role="tab"
        aria-selected={isRightActive}
      >
        {right.text}
      </S.TabButton>
    </S.Container>
  );
};

export default TabMenu;
