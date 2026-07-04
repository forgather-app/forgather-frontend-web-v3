import { useRef, useState } from "react";
import CurrentSpaceCard from "@/components/@common/CurrentSpaceCard/CurrentSpaceCard";
import * as S from "./CurrentSpaceSection.styles";

interface CurrentSpace {
  /** 스페이스 ID */
  id: number;
  /** 스페이스 이름 */
  spaceName: string;
  /** 썸네일 이미지 URL */
  thumbnailUrl?: string;
  /** 연결된 전시 정보 */
  linkedExhibition?: {
    name: string;
    url: string;
    period: { startDate: Date; endDate: Date };
    location: string;
  };
}

interface CurrentSpaceSectionProps {
  /** 진행 중인 스페이스 목록 */
  spaces: CurrentSpace[];
  /** 방명록 버튼 클릭 핸들러 */
  onGuestBookClick?: (spaceId: number) => void;
  /** 작품 관리 버튼 클릭 핸들러 */
  onArtworkManageClick?: (spaceId: number) => void;
  /** 전시 관리 버튼 클릭 핸들러 */
  onExhibitionManageClick?: (spaceId: number) => void;
}

const SWIPE_THRESHOLD = 50;

const CurrentSpaceSection = ({
  spaces,
  onGuestBookClick,
  onArtworkManageClick,
  onExhibitionManageClick,
}: CurrentSpaceSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pointerStartX = useRef<number>(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const delta = pointerStartX.current - e.clientX;
    if (delta > SWIPE_THRESHOLD && currentIndex < spaces.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (delta < -SWIPE_THRESHOLD && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <S.Section>
      <S.Title>지금 진행 중인 스페이스</S.Title>

      <S.CarouselWrapper
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <S.Track currentIndex={currentIndex}>
          {spaces.map((space) => (
            <S.Slide key={space.id}>
              {space.linkedExhibition ? (
                <CurrentSpaceCard
                  spaceName={space.spaceName}
                  thumbnailUrl={space.thumbnailUrl}
                  linkedExhibition={space.linkedExhibition}
                  onGuestBookClick={() => onGuestBookClick?.(space.id)}
                  onArtworkManageClick={() => onArtworkManageClick?.(space.id)}
                  onExhibitionManageClick={() =>
                    onExhibitionManageClick?.(space.id)
                  }
                />
              ) : (
                <CurrentSpaceCard
                  spaceName={space.spaceName}
                  thumbnailUrl={space.thumbnailUrl}
                  onGuestBookClick={() => onGuestBookClick?.(space.id)}
                  onArtworkManageClick={() => onArtworkManageClick?.(space.id)}
                />
              )}
            </S.Slide>
          ))}
        </S.Track>
      </S.CarouselWrapper>

      {spaces.length > 1 && (
        <S.DotsWrapper role="tablist" aria-label="슬라이드 인디케이터">
          {spaces.map((_, index) => (
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
      )}
    </S.Section>
  );
};

export default CurrentSpaceSection;
