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
      <IcSmallLogo width={40} height={40} aria-hidden />
      <S.Label aria-hidden>새로 도착한 방명록</S.Label>
    </S.Container>
  );
};

export default GuestListStack;
