import { useEffect, useId, useMemo } from "react";
import IcClose from "@/assets/icons/ic_close.svg?react";
import IcPhoto from "@/assets/icons/ic_photo.svg?react";
import * as S from "./PhotoInput.styles";

interface PhotoInputProps {
  /** 선택된 사진 목록. 첫 번째 사진이 대표 사진으로 표시됨 */
  photos: File[];
  /** 최대 선택 가능 장수 */
  maxCount?: number;
  /** 사진 목록 변경 시 호출 */
  onChange: (photos: File[]) => void;
}

const PhotoInput = ({ photos, maxCount = 10, onChange }: PhotoInputProps) => {
  const inputId = useId();
  const canAddMore = photos.length < maxCount;

  const previewUrls = useMemo(
    () => photos.map((photo) => URL.createObjectURL(photo)),
    [photos],
  );

  useEffect(() => {
    return () => {
      for (const url of previewUrls) URL.revokeObjectURL(url);
    };
  }, [previewUrls]);

  const handleAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length > 0) onChange([...photos, ...files].slice(0, maxCount));
    e.target.value = "";
  };

  const handleRemove = (index: number) => {
    onChange(photos.filter((_, i) => i !== index));
  };

  return (
    <S.Grid role="list" aria-label="첨부한 작품 사진">
      {canAddMore && (
        <>
          <S.AddLabel htmlFor={inputId} aria-label="작품 사진 추가">
            <IcPhoto aria-hidden="true" width={24} height={24} />
          </S.AddLabel>
          <S.InvisibleInput
            id={inputId}
            type="file"
            accept="image/*"
            multiple
            onChange={handleAdd}
          />
        </>
      )}
      {photos.map((photo, index) => (
        <S.Thumbnail
          key={`${photo.name}-${photo.lastModified}`}
          role="listitem"
        >
          <S.PreviewImage
            src={previewUrls[index]}
            alt={index === 0 ? "대표 사진" : `작품 사진 ${index + 1}`}
          />
          {index === 0 && <S.CoverBadge>대표 사진</S.CoverBadge>}
          <S.RemoveButton
            type="button"
            aria-label={`사진 ${index + 1} 삭제`}
            onClick={() => handleRemove(index)}
          >
            <IcClose aria-hidden="true" width={16} height={16} />
          </S.RemoveButton>
        </S.Thumbnail>
      ))}
    </S.Grid>
  );
};

export default PhotoInput;
