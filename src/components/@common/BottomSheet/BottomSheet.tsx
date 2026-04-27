import { type ReactNode, useEffect, useRef } from "react";
import { CONSTRAINTS } from "../../../constants/constraints";
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
  const contentRef = useRef<HTMLDivElement | null>(null);

  const isDragging = useRef(false);

  const closeBottomSheet = () => {
    if (!sheetRef.current) return;

    sheetRef.current.style.transition = "transform 0.2s ease";
    sheetRef.current.style.transform = "translateY(100%)";

    toggleIsVisible();
  };

  const handleMouseDown = (e: React.PointerEvent) => {
    if (contentRef.current && contentRef.current.scrollTop > 0) return;

    isDragging.current = true;
    startX.current = e.clientX;
    startY.current = e.clientY;

    // NOTE: 클릭된 요소가 버튼이나 input 등 상호작용 요소라면 드래그 무시
    const target = e.target as HTMLElement;
    if (target.closest("button, input, textarea")) return;

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleMouseMove = (e: React.PointerEvent) => {
    if (!sheetRef.current) return;
    if (!contentRef.current) return;
    if (!isDragging.current) return;

    const currentY = e.clientY;
    const deltaY = currentY - startY.current;
    if (deltaY <= 0 || contentRef.current.scrollTop > 0) return;
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
    if (!contentRef.current) return;

    isDragging.current = false;

    const deltaX = startX.current - e.clientX;
    const deltaY = startY.current - e.clientY;
    // NOTE: x 방향으로 움직인 거리가 더 큰 경우 드래그가 동작하지 않음
    if (Math.abs(deltaX) > Math.abs(deltaY)) return;

    if (
      Math.abs(deltaY) >= CONSTRAINTS.BOTTOM_SHEET_CLOSE_THRESHOLD &&
      deltaY < 0 &&
      contentRef.current.scrollTop <= 1
    ) {
      closeBottomSheet();
    } else {
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
        onPointerDown={handleMouseDown}
        onPointerMove={handleMouseMove}
        onPointerUp={handleMouseUp}
      >
        <S.Container ref={contentRef}>
          <S.GrabBar />
          {/**스크롤이 발생하는 영역 */}
          <S.Content>{children}</S.Content>
        </S.Container>
      </S.Wrapper>
    </>
  );
};

export default BottomSheet;
