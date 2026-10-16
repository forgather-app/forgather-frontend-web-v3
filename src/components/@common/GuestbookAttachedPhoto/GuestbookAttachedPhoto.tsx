import { useState } from "react";
import * as S from "./GuestbookAttachedPhoto.styles";

export interface GuestbookAttachedPhotoProps {
  /** 첨부 이미지 URL. 없거나 로드 실패 시 플레이스홀더 박스가 표시됩니다. */
  imageUrl?: string;
  /** 클릭 시 호출되는 콜백. 해당 이미지부터 시작하는 전체 이미지 라이트박스를 여는 용도로 사용합니다. */
  onClick: () => void;
}

const GuestbookAttachedPhoto = ({
  imageUrl,
  onClick,
}: GuestbookAttachedPhotoProps) => {
  const [imageError, setImageError] = useState(false);
  const showImage = Boolean(imageUrl) && !imageError;

  return (
    <S.Frame type="button" onClick={onClick} aria-label="첨부 이미지 확대보기">
      {showImage ? (
        <S.Thumbnail
          src={imageUrl}
          alt=""
          onError={() => setImageError(true)}
        />
      ) : (
        <S.PlaceholderBox aria-hidden />
      )}
    </S.Frame>
  );
};

export default GuestbookAttachedPhoto;
