import type { ReactNode } from "react";
import IcLeftArrow from "@/assets/icons/ic_left_arrow.svg?react";
import IcShare from "@/assets/icons/ic_share.svg?react";
import TabMenu from "@/components/@common/TabMenu/TabMenu";
import * as S from "./SpaceLayout.styles";

interface SpaceLayoutProps {
  /** 작품/방명록 탭 콘텐츠 (라우트 Outlet) */
  children: ReactNode;
  /** 현재 활성 탭 */
  activeTab: "left" | "right";
  /** 뒤로가기 핸들러 */
  onBack: () => void;
  /** 작품 탭 클릭 핸들러 */
  onArtworkTabClick: () => void;
  /** 방명록 탭 클릭 핸들러 */
  onGuestBookTabClick: () => void;
  /** 링크 공유 버튼 클릭 핸들러 */
  onShareClick: () => void;
}

const SpaceLayout = ({
  children,
  activeTab,
  onBack,
  onArtworkTabClick,
  onGuestBookTabClick,
  onShareClick,
}: SpaceLayoutProps) => {
  return (
    <>
      {children}
      <S.BottomBar>
        <S.FloatingIconButton
          type="button"
          aria-label="뒤로 가기"
          onClick={onBack}
        >
          <IcLeftArrow width={24} height={24} />
        </S.FloatingIconButton>
        <TabMenu
          variant="pill"
          activeTab={activeTab}
          left={{ text: "작품", onClick: onArtworkTabClick }}
          right={{ text: "방명록", onClick: onGuestBookTabClick }}
        />
        <S.FloatingIconButton
          type="button"
          aria-label="링크 공유"
          onClick={onShareClick}
        >
          <IcShare width={35.64} height={35.64} />
        </S.FloatingIconButton>
      </S.BottomBar>
    </>
  );
};

export default SpaceLayout;
