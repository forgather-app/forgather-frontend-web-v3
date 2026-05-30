import type { ReactNode } from "react";
import NavigationBar, {
  type NavigationBarProps,
} from "@/components/@common/navigationBar/NavigationBar";
import HeaderScrollLayout from "../HeaderScrollLayout/HeaderScrollLayout";

interface NavigationBarLayoutProps extends NavigationBarProps {
  /** 스크롤되는 본문 영역 */
  children: ReactNode;
}

const NavigationBarLayout = ({
  children,
  title,
  onBackClick,
  rightIcon,
  rightIconAriaLabel,
  onRightIconClick,
}: NavigationBarLayoutProps) => {
  return (
    <HeaderScrollLayout
      header={
        <NavigationBar
          title={title}
          onBackClick={onBackClick}
          rightIcon={rightIcon}
          rightIconAriaLabel={rightIconAriaLabel}
          onRightIconClick={onRightIconClick}
        />
      }
    >
      {children}
    </HeaderScrollLayout>
  );
};

export default NavigationBarLayout;
