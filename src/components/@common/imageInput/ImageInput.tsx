import IcCamera from "@/assets/icons/ic_camera.svg?react";
import * as S from "./ImageInput.styles";

const INPUT_ID = "image-input";

const ImageInput = () => {
  return (
    <>
      <S.ClickArea htmlFor={INPUT_ID} aria-label="이미지 선택">
        <S.IconCircle>
          <IcCamera width={24} height={24} fill="none" aria-hidden="true" />
        </S.IconCircle>
      </S.ClickArea>
      <S.InvisibleInput id={INPUT_ID} type="file" accept="image/*" />
    </>
  );
};

export default ImageInput;
