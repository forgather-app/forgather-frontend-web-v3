import IcSmallLogo from "@/assets/icons/logos/logo_small.svg?react";
import * as S from "./GuestListStack.styles";

interface GuestListStackProps {
  /** 새 방명록 스택 클릭 핸들러 */
  onClick?: () => void;
}

const GuestListStack = ({ onClick }: GuestListStackProps) => {
  return (
    <S.Container
      type="button"
      onClick={onClick}
      aria-label="새로 도착한 방명록 — 클릭하여 열기"
    >
      <S.BackCard aria-hidden />
      <S.MidCard aria-hidden />
      <S.FrontCard>
        <S.Content>
          <IcSmallLogo width={24} height={24} aria-hidden />
          <S.Label>새로 도착한 방명록</S.Label>
        </S.Content>
      </S.FrontCard>
    </S.Container>
  );
};

export default GuestListStack;
