import { useState } from "react";
import * as S from "./GuestbookAttachedPhoto.styles";

export interface GuestbookAttachedPhotoProps {
  /** 첨부 이미지 URL. 없거나 로드 실패 시 플레이스홀더 박스가 표시됩니다. */
  imageUrl?: string;
  /** 현재 사진 순번 (1부터 시작) */
  currentIndex: number;
  /** 첨부된 전체 사진 개수 */
  totalCount: number;
  /** 클릭 시 호출되는 콜백. 전체 이미지 라이트박스를 여는 용도로 사용합니다. */
  onClick: () => void;
}

const GuestbookAttachedPhoto = ({
  imageUrl,
  currentIndex,
  totalCount,
  onClick,
}: GuestbookAttachedPhotoProps) => {
  const [imageError, setImageError] = useState(false);
  const showImage = Boolean(imageUrl) && !imageError;

  return (
    <S.Frame type="button" onClick={onClick} aria-label="첨부 이미지 전체보기">
      {showImage ? (
        <S.Thumbnail
          src={imageUrl}
          alt=""
          onError={() => setImageError(true)}
        />
      ) : (
        <S.PlaceholderBox aria-hidden />
      )}
      <S.CountBadge aria-hidden>{`${currentIndex}/${totalCount}`}</S.CountBadge>
    </S.Frame>
  );
};

export default GuestbookAttachedPhoto;
