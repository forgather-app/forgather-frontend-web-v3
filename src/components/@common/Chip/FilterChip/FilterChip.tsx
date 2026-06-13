import * as S from "./FilterChip.styles";

interface FilterChipProps {
  /** 칩에 표시될 텍스트 */
  label: string;
  /** 선택 상태 */
  isSelected: boolean;
  /** 클릭 핸들러 */
  onClick: () => void;
}

/**
 * 필터링할 때 사용하는 칩 컴포넌트.
 *
 * - 선택 상태(`isSelected=true`)이면 보라색 배경과 테두리로 표시됩니다.
 * - 미선택 상태이면 회색 테두리만 표시됩니다.
 * - `aria-pressed`로 스크린 리더에 선택 여부를 전달합니다.
 */
const FilterChip = ({ label, isSelected, onClick }: FilterChipProps) => {
  return (
    <S.Chip
      type="button"
      $isSelected={isSelected}
      onClick={onClick}
      aria-pressed={isSelected}
    >
      {label}
    </S.Chip>
  );
};

export default FilterChip;
