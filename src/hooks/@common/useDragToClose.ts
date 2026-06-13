import { useRef } from "react";

/**
 * 드래그로 요소를 닫는 인터랙션을 제공하는 훅.
 *
 * 드래그 중 요소에 transform을 직접 적용하며, 임계값을 초과하면 `onDismiss`를 호출합니다.
 * 임계값 미달 시 원래 위치로 복귀하고, pointercancel 발생 시에도 상태와 위치를 복구합니다.
 */

type DragDirection = "vertical" | "horizontal" | "left" | "right";

interface DirectionConfig {
  getMovePos: (e: React.PointerEvent) => number;
  startPosRef: React.RefObject<number>;
  toMoveTransform: (delta: number) => string;
  isBlockedMove: (delta: number) => boolean;
  getPrimaryDelta: (e: React.PointerEvent) => number;
  getSecondaryDelta: (e: React.PointerEvent) => number;
  meetsThreshold: (primary: number) => boolean;
  toDismissTransform: () => string;
  toResetTransform: string;
}

interface UseDragToCloseProps {
  /** 드래그 대상 요소의 ref */
  elementRef: React.RefObject<HTMLDivElement | null>;
  /** 드래그 임계값을 초과했을 때 호출되는 콜백 */
  onDismiss: () => void;
  /** 닫힘을 트리거하는 최소 드래그 거리 (px) */
  threshold: number;
  /** 드래그 방향. 기본값은 'vertical' */
  direction?: DragDirection;
}

const useDragToClose = ({
  elementRef,
  onDismiss,
  threshold,
  direction = "vertical",
}: UseDragToCloseProps) => {
  const startX = useRef(0);
  const startY = useRef(0);
  const isDragging = useRef(false);
  const lastPrimaryDelta = useRef(0);

  const configs = {
    // NOTE: 윗방향 드래그가 필요하다면 높이 측정 후 해당 높이 이상으로 움직이지 못하도록 변경 필요
    vertical: {
      getMovePos: (e: React.PointerEvent) => e.clientY,
      startPosRef: startY,
      toMoveTransform: (d: number) => `translateY(${d}px)`,
      isBlockedMove: (d: number) => d < 0,
      getPrimaryDelta: (e: React.PointerEvent) => startY.current - e.clientY,
      getSecondaryDelta: (e: React.PointerEvent) => startX.current - e.clientX,
      meetsThreshold: (p: number) => Math.abs(p) >= threshold && p < 0,
      toDismissTransform: () => "translateY(100%)",
      toResetTransform: "translateY(0)",
    },
    horizontal: {
      getMovePos: (e: React.PointerEvent) => e.clientX,
      startPosRef: startX,
      toMoveTransform: (d: number) => `translateX(${d}px)`,
      isBlockedMove: () => false,
      getPrimaryDelta: (e: React.PointerEvent) => startX.current - e.clientX,
      getSecondaryDelta: (e: React.PointerEvent) => startY.current - e.clientY,
      meetsThreshold: (p: number) => Math.abs(p) >= threshold,
      toDismissTransform: () =>
        `translateX(${lastPrimaryDelta.current > 0 ? -100 : 100}%)`,
      toResetTransform: "translateX(0)",
    },
    left: {
      getMovePos: (e: React.PointerEvent) => e.clientX,
      startPosRef: startX,
      toMoveTransform: (d: number) => `translateX(${d}px)`,
      isBlockedMove: (d: number) => d >= 0,
      getPrimaryDelta: (e: React.PointerEvent) => startX.current - e.clientX,
      getSecondaryDelta: (e: React.PointerEvent) => startY.current - e.clientY,
      meetsThreshold: (p: number) => p > 0 && Math.abs(p) >= threshold,
      toDismissTransform: () => "translateX(-100%)",
      toResetTransform: "translateX(0)",
    },
    right: {
      getMovePos: (e: React.PointerEvent) => e.clientX,
      startPosRef: startX,
      toMoveTransform: (d: number) => `translateX(${d}px)`,
      isBlockedMove: (d: number) => d <= 0,
      getPrimaryDelta: (e: React.PointerEvent) => startX.current - e.clientX,
      getSecondaryDelta: (e: React.PointerEvent) => startY.current - e.clientY,
      meetsThreshold: (p: number) => p < 0 && Math.abs(p) >= threshold,
      toDismissTransform: () => "translateX(100%)",
      toResetTransform: "translateX(0)",
    },
  } satisfies Record<DragDirection, DirectionConfig>;

  const config = configs[direction];

  const dismiss = () => {
    if (!elementRef.current) return;

    elementRef.current.style.transition = "transform 0.2s ease";
    elementRef.current.style.transform = config.toDismissTransform();

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

    const delta = config.getMovePos(e) - config.startPosRef.current;
    if (config.isBlockedMove(delta)) return;

    elementRef.current.style.animation = "none";
    elementRef.current.style.transform = config.toMoveTransform(delta);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMouseUp = (e: React.PointerEvent) => {
    if (!elementRef.current) return;
    if (!isDragging.current) return;

    isDragging.current = false;

    const primaryDelta = config.getPrimaryDelta(e);
    const secondaryDelta = config.getSecondaryDelta(e);
    // NOTE: 주축이 아닌 방향으로 움직인 거리가 더 큰 경우 드래그가 동작하지 않음
    if (Math.abs(secondaryDelta) > Math.abs(primaryDelta)) return;

    if (config.meetsThreshold(primaryDelta)) {
      lastPrimaryDelta.current = primaryDelta;
      dismiss();
    } else {
      elementRef.current.style.transform = config.toResetTransform;
    }
  };

  const handlePointerCancel = () => {
    isDragging.current = false;
    if (elementRef.current) {
      elementRef.current.style.transform = config.toResetTransform;
    }
  };

  return {
    dismiss,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handlePointerCancel,
  };
};

export default useDragToClose;
