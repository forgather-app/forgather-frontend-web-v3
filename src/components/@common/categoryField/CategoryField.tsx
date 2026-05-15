import ClearIcon from "../../../assets/icons/ic_clear.svg?react";
import * as S from "./CategoryField.styles";

interface CategoryFieldProps {
  /** 현재 입력 중인 카테고리 값 (# 제외) */
  value: string;
  /** 입력값 변경 핸들러 */
  onChange: (value: string) => void;
  /** 추가된 카테고리 목록 (# 제외) */
  categories: string[];
  /** 카테고리 추가 핸들러 */
  onAdd: () => void;
  /** 카테고리 제거 핸들러 */
  onRemove: (index: number) => void;
  /** 입력 필드 플레이스홀더 */
  placeholder?: string;
}

const CategoryField = ({
  value,
  onChange,
  categories,
  onAdd,
  onRemove,
  placeholder,
}: CategoryFieldProps) => {
  return (
    <S.Wrapper>
      <S.InputRow>
        <S.InputField>
          <S.HashPrefix aria-hidden="true">#</S.HashPrefix>
          <S.Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            aria-label="카테고리 입력"
          />
        </S.InputField>
        <S.AddButton type="button" onClick={onAdd} aria-label="카테고리 추가">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M12 5V19M5 12H19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <S.AddLabel>추가</S.AddLabel>
        </S.AddButton>
      </S.InputRow>
      {categories.length > 0 && (
        <S.ChipsRow role="list" aria-label="추가된 카테고리 목록">
          {categories.map((category, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: 카테고리 목록은 index로 관리
            <S.ChipGroup key={index} role="listitem">
              <S.Chip>
                <S.ChipText>#{category}</S.ChipText>
              </S.Chip>
              <S.RemoveButton
                type="button"
                onClick={() => onRemove(index)}
                aria-label={`${category} 카테고리 제거`}
              >
                <ClearIcon aria-hidden width={16} height={16} />
              </S.RemoveButton>
            </S.ChipGroup>
          ))}
        </S.ChipsRow>
      )}
    </S.Wrapper>
  );
};

export default CategoryField;
