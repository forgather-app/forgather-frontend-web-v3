import IcSmallLogo from "@/assets/icons/logos/logo_small.svg?react";
import * as S from "./GuestCardStack.styles";

interface GuestCardStackProps {
  /** 새 방명록 스택 클릭 핸들러 */
  onClick?: () => void;
}

const GuestCardStack = ({ onClick }: GuestCardStackProps) => {
  return (
    <S.Scene
      type="button"
      onClick={onClick}
      aria-label="새로 도착한 방명록 — 클릭하여 열기"
    >
      <S.BackCard aria-hidden />
      <S.MidCard aria-hidden />
      <S.FrontCard>
        <S.LogoWrapper aria-hidden>
          <IcSmallLogo width={64} height={64} />
        </S.LogoWrapper>
        <S.Label aria-hidden>새로 도착한 방명록</S.Label>
      </S.FrontCard>
    </S.Scene>
  );
};

export default GuestCardStack;
