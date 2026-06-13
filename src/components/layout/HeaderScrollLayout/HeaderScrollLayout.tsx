import type { ReactNode } from "react";
import { useCallback, useRef, useState } from "react";
import * as S from "@/components/layout/HeaderScrollLayout/HeaderScrollLayout.styles";
import { CONSTRAINTS } from "@/constants/constraints";

interface HeaderScrollLayoutProps {
  /** 상단에 sticky로 붙는 헤더 영역 */
  header: ReactNode;
  /** 스크롤되는 본문 영역 */
  children: ReactNode;
}

const HeaderScrollLayout = ({ header, children }: HeaderScrollLayoutProps) => {
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const currentY = e.currentTarget.scrollTop;

    if (
      // NOTE: 아래로 내릴 때, 10px (threshold) 이상이면 올려주기
      currentY > lastScrollY.current &&
      currentY > CONSTRAINTS.HEADER_HIDE_SCROLL_THRESHOLD
    ) {
      setIsHeaderHidden(true);
      // NOTE: 위로만 올리면 즉시 헤더 보여주기
    } else if (currentY < lastScrollY.current) {
      setIsHeaderHidden(false);
    }

    lastScrollY.current = currentY;
  }, []);

  return (
    <S.ScrollWrapper onScroll={handleScroll}>
      <S.Header $isHidden={isHeaderHidden}>{header}</S.Header>
      {children}
    </S.ScrollWrapper>
  );
};

export default HeaderScrollLayout;
