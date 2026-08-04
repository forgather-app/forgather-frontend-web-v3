import type { ReactElement, SVGProps } from "react";
import { useEffect, useId, useMemo } from "react";
import IcClose from "@/assets/icons/ic_close.svg?react";
import * as S from "./PhotoInput.styles";

interface PhotoInputProps {
  /** 선택된 사진 목록. showCoverBadge가 true면 첫 번째 사진이 대표 사진으로 표시됨 */
  photos: File[];
  /** 최대 선택 가능 장수 */
  maxCount: number;
  /** 사진 목록 변경 시 호출 */
  onChange: (photos: File[]) => void;
  /** 추가 버튼에 표시할 아이콘 (24×24 SVG 권장) */
  icon: ReactElement<SVGProps<SVGSVGElement>>;
  /** 첫 번째 사진에 '대표 사진' 배지 표시 여부. 작품 등록처럼 대표 사진 개념이 있는 경우에만 true로 설정 */
  showCoverBadge?: boolean;
  /** 추가 버튼의 접근성 레이블 */
  addButtonAriaLabel?: string;
  /** 목록 전체의 접근성 레이블 */
  listAriaLabel?: string;
}

const PhotoInput = ({
  photos,
  maxCount,
  onChange,
  icon,
  showCoverBadge = false,
  addButtonAriaLabel = "사진 추가",
  listAriaLabel = "첨부한 사진",
}: PhotoInputProps) => {
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
    <S.Grid role="list" aria-label={listAriaLabel}>
      {canAddMore && (
        <>
          <S.AddLabel htmlFor={inputId} aria-label={addButtonAriaLabel}>
            {icon}
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
            alt={
              showCoverBadge && index === 0 ? "대표 사진" : `사진 ${index + 1}`
            }
          />
          {showCoverBadge && index === 0 && (
            <S.CoverBadge>대표 사진</S.CoverBadge>
          )}
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
