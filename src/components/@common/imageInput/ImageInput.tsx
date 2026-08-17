import IcCamera from "@/assets/icons/ic_camera.svg?react";
import useNativePhotoPickerBridge from "@/hooks/@common/useNativePhotoPickerBridge";
import * as S from "./ImageInput.styles";

interface ImageInputProps {
  /** 미리보기 이미지 URL. 없으면 기본 업로드 UI 표시 */
  previewImage: string | null;
  /** 이미지 선택 시 호출. 선택 취소 시 null */
  onChange?: (image: Blob | null) => void;
}

const ImageInput = ({ previewImage, onChange }: ImageInputProps) => {
  const { requestPhotoPicker } = useNativePhotoPickerBridge();

  const handleClick = async () => {
    const [photo] = await requestPhotoPicker(1);
    onChange?.(photo?.blob ?? null);
  };

  return (
    <S.ClickArea type="button" onClick={handleClick} aria-label="이미지 선택">
      {previewImage && (
        <S.PreviewImage src={previewImage} alt="선택한 이미지 미리보기" />
      )}
      <S.IconCircle>
        <IcCamera width={24} height={24} fill="none" aria-hidden="true" />
      </S.IconCircle>
    </S.ClickArea>
  );
};

export default ImageInput;
