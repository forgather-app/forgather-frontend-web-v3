import type { ComponentType } from "react";
import IcFolder from "../../../assets/ic_folder.svg?react";
import IcHome from "../../../assets/ic_home.svg?react";
import IcPerson from "../../../assets/ic_person.svg?react";
import * as S from "./BottomTabBar.styles";

export type TabType = "홈" | "방명록" | "마이";

interface BottomTabBarProps {
  /** 현재 활성화된 탭 */
  activeTab: TabType;
  /** 탭 변경 핸들러 */
  onTabChange: (tab: TabType) => void;
}

interface TabItemData {
  id: TabType;
  label: string;
  Icon: ComponentType;
}

const TAB_ITEMS: TabItemData[] = [
  { id: "홈", label: "홈", Icon: IcHome },
  { id: "방명록", label: "방명록", Icon: IcFolder },
  { id: "마이", label: "마이", Icon: IcPerson },
];

const BottomTabBar = ({ activeTab, onTabChange }: BottomTabBarProps) => {
  return (
    <S.Wrapper role="navigation" aria-label="하단 탭 바">
      <S.TabList>
        {TAB_ITEMS.map(({ id, label, Icon }) => (
          <S.TabButton
            key={id}
            type="button"
            $isActive={activeTab === id}
            onClick={() => onTabChange(id)}
            aria-label={label}
            aria-current={activeTab === id ? "page" : undefined}
          >
            <Icon />
            <S.TabLabel>{label}</S.TabLabel>
          </S.TabButton>
        ))}
      </S.TabList>
    </S.Wrapper>
  );
};

export default BottomTabBar;
