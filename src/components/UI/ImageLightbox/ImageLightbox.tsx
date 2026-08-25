import { useState } from "react";
import IcClose from "@/assets/icons/ic_close.svg?react";
import IcDownload from "@/assets/icons/ic_download.svg?react";
import ImagePlaceholderGraphic from "@/assets/images/artwork_card_placeholder.svg?react";
import Button from "@/components/@common/Button/Button";
import Modal from "@/components/UI/Modal/Modal";
import SwiperAction from "@/components/UI/SwiperAction/SwiperAction";
import useSaveImageBridge from "@/hooks/@common/useSaveImageBridge";
import * as S from "./ImageLightbox.styles";

export interface LightboxImage {
  /** 이미지 URL */
  url: string;
  /** 저장 시 사용할 파일명. 없으면 URL에서 유추합니다. */
  name?: string;
}

const getFilename = (image: LightboxImage, index: number) =>
  image.name ?? image.url.split("/").pop() ?? `image-${index + 1}`;

interface LightboxSlideProps {
  image: LightboxImage;
  index: number;
  onSave: (image: LightboxImage, index: number) => void;
}

const LightboxSlide = ({ image, index, onSave }: LightboxSlideProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <S.ImageSquare>
      {imageError ? (
        <S.PlaceholderWrapper aria-hidden>
          <ImagePlaceholderGraphic />
        </S.PlaceholderWrapper>
      ) : (
        <S.SlideImage
          src={image.url}
          alt={`첨부 이미지 ${index + 1}`}
          onError={() => setImageError(true)}
        />
      )}
      <S.DownloadButtonWrapper>
        <Button
          variant="icon"
          icon={<IcDownload aria-hidden="true" />}
          aria-label="이미지 다운로드"
          onClick={() => onSave(image, index)}
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
  /** 전체보기할 이미지 목록 */
  images: LightboxImage[];
  /** 처음 보여줄 이미지의 인덱스 (기본값 0) */
  startIndex?: number;
}

const ImageLightbox = ({
  isOpen,
  onClose,
  images,
  startIndex = 0,
}: ImageLightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const { saveImage, saveImages } = useSaveImageBridge();

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSave = (image: LightboxImage, index: number) => {
    saveImage({ url: image.url, filename: getFilename(image, index) });
  };

  const handleSaveAll = () => {
    saveImages(
      images.map((image, index) => ({
        url: image.url,
        filename: getFilename(image, index),
      })),
    );
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
            initialIndex={startIndex}
            onIndexChange={setCurrentIndex}
            swiperElement={images.map((image, index) => (
              <LightboxSlide
                // biome-ignore lint/suspicious/noArrayIndexKey: positional carousel slide
                key={index}
                image={image}
                index={index}
                onSave={handleSave}
              />
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
          <S.SaveAllButton type="button" onClick={handleSaveAll}>
            모두 저장하기
          </S.SaveAllButton>
        </S.FooterPanel>
      </S.Root>
    </Modal>
  );
};

export default ImageLightbox;
