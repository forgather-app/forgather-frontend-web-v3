import type { ReactElement, SVGProps } from "react";
import { useEffect, useId, useMemo, useState } from "react";
import IcClose from "@/assets/icons/ic_close.svg?react";
import { ERROR_MESSAGES } from "@/constants/error";
import useNativePhotoPickerBridge from "@/hooks/@common/useNativePhotoPickerBridge";
import useSnackBar from "@/hooks/@common/useSnackBar";
import {
  type NormalizedImage,
  normalizeImageForWeb,
} from "@/utils/normalizeImageForWeb";
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
  const { showSnackBar } = useSnackBar();
  const { requestPhotoPicker, isNativeAvailable } =
    useNativePhotoPickerBridge();
  const [isConverting, setIsConverting] = useState(false);
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

  const appendFiles = (files: File[]) => {
    if (files.length > 0) onChange([...photos, ...files].slice(0, maxCount));
  };

  // 웹뷰가 아닌 순수 브라우저(예: 방명록 작성 링크를 브라우저로 접근)에서의 폴백 경로.
  // HEIC 등 브라우저가 못 다루는 포맷은 미리보기·업로드 전에 여기서 정규화한다.
  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selected = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (selected.length === 0 || isConverting) return;

    setIsConverting(true);
    try {
      const settled = await Promise.allSettled(
        selected.map((file) => normalizeImageForWeb(file, file.name)),
      );
      const files = settled
        .filter(
          (result): result is PromiseFulfilledResult<NormalizedImage> =>
            result.status === "fulfilled",
        )
        .map(
          ({ value }) =>
            new File([value.blob], value.fileName, {
              type: value.blob.type || "image/jpeg",
            }),
        );
      appendFiles(files);
      if (files.length < selected.length) {
        showSnackBar(ERROR_MESSAGES.IMAGE_CONVERT_FAILED, "error");
      }
    } finally {
      setIsConverting(false);
    }
  };

  // RN 앱 웹뷰 안에서는 네이티브 갤러리 피커를 사용 (정규화는 브릿지 훅에서 처리됨)
  const handleNativeAdd = async () => {
    if (isConverting) return;

    setIsConverting(true);
    try {
      const picked = await requestPhotoPicker(maxCount - photos.length);
      appendFiles(
        picked.map(
          ({ blob, fileName }) =>
            new File([blob], fileName, { type: blob.type || "image/jpeg" }),
        ),
      );
    } finally {
      setIsConverting(false);
    }
  };

  const handleRemove = (index: number) => {
    onChange(photos.filter((_, i) => i !== index));
  };

  return (
    <S.Grid role="list" aria-label={listAriaLabel}>
      {canAddMore &&
        (isConverting ? (
          <S.ConvertingBox role="status" aria-label="사진을 불러오는 중">
            <S.Spinner aria-hidden="true" />
          </S.ConvertingBox>
        ) : isNativeAvailable ? (
          <S.AddButton
            type="button"
            onClick={handleNativeAdd}
            aria-label={addButtonAriaLabel}
          >
            {icon}
          </S.AddButton>
        ) : (
          <>
            <S.AddLabel htmlFor={inputId} aria-label={addButtonAriaLabel}>
              {icon}
            </S.AddLabel>
            <S.InvisibleInput
              id={inputId}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileInputChange}
            />
          </>
        ))}
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
