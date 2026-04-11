import type { StatusType } from "../../../types/status";
import * as S from "./StatusChip.styles";

const STATUS_LABEL: Record<StatusType, string> = {
  inProgress: "진행중",
  ended: "종료",
};

interface StatusChipProps {
  /** 전시 진행 상태 */
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
