import { useState } from "react";
import IcClose from "@/assets/icons/ic_close.svg?react";
import IcDownload from "@/assets/icons/ic_download.svg?react";
import ImagePlaceholderGraphic from "@/assets/images/artwork_card_placeholder.svg?react";
import Button from "@/components/@common/Button/Button";
import Modal from "@/components/UI/Modal/Modal";
import SwiperAction from "@/components/UI/SwiperAction/SwiperAction";
import * as S from "./ImageLightbox.styles";

interface LightboxSlideProps {
  src: string;
  index: number;
}

const LightboxSlide = ({ src, index }: LightboxSlideProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <S.ImageSquare>
      {imageError ? (
        <S.PlaceholderWrapper aria-hidden>
          <ImagePlaceholderGraphic />
        </S.PlaceholderWrapper>
      ) : (
        <S.SlideImage
          src={src}
          alt={`첨부 이미지 ${index + 1}`}
          onError={() => setImageError(true)}
        />
      )}
      <S.DownloadButtonWrapper>
        {/* TODO: 다운로드 기능 연동 필요 (이번 스코프 아님) */}
        <Button
          variant="icon"
          icon={<IcDownload aria-hidden="true" />}
          aria-label="이미지 다운로드"
        />
      </S.DownloadButtonWrapper>
    </S.ImageSquare>
  );
};

interface ImageLightboxProps {
  /** 라이트박스 열림 여부 */
  isOpen: boolean;
  /** 닫기(X) 버튼 클릭 시 호출되는 콜백 */
  onClose: () => void;
  /** 전체보기할 이미지 URL 목록 */
  images: string[];
}

const ImageLightbox = ({ isOpen, onClose, images }: ImageLightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Root는 모바일 뷰포트에서 화면 전체를 덮어 Modal.Overlay(Backdrop)까지 클릭이 닿지 않으므로,
  // 이미지 주변 여백을 직접 클릭했을 때만(자식 요소 클릭은 제외) 닫히도록 처리합니다.
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Overlay />
      <S.Root role="dialog" aria-modal="true" aria-label="이미지 전체보기">
        <S.CloseButton type="button" onClick={onClose} aria-label="닫기">
          <IcClose aria-hidden="true" />
        </S.CloseButton>
        <S.SwiperWrapper onClick={handleBackgroundClick}>
          <SwiperAction
            onIndexChange={setCurrentIndex}
            swiperElement={images.map((src, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: positional carousel slide
              <LightboxSlide key={index} src={src} index={index} />
            ))}
          />
        </S.SwiperWrapper>
        <S.FooterPanel onClick={handleBackgroundClick}>
          <S.CounterGroup>
            <S.CounterText>
              {currentIndex + 1} / {images.length}
            </S.CounterText>
            <S.DotsWrapper role="tablist" aria-label="이미지 인디케이터">
              {images.map((_, index) => (
                <S.Dot
                  // biome-ignore lint/suspicious/noArrayIndexKey: positional carousel indicator
                  key={index}
                  isActive={index === currentIndex}
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`이미지 ${index + 1}`}
                />
              ))}
            </S.DotsWrapper>
          </S.CounterGroup>
          {/* TODO: 모두 저장하기 기능 연동 필요 (이번 스코프 아님) */}
          <S.SaveAllButton type="button">모두 저장하기</S.SaveAllButton>
        </S.FooterPanel>
      </S.Root>
    </Modal>
  );
};

export default ImageLightbox;
