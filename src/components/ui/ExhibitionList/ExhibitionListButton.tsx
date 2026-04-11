import { ic_space as SpaceIcon } from "@/assets/icons";
import type { StatusType } from "../../../types/status";
import StatusChip from "../StatusChip/StatusChip";
import * as S from "./ExhibitionList.common.styles";

interface ExhibitionListButtonProps {
  /** 선택 여부 */
  isSelected: boolean;
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
  /** 클릭 핸들러 */
  onClick?: () => void;
}

const ExhibitionListButton = ({
  isSelected,
  thumbnailUrl,
  status,
  spaceCount,
  title,
  period,
  onClick,
}: ExhibitionListButtonProps) => {
  return (
    <S.ButtonContainer
      $isSelected={isSelected}
      onClick={onClick}
      aria-pressed={isSelected}
      aria-label={`${title} 전시`}
    >
      <S.Thumbnail src={thumbnailUrl} alt="" aria-hidden />
      <S.ContentWrapper>
        <S.ChipsRow>
          <StatusChip status={status} />
          <S.SpaceBadge>
            <S.SpaceIconWrapper aria-hidden>
              <SpaceIcon width={16} height={16} aria-hidden="true" />
            </S.SpaceIconWrapper>
            <S.SpaceCount>{String(spaceCount).padStart(2, "0")}</S.SpaceCount>
          </S.SpaceBadge>
        </S.ChipsRow>
        <S.TextWrapper>
          <S.Title>{title}</S.Title>
          <S.Period>{period}</S.Period>
        </S.TextWrapper>
      </S.ContentWrapper>
    </S.ButtonContainer>
  );
};

export default ExhibitionListButton;
