import type { StatusType } from "../../../types/status";

export interface ExhibitionListBaseProps {
  /** 전시 대표 이미지 URL */
  thumbnailUrl: string;
  /** 전시 진행 상태 */
  status: StatusType;
  /** 전시 참여자(방명록) 수 */
  spaceCount: number;
  /** 전시 제목 */
  title: string;
  /** 전시 기간 (예: "26.2.8 - 26.2.10") */
  period: string;
}
