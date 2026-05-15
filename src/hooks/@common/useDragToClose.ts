import { useRef } from "react";

/**
 * 아래 방향 드래그로 요소를 닫는 인터랙션을 제공하는 훅.
 *
 * 드래그 중 요소에 transform을 직접 적용하며, 임계값을 초과하면 `onDismiss`를 호출합니다.
 * 임계값 미달 시 원래 위치로 복귀하고, pointercancel 발생 시에도 상태와 위치를 복구합니다.
 */
interface UseDragToCloseProps {
  /** 드래그 대상 요소의 ref */
  elementRef: React.RefObject<HTMLDivElement | null>;
  /** 드래그 임계값을 초과했을 때 호출되는 콜백 */
  onDismiss: () => void;
  /** 닫힘을 트리거하는 최소 드래그 거리 (px) */
  threshold: number;
}

const useDragToClose = ({ elementRef, onDismiss, threshold }: UseDragToCloseProps) => {
  const startX = useRef(0);
  const startY = useRef(0);
  const isDragging = useRef(false);

  const dismiss = () => {
    if (!elementRef.current) return;

    elementRef.current.style.transition = "transform 0.2s ease";
    elementRef.current.style.transform = "translateY(100%)";

    onDismiss();
  };

  const handleMouseDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startY.current = e.clientY;

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleMouseMove = (e: React.PointerEvent) => {
    if (!elementRef.current) return;
    if (!isDragging.current) return;

    const currentY = e.clientY;
    const deltaY = currentY - startY.current;
    // NOTE: 윗방향으로는 드래그 불가
    // 추후 윗방향 드래그가  필요하다면, 높이 측정 후 해당 높이 이상으로 움직이지 못하도록 변경해야 함
    if (deltaY < 0) return;

    elementRef.current.style.animation = "none";
    elementRef.current.style.transform = `translateY(${deltaY}px)`;
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMouseUp = (e: React.PointerEvent) => {
    if (!elementRef.current) return;
    if (!isDragging.current) return;

    isDragging.current = false;

    const deltaX = startX.current - e.clientX;
    const deltaY = startY.current - e.clientY;
    // NOTE: x 방향으로 움직인 거리가 더 큰 경우 드래그가 동작하지 않음
    if (Math.abs(deltaX) > Math.abs(deltaY)) return;

    if (Math.abs(deltaY) >= threshold && deltaY < 0) {
      dismiss();
    } else {
      elementRef.current.style.transform = "translateY(0)";
    }
  };

  const handlePointerCancel = () => {
    isDragging.current = false;
    if (elementRef.current) {
      elementRef.current.style.transform = "translateY(0)";
    }
  };

  return { dismiss, handleMouseDown, handleMouseMove, handleMouseUp, handlePointerCancel };
};

export default useDragToClose;
