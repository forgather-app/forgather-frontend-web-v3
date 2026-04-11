import type { StatusType } from "../../../types/status";
import * as S from "./StatusChip.styles";

const STATUS_LABEL: Record<StatusType, string> = {
  inProgress: "진행중",
  ended: "종료",
};

/**
 * 전시 진행 상태를 나타내는 칩 컴포넌트.
 *
 * - `inProgress`: 현재 진행 중인 전시 (보라색 배경)
 * - `ended`: 종료된 전시 (회색 배경)
 */
interface StatusChipProps {
  /**
   * 전시 진행 상태.
   *
   * - `inProgress`: 진행중
   * - `ended`: 종료
   */
  status: StatusType;
}

const StatusChip = ({ status }: StatusChipProps) => {
  return (
    <S.Chip
      status={status}
      role="status"
      aria-label={`전시 상태: ${STATUS_LABEL[status]}`}
    >
      <S.Label aria-hidden={true}>{STATUS_LABEL[status]}</S.Label>
    </S.Chip>
  );
};

export default StatusChip;
