import * as S from "./GuestbookAttachedPhoto.styles";

export interface GuestbookAttachedPhotoProps {
  /** 첨부 이미지 URL. 없으면 플레이스홀더 박스가 표시됩니다. */
  imageUrl?: string;
  /** 현재 사진 순번 (1부터 시작) */
  currentIndex: number;
  /** 첨부된 전체 사진 개수 */
  totalCount: number;
}

const GuestbookAttachedPhoto = ({
  imageUrl,
  currentIndex,
  totalCount,
}: GuestbookAttachedPhotoProps) => {
  return (
    <S.Frame>
      {imageUrl ? (
        <S.Thumbnail src={imageUrl} alt="" />
      ) : (
        // TODO: 방명록 상세 API의 첨부 이미지 URL 연동 전까지 플레이스홀더 박스로 대체
        <S.PlaceholderBox aria-hidden />
      )}
      <S.CountBadge aria-hidden>{`${currentIndex}/${totalCount}`}</S.CountBadge>
    </S.Frame>
  );
};

export default GuestbookAttachedPhoto;
