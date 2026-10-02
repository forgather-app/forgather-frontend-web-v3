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
  /** 저장 시 사용할 파일명(확장자 제외 기준 이름). 없으면 URL에서 유추합니다. */
  name?: string;
}

// NOTE: 저장(다운로드) 요청의 확장자는 실제 파일 내용(webp)과 일부러 다르게 jpg로 고정한다.
// RN 앱이 쓰는 @react-native-camera-roll/camera-roll 7.5.1+ (PR #599)에서, 확장자가 webp인
// 파일을 CameraRoll.saveAsset으로 저장할 때 디코딩 후 재인코딩하는 분기(UIImageJPEGRepresentation
// 호출 누락)가 PHPhotosErrorDomain 3302로 항상 실패한다. jpg 등 다른 확장자는 파일을 그대로
// 전달하는 분기를 타 재인코딩 없이 안전하게 저장된다. 라이브러리 버그가 고쳐지기 전까지의
// 임시 우회이며, 실제로는 webp 바이트가 .jpg로 표시되는 라벨 불일치를 의도적으로 만든다.
const SAVE_EXTENSION = "jpg";

const stripExtension = (name: string) => name.replace(/\.[a-zA-Z0-9]+$/, "");

const getFilename = (image: LightboxImage, index: number) => {
  const base = image.name
    ? stripExtension(image.name)
    : (image.url
        .split("/")
        .pop()
        ?.split("?")[0]
        .replace(/\.[a-zA-Z0-9]+$/, "") ?? `image-${index + 1}`);
  return `${base}.${SAVE_EXTENSION}`;
};

interface LightboxSlideProps {
  image: LightboxImage;
  index: number;
  onSave: (image: LightboxImage, index: number) => void;
  /** 이미지 저장(다운로드) 버튼 노출 여부 */
  showSave: boolean;
}

const LightboxSlide = ({
  image,
  index,
  onSave,
  showSave,
}: LightboxSlideProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <S.ImageSquare>
      <S.ImageFrame>
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
        {showSave && (
          <S.DownloadButtonWrapper>
            <Button
              variant="icon"
              icon={<IcDownload aria-hidden="true" />}
              aria-label="이미지 다운로드"
              onClick={() => onSave(image, index)}
            />
          </S.DownloadButtonWrapper>
        )}
      </S.ImageFrame>
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
  /** 이미지 저장(다운로드·모두 저장하기) 기능 노출 여부 (기본값 true) */
  allowSave?: boolean;
}

const ImageLightbox = ({
  isOpen,
  onClose,
  images,
  startIndex = 0,
  allowSave = true,
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
                showSave={allowSave}
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
          {allowSave && (
            <S.SaveAllButton type="button" onClick={handleSaveAll}>
              모두 저장하기
            </S.SaveAllButton>
          )}
        </S.FooterPanel>
      </S.Root>
    </Modal>
  );
};

export default ImageLightbox;
