import type { StatusType } from "../../../../../types/status";
import * as C from "../DisplayChip.common.styles";
import type { ChipVariant } from "../DisplayChip.types";
import * as S from "./StatusChip.styles";

const STATUS_LABEL: Record<StatusType, string> = {
  inProgress: "진행중",
  ended: "종료",
};

interface StatusChipProps {
  /** 라벨 텍스트 표시용 */
  status: StatusType;
  /** 칩의 시각적 표현 방식 */
  variant: ChipVariant;
}

const StatusChip = ({ status, variant }: StatusChipProps) => {
  return (
    <C.Chip
      $variant={variant}
      role="status"
      aria-label={`전시 상태: ${STATUS_LABEL[status]}`}
    >
      <S.Label aria-hidden={true}>{STATUS_LABEL[status]}</S.Label>
    </C.Chip>
  );
};

export default StatusChip;
