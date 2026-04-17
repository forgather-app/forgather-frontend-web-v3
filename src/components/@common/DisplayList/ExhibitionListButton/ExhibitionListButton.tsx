import { ic_space as SpaceIcon } from "@/assets/icons";
import { EXHIBITION_LIST_FALLBACK_IMAGE } from "@/constants/routes";
import type { StatusType } from "@/types/status";
import { handleImageError } from "@/utils/handleImageError";
import StatusChip from "../../Chip/DisplayChip/StatusChip/StatusChip";
import * as S from "../ExhibitionList.common.styles";
import type { ExhibitionListBaseProps } from "../ExhibitionList.types";
import { ButtonContainer } from "./ExhibitionListButton.styles";

interface ExhibitionListButtonProps extends ExhibitionListBaseProps {
  /** 선택 여부 */
  isSelected: boolean;
  /** 클릭 핸들러 */
  onClick?: () => void;
}

const matchChipVariant = (status: StatusType, isSelected: boolean) => {
  if (status === "inProgress") return "active";
  if (status === "ended" && !isSelected) return "inactive";
  if (status === "ended" && isSelected) return "dimmed";
  return "active";
};

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
    <ButtonContainer
      $isSelected={isSelected}
      onClick={onClick}
      aria-pressed={isSelected}
      aria-label={`${title} 전시`}
    >
      <S.Thumbnail
        src={thumbnailUrl || EXHIBITION_LIST_FALLBACK_IMAGE}
        alt=""
        aria-hidden
        onError={(e) => handleImageError(e, EXHIBITION_LIST_FALLBACK_IMAGE)}
      />
      <S.ContentWrapper>
        <S.ChipsRow>
          <StatusChip
            status={status}
            variant={matchChipVariant(status, isSelected)}
          />
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
    </ButtonContainer>
  );
};

export default ExhibitionListButton;
