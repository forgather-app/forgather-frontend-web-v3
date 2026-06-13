import type { ReactElement, ReactNode, SVGProps } from "react";
import NavigationBar from "@/components/@common/NavigationBar/NavigationBar";
import HeaderScrollLayout from "../HeaderScrollLayout/HeaderScrollLayout";

interface NavigationBarLayoutProps {
  /** 스크롤되는 본문 영역 */
  children: ReactNode;
  /** 중앙에 표시할 타이틀 텍스트 */
  title?: string;
  /** 뒤로가기 버튼 클릭 핸들러 */
  onBackClick?: () => void;
  /** 오른쪽 아이콘 (32×32 SVG 권장) */
  rightIcon?: ReactElement<SVGProps<SVGSVGElement>>;
  /** 오른쪽 아이콘 버튼의 접근성 레이블 */
  rightIconAriaLabel?: string;
  /** 오른쪽 아이콘 클릭 핸들러 */
  onRightIconClick?: () => void;
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
