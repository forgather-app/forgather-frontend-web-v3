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
  const effectiveSidePeekRatio =
    swiperElement.length > 1 ? sidePeekRatio : undefined;

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
  const [trackHeight, setTrackHeight] = useState<number>();

  // NOTE: peek 모드의 카드 사이 간격은 항상 CARD_GAP으로 고정된 값이라 상태로 들고 있을 필요가 없다.
  // (이전엔 컨테이너/카드 폭 나눗셈을 역산해 gap을 구했는데, 부동소수점 오차로 0이 아닌 값이 매번 미세하게 달라져
  // ResizeObserver → 높이 변경 → 재측정 → setState가 무한 반복되는 버그가 있었다)
  const controlledGap = effectiveSidePeekRatio ? CARD_GAP : 0;

  // NOTE: 정수로 반올림해야 매 렌더 동일한 입력에 대해 항상 동일한 값이 나온다.
  // (부동소수점 나눗셈 결과를 그대로 쓰면 아주 미세하게 다른 값이 나올 수 있고,
  // 이 값이 카드 너비 → 텍스트 줄바꿈 → 카드 높이 측정으로 이어져 무한 렌더 루프를 유발할 수 있다)
  const controlledSlideWidth = effectiveSidePeekRatio
    ? Math.round(
        (containerWidth - 2 * controlledGap) / (1 + 2 * effectiveSidePeekRatio),
      )
    : containerWidth;

  // 다음 슬라이드가 실제로 있을 때만(마지막 슬라이드가 아닐 때만) peek 여백을 예약한다
  const getContainerMaxWidth = (index: number) => {
    const hasNextSlide = index < swiperElement.length - 1;
    return swiperElement.length > 1 && hasNextSlide
      ? elementWidthRef.current + CARD_GAP + PEEK_WIDTH
      : elementWidthRef.current;
  };

  const calculateLocation = (index: number) => {
    if (isControlled) {
      const slice = effectiveSidePeekRatio
        ? elementWidthRef.current * effectiveSidePeekRatio
        : 0;
      const start = controlledGap + slice;
      const move = elementWidthRef.current + controlledGap;

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
        // NOTE: sidePeekRatio가 없으면 슬라이드가 컨테이너 전체 폭을 차지하는 풀블리드 레이아웃(element 너비 = container 너비)이고,
        // 있으면 [slice][gap][element][gap][slice] = container 너비가 되도록 element 너비를 역산한다
        elementWidthRef.current = effectiveSidePeekRatio
          ? Math.round(
              (width - 2 * controlledGap) / (1 + 2 * effectiveSidePeekRatio),
            )
          : width;
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
  // 슬라이드가 바뀌거나 컨테이너 폭이 바뀔 때만 현재 보이는 슬라이드의 실제 높이로 다시 맞춥니다.
  // NOTE: deps 없이 매 커밋마다 재측정하면, Slide에 height:100%가 걸려 있어 방금 set한
  // trackHeight를 그대로 되읽는 자기 자신 참조 루프가 되어 "Maximum update depth exceeded"가 난다.
  // biome-ignore lint/correctness/useExhaustiveDependencies: swiperElement/activeIndex는 currentIndex로 이미 반영됨
  useLayoutEffect(() => {
    if (!isControlled) return;
    const activeSlide = trackRef.current?.children[currentIndex];
    if (activeSlide instanceof HTMLElement) {
      const height = activeSlide.scrollHeight;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTrackHeight((prev) => (prev === height ? prev : height));
    }
  }, [isControlled, currentIndex, containerWidth]);

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

    // 웹뷰(RN WebView)의 자체 제스처(엣지 스와이프백 등)가 포인터를 가로채도
    // move/up이 끊기지 않도록 드래그 시작 시점에 포인터를 캡처한다
    e.currentTarget.setPointerCapture(e.pointerId);

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

  // pointercancel(웹뷰 제스처에 의한 포인터 탈취)도 leave와 동일하게 드래그를 취소하고 스냅백한다
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
      onPointerCancel={handlePointerLeave}
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
            ? { x, gap: controlledGap, height: trackHeight }
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
                ? { width: controlledSlideWidth || "100%" }
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
