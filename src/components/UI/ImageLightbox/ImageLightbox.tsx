import { useState } from "react";
import IcClose from "@/assets/icons/ic_close.svg?react";
import IcDownload from "@/assets/icons/ic_download.svg?react";
import IcTrash from "@/assets/icons/ic_trash.svg?react";
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
  /** 삭제 요청 시 사용할 사진 id. onDeleteImage를 사용하는 경우 전달합니다. */
  id?: number;
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
  /** 사진 삭제 요청 콜백. 전달되면 삭제 버튼이 노출됩니다 */
  onDelete?: (image: LightboxImage, index: number) => void;
}

const LightboxSlide = ({
  image,
  index,
  onSave,
  showSave,
  onDelete,
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
        {onDelete && (
          <S.DeleteButtonWrapper>
            <Button
              variant="icon"
              icon={<IcTrash aria-hidden="true" />}
              aria-label="사진 삭제"
              onClick={() => onDelete(image, index)}
            />
          </S.DeleteButtonWrapper>
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
  /** 사진 삭제 요청 콜백. 전달되면 각 이미지에 삭제 버튼이 노출됩니다 */
  onDeleteImage?: (image: LightboxImage, index: number) => void;
}

const ImageLightbox = ({
  isOpen,
  onClose,
  images,
  startIndex = 0,
  allowSave = true,
  onDeleteImage,
}: ImageLightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  // 열릴 때마다(마운트 상태 유지한 채 isOpen이 false→true로 바뀔 때) swiperKey를 올려
  // SwiperAction만 리마운트시켜 항상 startIndex부터 다시 시작한다. 라이트박스 전체를
  // key로 리마운트하면(Modal까지 포함) portal이 document.body 맨 뒤로 다시 붙어, 이미
  // 열려 있던 다른(나중에 마운트된) Modal보다 위로 올라와 가려버리는 문제가 있었다.
  const [swiperKey, setSwiperKey] = useState(0);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setCurrentIndex(startIndex);
      setSwiperKey((key) => key + 1);
    }
    // 열렸다 닫힐 때 아래 clamp 분기가 이번 렌더에서 아직 갱신 전인(stale) currentIndex로
    // 같이 실행되어 방금 세팅한 startIndex를 덮어쓰지 않도록, 이 렌더에서는 여기서 끝낸다.
  } else if (isOpen && images.length > 0 && currentIndex > images.length - 1) {
    // 열려 있는 동안 사진이 삭제돼 images 배열이 줄어든 경우 — SwiperAction은 uncontrolled라
    // 내부 인덱스가 사라진 자리를 그대로 가리키게 된다("n / 줄어든 전체 수" 같은 깨진 카운터,
    // 빈 트랙 위치). currentIndex를 새 배열 범위로 clamp하고 그 위치로 SwiperAction을
    // 다시 마운트시켜 맞춘다.
    setCurrentIndex(images.length - 1);
    setSwiperKey((key) => key + 1);
  }
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
            key={swiperKey}
            initialIndex={currentIndex}
            onIndexChange={setCurrentIndex}
            swiperElement={images.map((image, index) => (
              <LightboxSlide
                // biome-ignore lint/suspicious/noArrayIndexKey: positional carousel slide
                key={index}
                image={image}
                index={index}
                onSave={handleSave}
                showSave={allowSave}
                onDelete={onDeleteImage}
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
