import type { ReactNode } from "react";
import Button from "@/components/@common/Button/Button";
import GuestHeader from "@/components/@common/GuestHeader/GuestHeader";
import TabMenu from "@/components/@common/TabMenu/TabMenu";
import { GUEST_BOOK_PERIOD_MESSAGE } from "@/utils/guestBookWritingPolicy";
import * as S from "./GuestSpaceLayout.styles";

interface GuestSpaceLayoutProps {
  /** 작품/방명록 탭 콘텐츠 (라우트 Outlet) */
  children: ReactNode;
  isWritable?: boolean;
  /** 현재 활성 탭 */
  activeTab: "left" | "right";
  /** 작품 탭 클릭 핸들러 */
  onArtworkTabClick: () => void;
  /** 방명록 탭 클릭 핸들러 */
  onGuestBookTabClick: () => void;
  /** "방명록 작성하기" 버튼 클릭 핸들러 */
  onWriteClick: () => void;
}

const GuestSpaceLayout = ({
  children,
  isWritable = true,
  activeTab,
  onArtworkTabClick,
  onGuestBookTabClick,
  onWriteClick,
}: GuestSpaceLayoutProps) => {
  return (
    <S.Root>
      <GuestHeader />
      <S.TabWrapper>
        <TabMenu
          variant="box"
          activeTab={activeTab}
          left={{ text: "작품", onClick: onArtworkTabClick }}
          right={{ text: "방명록", onClick: onGuestBookTabClick }}
        />
      </S.TabWrapper>
      <S.ContentArea>{children}</S.ContentArea>
      <S.WriteCtaWrapper>
        <Button
          text={isWritable ? "방명록 작성하기" : GUEST_BOOK_PERIOD_MESSAGE}
          disabled={!isWritable}
          onClick={onWriteClick}
          variant="tertiary"
        />
      </S.WriteCtaWrapper>
    </S.Root>
  );
};

export default GuestSpaceLayout;
