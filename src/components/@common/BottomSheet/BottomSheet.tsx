import type { ReactNode } from "react";
import useDisclosure from "../../../hooks/@common/useDisclosure";
import { Backdrop } from "../../../styles/@common/Overlay/Backdrop.styles";
import * as S from "./BottomSheet.styles";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const BottomSheet = ({ isOpen, onClose, children }: BottomSheetProps) => {
  const { isVisible, toggleIsVisible, alertAnimationEnd } = useDisclosure({
    isOpen,
    onClose,
  });

  return (
    <>
      {isVisible && <Backdrop onClick={toggleIsVisible} />}
      <S.Wrapper $isVisible={isVisible} onAnimationEnd={alertAnimationEnd}>
        <S.Container>
          <S.GrabBar />
          {children}
        </S.Container>
      </S.Wrapper>
    </>
  );
};

export default BottomSheet;
