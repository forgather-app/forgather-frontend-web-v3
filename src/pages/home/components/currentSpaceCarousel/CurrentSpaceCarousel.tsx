import { Children, type ReactNode, useRef, useState } from "react";
import * as S from "./CurrentSpaceCarousel.styles";

interface CurrentSpaceCarouselProps {
  /** 슬라이드로 표시할 카드들 (진행중 스페이스 카드 + 마지막 빈 슬롯) */
  children: ReactNode;
}

const SWIPE_THRESHOLD = 50;
/** click과 drag를 구분하는 최소 이동 거리(px) */
const MIN_THRESHOLD = 5;

const CurrentSpaceCarousel = ({ children }: CurrentSpaceCarouselProps) => {
  const slides = Children.toArray(children);
  const [currentIndex, setCurrentIndex] = useState(0);
  const pointerStartX = useRef(0);
  const isDragging = useRef(false);
  const shouldPreventClick = useRef(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
    isDragging.current = true;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;

    if (Math.abs(pointerStartX.current - e.clientX) > MIN_THRESHOLD) {
      shouldPreventClick.current = true;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const delta = pointerStartX.current - e.clientX;
    // 드래그로 인식되지 않은 거리(=탭)라면 뒤이어 발생할 클릭을 막지 않는다
    if (Math.abs(delta) < MIN_THRESHOLD) {
      shouldPreventClick.current = false;
      return;
    }

    if (delta > SWIPE_THRESHOLD && currentIndex < slides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (delta < -SWIPE_THRESHOLD && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <S.Container>
      <S.Viewport
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onClickCapture={(e) => {
          // 드래그(스와이프) 직후 발생하는 클릭이 카드/버튼에 전달되지 않도록 막는다
          if (shouldPreventClick.current) {
            e.stopPropagation();
          }
        }}
      >
        <S.Track currentIndex={currentIndex}>
          {slides.map((slide, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: positional carousel slide
            <S.Slide key={index}>{slide}</S.Slide>
          ))}
        </S.Track>
      </S.Viewport>
      <S.DotsWrapper role="tablist" aria-label="진행중 스페이스 인디케이터">
        {slides.map((_, index) => (
          <S.Dot
            // biome-ignore lint/suspicious/noArrayIndexKey: positional carousel indicator
            key={index}
            isActive={index === currentIndex}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`슬라이드 ${index + 1}`}
          />
        ))}
      </S.DotsWrapper>
    </S.Container>
  );
};

export default CurrentSpaceCarousel;
