import { TAB_ITEMS, type TabType } from "./BottomTabBar.constants";
import * as S from "./BottomTabBar.styles";

interface BottomTabBarProps {
  /** 현재 활성화된 탭 */
  activeTab: TabType;
  /** 탭 변경 핸들러 */
  onTabChange: (tab: TabType) => void;
}

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
