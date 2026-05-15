import * as C from "./DisplayChip.common.styles";
import * as S from "./DisplayChip.styles";
import type { ChipVariant } from "./DisplayChip.types";

interface DisplayChipProps {
  /** 칩에 표시할 텍스트 */
  text: string;
  /** 칩의 시각적 스타일 */
  variant: ChipVariant;
}

const DisplayChip = ({ text, variant }: DisplayChipProps) => {
  return (
    <C.Chip $variant={variant}>
      <S.Label>{text}</S.Label>
    </C.Chip>
  );
};

export default DisplayChip;
