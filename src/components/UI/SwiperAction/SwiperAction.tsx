import { animate, useMotionValue } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { VisuallyHidden } from "@/styles/@common/VisuallyHidden/VisuallyHidden.styles";
import {
  CARD_GAP,
  MIN_THRESHOLD,
  PEEK_WIDTH,
  SPRING_PRESET,
  THRESHOLD_RATIO,
} from "./SwiperAction.constants";
import * as S from "./SwiperAction.styles";

/** controlled 모드에서 스냅 임계값을 계산할 때 쓰는 나눗값 (threshold = (컨테이너 너비 - 좌우 패딩) / STANDARD) */
const STANDARD = 5;

interface SwiperActionProps {
  /** 슬라이드로 전달되는 요소 리스트 */
  swiperElement: React.ReactNode[];
  /** 슬라이드 양옆에 보이게 할 여유 공간 비율(요소 너비 대비). activeIndex와 함께 쓰는 controlled 모드에서만 적용됩니다 */
  sidePeekRatio?: number;
  /** 외부에서 현재 인덱스를 제어하고 싶을 때 전달 (예: 라우트 파라미터와 동기화) */
  activeIndex?: number;
  /** 드래그/스냅으로 인덱스가 바뀔 때마다 호출됩니다 */
  onIndexChange?: (index: number) => void;
  /** true이면 스와이프 인식 영역(hit area)이 부모 컨테이너의 전체 높이를 채웁니다. 콘텐츠가 그보다 길면 콘텐츠 높이에 맞춰 자연스럽게 늘어납니다 */
  fillHeight?: boolean;
}

const SwiperAction = ({
  swiperElement,
  sidePeekRatio,
  activeIndex,
  onIndexChange,
  fillHeight,
}: SwiperActionProps) => {
  const isControlled = activeIndex !== undefined;

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const elementWidthRef = useRef(0);
  const containerWidthRef = useRef(0);

  const startX = useRef(0);
  const startY = useRef(0);
  const threshold = useRef(0);
  const isDragging = useRef(false);
  const shouldPreventClick = useRef(false);

  const x = useMotionValue(0);

  const [currentIndex, setCurrentIndex] = useState(activeIndex ?? 0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerMaxWidth, setContainerMaxWidth] = useState<number>();
  const [styleGap, setStyleGap] = useState(0);
  const [trackHeight, setTrackHeight] = useState<number>();

  // 다음 슬라이드가 실제로 있을 때만(마지막 슬라이드가 아닐 때만) peek 여백을 예약한다
  const getContainerMaxWidth = (index: number) => {
    const hasNextSlide = index < swiperElement.length - 1;
    return swiperElement.length > 1 && hasNextSlide
      ? elementWidthRef.current + CARD_GAP + PEEK_WIDTH
      : elementWidthRef.current;
  };

  const calculateLocation = (index: number) => {
    if (isControlled) {
      const slice = sidePeekRatio ? elementWidthRef.current * sidePeekRatio : 0;
      const gap =
        (containerWidthRef.current - (elementWidthRef.current + slice * 2)) / 2;
      const start = gap + slice;

      setStyleGap(gap);

      const move = elementWidthRef.current + gap;

      return Math.floor(start - move * index);
    }

    const step = elementWidthRef.current + CARD_GAP;
    return Math.floor(-step * index);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: 컨테이너 크기 변화에만 반응하면 되고, activeIndex 변경은 아래 별도 effect에서 처리
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateLayout = (width: number) => {
      containerWidthRef.current = width;
      setContainerWidth(width);

      if (isControlled) {
        // NOTE: controlled 모드는 슬라이드가 컨테이너 전체 폭을 차지하는 풀블리드 레이아웃이라 element 너비 = container 너비
        elementWidthRef.current = width;
        const root = getComputedStyle(document.documentElement);
        const padding = Number(
          root.getPropertyValue("--layout-padding-x").replace("px", ""),
        );
        threshold.current = Math.floor((width - 2 * padding) / STANDARD);
      } else {
        elementWidthRef.current =
          trackRef.current?.children[0]?.clientWidth ?? 0;
        setContainerMaxWidth(getContainerMaxWidth(activeIndex ?? currentIndex));
        threshold.current = Math.floor(
          elementWidthRef.current * THRESHOLD_RATIO,
        );
      }

      x.set(calculateLocation(activeIndex ?? 0));
    };

    const observer = new ResizeObserver(([entry]) => {
      if (entry) updateLayout(entry.contentRect.width);
    });
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  // 슬라이드 이동으로 마지막 슬라이드에 도달/이탈하면 peek 여백 예약 여부가 바뀌어야 한다
  // biome-ignore lint/correctness/useExhaustiveDependencies: elementWidthRef 측정 전(0)에는 재계산할 필요가 없어 가드로 처리
  useEffect(() => {
    if (isControlled || elementWidthRef.current === 0) return;
    // NOTE: 이미 측정된 elementWidthRef를 currentIndex 변화에 맞춰 다시 조합하는 것뿐이라 DOM 재측정은 필요 없음
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setContainerMaxWidth(getContainerMaxWidth(currentIndex));
  }, [currentIndex, swiperElement.length]);

  // controlled 모드는 트랙에 모든 슬라이드를 한 줄로 렌더링하므로(드래그를 위해 필요),
  // 아무 처리도 하지 않으면 컨테이너 높이가 가장 높은 슬라이드에 맞춰집니다.
  // 현재 보이는 슬라이드의 실제 높이로만 맞추기 위해 매번 다시 측정합니다.
  useLayoutEffect(() => {
    if (!isControlled) return;
    const activeSlide = trackRef.current?.children[currentIndex];
    if (activeSlide instanceof HTMLElement) {
      // NOTE: DOM 레이아웃(scrollHeight)을 읽어야만 알 수 있는 값이라 렌더 중 계산이 불가능함
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTrackHeight(activeSlide.scrollHeight);
    }
  });

  // activeIndex(제어 모드)가 외부에서(예: 헤더의 이전/다음 버튼) 바뀌면 동일한 위치로 스냅합니다.
  // biome-ignore lint/correctness/useExhaustiveDependencies: currentIndex는 내부 변경 여부 비교용으로만 사용
  useEffect(() => {
    if (activeIndex === undefined || activeIndex === currentIndex) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentIndex(activeIndex);
    animate(x, calculateLocation(activeIndex), SPRING_PRESET);
  }, [activeIndex]);

  const changeIndex = (index: number) => {
    setCurrentIndex(index);
    onIndexChange?.(index);
  };

  const updateLocation = (index: number) => {
    animate(x, calculateLocation(index), SPRING_PRESET);
  };

  const snapToIndex = (diffX: number) => {
    const ableToMoveLeft = diffX >= threshold.current;
    const ableToMoveRight = diffX <= -threshold.current;

    if (ableToMoveLeft && currentIndex < swiperElement.length - 1) {
      const nextIndex = currentIndex + 1;
      changeIndex(nextIndex);
      animate(x, calculateLocation(nextIndex), SPRING_PRESET);
      return;
    }
    if (ableToMoveRight && currentIndex > 0) {
      const nextIndex = currentIndex - 1;
      changeIndex(nextIndex);
      animate(x, calculateLocation(nextIndex), SPRING_PRESET);
      return;
    }
    animate(x, calculateLocation(currentIndex), SPRING_PRESET);
  };

  const moveToRight = () => {
    const next = currentIndex + 1;
    if (next >= swiperElement.length) return;
    changeIndex(next);
    updateLocation(next);
  };

  const moveToLeft = () => {
    const prev = currentIndex - 1;
    if (prev < 0) return;
    changeIndex(prev);
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
    animate(x, calculateLocation(currentIndex), SPRING_PRESET);
  };

  return (
    <S.Container
      ref={containerRef}
      $fillHeight={fillHeight}
      style={
        !isControlled && containerMaxWidth
          ? { maxWidth: containerMaxWidth }
          : undefined
      }
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {currentIndex !== 0 && (
        <VisuallyHidden
          type="button"
          tabIndex={0}
          aria-label="이전으로 이동"
          onClick={moveToLeft}
        />
      )}
      <S.Track
        ref={trackRef}
        style={
          isControlled
            ? { x, gap: styleGap, height: trackHeight }
            : // NOTE: 슬라이드가 1개면 peek이 필요 없으므로 Track/Slide도 Container(100%)를 그대로 채운다.
              // Card의 width: 100%가 실제로 퍼센트 기준을 가지려면 이 체인 전체가 확정 폭을 가져야 한다.
              { x, width: swiperElement.length === 1 ? "100%" : undefined }
        }
      >
        {swiperElement.map((element, index) => (
          <S.Slide
            // biome-ignore lint/suspicious/noArrayIndexKey: 현재로썬 index만 사용 가능함
            key={index}
            style={
              isControlled
                ? { width: containerWidth || "100%" }
                : swiperElement.length === 1
                  ? { width: "100%" }
                  : undefined
            }
            onClickCapture={(e) => {
              if (shouldPreventClick.current) {
                e.stopPropagation();
                return;
              }
            }}
            aria-hidden={currentIndex !== index}
            inert={currentIndex !== index}
          >
            {element}
          </S.Slide>
        ))}
      </S.Track>
      {currentIndex !== swiperElement.length - 1 && (
        <VisuallyHidden
          type="button"
          tabIndex={0}
          aria-label="다음으로 이동"
          onClick={moveToRight}
        />
      )}
    </S.Container>
  );
};

export default SwiperAction;
