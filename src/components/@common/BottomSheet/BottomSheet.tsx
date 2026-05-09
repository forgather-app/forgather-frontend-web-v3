import { type ReactNode, useEffect, useRef } from "react";
import { CONSTRAINTS } from "../../../constants/constraints";
import useDisclosure from "../../../hooks/@common/useDisclosure";
import { Backdrop } from "../../../styles/@common/Overlay/Backdrop.styles";
import * as S from "./BottomSheet.styles";

interface BottomSheetProps {
  /** 바텀시트 열림 여부. true일 때 마운트되어야 합니다 (`{isOpen && <BottomSheet />}` 패턴 사용). */
  isOpen: boolean;
  /** 닫힘 애니메이션이 끝난 후 호출되는 콜백. 부모에서 isOpen을 false로 전환해 언마운트합니다. */
  onClose: () => void;
  /** 바텀시트 내부에 렌더링할 콘텐츠 */
  children: ReactNode;
}

const BottomSheet = ({ isOpen, onClose, children }: BottomSheetProps) => {
  const { isVisible, hideSheet, alertAnimationEnd } = useDisclosure({
    isOpen,
    onClose,
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

  const startX = useRef(0);
  const startY = useRef(0);
  const sheetRef = useRef<HTMLDivElement | null>(null);

  const isDragging = useRef(false);

  const closeBottomSheet = () => {
    if (!sheetRef.current) return;

    sheetRef.current.style.transition = "transform 0.2s ease";
    sheetRef.current.style.transform = "translateY(100%)";

    hideSheet();
  };

  const handleMouseDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startY.current = e.clientY;

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleMouseMove = (e: React.PointerEvent) => {
    if (!sheetRef.current) return;
    if (!isDragging.current) return;

    const currentY = e.clientY;
    const deltaY = currentY - startY.current;
    // NOTE: 윗방향으로는 드래그 불가
    // 추후 윗방향 드래그가  필요하다면, 높이 측정 후 해당 높이 이상으로 움직이지 못하도록 변경해야 함
    if (deltaY < 0) return;

    sheetRef.current.style.animation = "none";
    sheetRef.current.style.transform = `translateY(${deltaY}px)`;
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMouseUp = (e: React.PointerEvent) => {
    if (!sheetRef.current) return;
    if (!isDragging.current) return;

    isDragging.current = false;

    const deltaX = startX.current - e.clientX;
    const deltaY = startY.current - e.clientY;
    // NOTE: x 방향으로 움직인 거리가 더 큰 경우 드래그가 동작하지 않음
    if (Math.abs(deltaX) > Math.abs(deltaY)) return;

    if (
      Math.abs(deltaY) >= CONSTRAINTS.BOTTOM_SHEET_CLOSE_THRESHOLD &&
      deltaY < 0
    ) {
      closeBottomSheet();
    } else {
      sheetRef.current.style.transform = "translateY(0)";
    }
  };

  const handlePointerCancel = () => {
    isDragging.current = false;
    if (sheetRef.current) {
      sheetRef.current.style.transform = "translateY(0)";
    }
  };

  return (
    <>
      {isVisible && <Backdrop onClick={closeBottomSheet} />}
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
          <S.Content>{children}</S.Content>
        </S.Container>
      </S.Wrapper>
    </>
  );
};

export default BottomSheet;
