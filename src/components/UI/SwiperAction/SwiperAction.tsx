import { animate, type Transition, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { VisuallyHidden } from "@/styles/@common/VisuallyHidden/VisuallyHidden.styles";
import * as S from "./SwiperAction.styles";

interface SwiperActionProps {
  /** 슬라이드로 전달되는 요소 리스트 */
  swiperElement: React.ReactNode[];
}

const springPreset: Transition = {
  type: "spring",
  stiffness: 450,
  damping: 32,
  mass: 0.3,
};

const MIN_THRESHOLD = 5;
const THRESHOLD_RATIO = 0.2;

const SwiperAction = ({ swiperElement }: SwiperActionProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const elementWidthRef = useRef(0);

  const startX = useRef(0);
  const startY = useRef(0);
  const threshold = useRef(0);
  const isDragging = useRef(false);
  const shouldPreventClick = useRef(false);

  const x = useMotionValue(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerMaxWidth, setContainerMaxWidth] = useState<number>();

  const calculateLocation = (index: number) => {
    const step = elementWidthRef.current + S.CARD_GAP;
    return Math.floor(-step * index);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: 첫 마운트시에만 계산
  useEffect(() => {
    const updateLayout = () => {
      elementWidthRef.current = trackRef.current?.children[0]?.clientWidth ?? 0;
      threshold.current = Math.floor(elementWidthRef.current * THRESHOLD_RATIO);
      setContainerMaxWidth(elementWidthRef.current + S.CARD_GAP + S.PEEK_WIDTH);
      x.set(calculateLocation(0));
    };
    updateLayout();

    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const updateLocation = (index: number) => {
    animate(x, calculateLocation(index), springPreset);
  };

  const snapToIndex = (diffX: number) => {
    const ableToMoveLeft = diffX >= threshold.current;
    const ableToMoveRight = diffX <= -threshold.current;

    if (ableToMoveLeft && currentIndex < swiperElement.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      animate(x, calculateLocation(nextIndex), springPreset);
      return;
    }
    if (ableToMoveRight && currentIndex > 0) {
      const nextIndex = currentIndex - 1;
      setCurrentIndex(nextIndex);
      animate(x, calculateLocation(nextIndex), springPreset);
      return;
    }
    animate(x, calculateLocation(currentIndex), springPreset);
  };

  const moveToRight = () => {
    const next = currentIndex + 1;
    if (next >= swiperElement.length) return;
    setCurrentIndex(next);
    updateLocation(next);
  };

  const moveToLeft = () => {
    const prev = currentIndex - 1;
    if (prev < 0) return;
    setCurrentIndex(prev);
    updateLocation(prev);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (swiperElement.length === 0) return;

    isDragging.current = true;
    startX.current = e.clientX;
    startY.current = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    if (swiperElement.length === 0) return;
    if (!trackRef.current) return;

    const diffX = startX.current - e.clientX;
    const diffY = startY.current - e.clientY;
    if (Math.abs(diffY) > Math.abs(diffX)) {
      isDragging.current = false;
      return;
    }
    if (Math.abs(diffX) > MIN_THRESHOLD) {
      shouldPreventClick.current = true;
    }
    x.set(calculateLocation(currentIndex) - diffX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (swiperElement.length === 0) return;

    isDragging.current = false;

    const diffX = startX.current - e.clientX;
    const diffY = startY.current - e.clientY;

    // 이동 거리가 MIN_THRESHOLD 이하라면 브라우저의 click 이벤트로 처리
    const isClickEvent = Math.abs(diffX) < MIN_THRESHOLD;
    if (isClickEvent) {
      shouldPreventClick.current = false;
      return;
    }
    if (Math.abs(diffY) > Math.abs(diffX)) {
      shouldPreventClick.current = false;
      return;
    }

    snapToIndex(diffX);
  };

  const handlePointerLeave = () => {
    isDragging.current = false;
    animate(x, calculateLocation(currentIndex), springPreset);
  };

  return (
    <S.Container
      style={containerMaxWidth ? { maxWidth: containerMaxWidth } : undefined}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {currentIndex !== 0 && (
        <VisuallyHidden
          tabIndex={0}
          aria-label="이전으로 이동"
          aria-hidden={currentIndex === 0}
          onClick={moveToLeft}
        />
      )}
      <S.Track ref={trackRef} style={{ x }}>
        {swiperElement.map((element, index) => (
          <S.Slide
            // biome-ignore lint/suspicious/noArrayIndexKey: 현재로썬 index만 사용 가능함
            key={index}
            onClickCapture={(e) => {
              if (shouldPreventClick.current) {
                e.stopPropagation();
                return;
              }
            }}
            aria-hidden={currentIndex !== index}
          >
            {element}
          </S.Slide>
        ))}
      </S.Track>
      {currentIndex !== swiperElement.length - 1 && (
        <VisuallyHidden
          tabIndex={0}
          aria-label="다음으로 이동"
          aria-hidden={currentIndex === swiperElement.length - 1}
          onClick={moveToRight}
        />
      )}
    </S.Container>
  );
};

export default SwiperAction;
