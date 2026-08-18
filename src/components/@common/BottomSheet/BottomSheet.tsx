import { type ReactNode, useEffect, useRef } from "react";
import { CONSTRAINTS } from "@/constants/constraints";
import useDisclosure from "@/hooks/@common/useDisclosure";
import useDragToClose from "@/hooks/@common/useDragToClose";
import { Backdrop } from "@/styles/@common/Overlay/Backdrop.styles";
import * as S from "./BottomSheet.styles";
import { BottomSheetCloseContext } from "./BottomSheetCloseContext";

interface BottomSheetProps {
  /** 바텀시트 열림 여부. true일 때 마운트되어야 합니다 (`{isOpen && <BottomSheet />}` 패턴 사용). */
  isOpen: boolean;
  /** 닫힘 애니메이션이 끝난 후 호출되는 콜백. 부모에서 isOpen을 false로 전환해 언마운트합니다. */
  onClose: () => void;
  /** 스크롤 영역(콘텐츠)의 최대 높이. 기본값은 `50dvh`이며, 목록이 길어 화면 대부분을 채워야 하는 경우 늘려서 사용합니다. */
  maxContentHeight?: string;
  /** 바텀시트 내부에 렌더링할 콘텐츠 */
  children: ReactNode;
}

const BottomSheet = ({
  isOpen,
  onClose,
  maxContentHeight,
  children,
}: BottomSheetProps) => {
  const { isVisible, hideSheet, alertAnimationEnd } = useDisclosure({
    isOpen,
    onClose,
  });

  const sheetRef = useRef<HTMLDivElement | null>(null);

  const {
    dismiss,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handlePointerCancel,
  } = useDragToClose({
    elementRef: sheetRef,
    onDismiss: hideSheet,
    threshold: CONSTRAINTS.BOTTOM_SHEET_CLOSE_THRESHOLD,
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {isVisible && <Backdrop onClick={dismiss} />}
      <S.Wrapper
        ref={sheetRef}
        $isVisible={isVisible}
        onTransitionEnd={alertAnimationEnd}
        role="dialog"
        aria-modal={true}
        aria-label="바텀시트"
      >
        <S.Container>
          <S.GrabAbleArea
            onPointerDown={handleMouseDown}
            onPointerMove={handleMouseMove}
            onPointerUp={handleMouseUp}
            onPointerCancel={handlePointerCancel}
          >
            <S.GrabBar />
          </S.GrabAbleArea>
          {/**스크롤이 발생하는 영역 */}
          <S.Content $maxHeight={maxContentHeight}>
            <BottomSheetCloseContext.Provider value={dismiss}>
              {children}
            </BottomSheetCloseContext.Provider>
          </S.Content>
        </S.Container>
      </S.Wrapper>
    </>
  );
};

export default BottomSheet;
