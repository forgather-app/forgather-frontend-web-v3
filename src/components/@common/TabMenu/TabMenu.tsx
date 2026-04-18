import { useState } from "react";
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
  /** 왼쪽 탭 */
  left: TabItem;
  /** 오른쪽 탭 */
  right: TabItem;
}

const TabMenu = ({ variant, left, right }: TabMenuProps) => {
  const [activeTab, setActiveTab] = useState<"left" | "right">("left");

  const handleLeft = () => {
    setActiveTab("left");
    left.onClick();
  };

  const handleRight = () => {
    setActiveTab("right");
    right.onClick();
  };

  const isRightActive = activeTab === "right";

  return (
    <S.Container variant={variant} role="tablist">
      <S.Indicator
        variant={variant}
        isRightActive={isRightActive}
        aria-hidden="true"
      />
      <S.TabButton
        variant={variant}
        isActive={!isRightActive}
        onClick={handleLeft}
        role="tab"
        aria-selected={!isRightActive}
      >
        {left.text}
      </S.TabButton>
      <S.TabButton
        variant={variant}
        isActive={isRightActive}
        onClick={handleRight}
        role="tab"
        aria-selected={isRightActive}
      >
        {right.text}
      </S.TabButton>
    </S.Container>
  );
};

export default TabMenu;
