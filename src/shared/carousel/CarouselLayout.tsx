import { Children, type ReactNode, useRef, useState } from "react";
import * as S from "./CarouselLayout.styles";

interface CarouselLayoutProps {
  /** 슬라이드로 표시할 페이지 컴포넌트들 */
  children: ReactNode;
  /** 하단 고정 영역 (선택) */
  footer?: ReactNode;
}

const SWIPE_THRESHOLD = 50;

const CarouselLayout = ({ children, footer }: CarouselLayoutProps) => {
  const slides = Children.toArray(children);
  const [currentIndex, setCurrentIndex] = useState(0);
  const pointerStartX = useRef<number>(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const delta = pointerStartX.current - e.clientX;
    if (delta > SWIPE_THRESHOLD && currentIndex < slides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (delta < -SWIPE_THRESHOLD && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <S.Container>
      <S.DotsWrapper role="tablist" aria-label="슬라이드 인디케이터">
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
      <S.Viewport
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <S.Track currentIndex={currentIndex}>
          {slides.map((slide, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: positional carousel slide
            <S.Slide key={index}>{slide}</S.Slide>
          ))}
        </S.Track>
      </S.Viewport>
      {footer && <S.Footer>{footer}</S.Footer>}
    </S.Container>
  );
};

export default CarouselLayout;
