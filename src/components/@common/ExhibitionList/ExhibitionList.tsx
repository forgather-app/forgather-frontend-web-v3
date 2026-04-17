import { ic_space as SpaceIcon } from "@/assets/icons";
import StatusChip from "../StatusChip/StatusChip";
import * as S from "./ExhibitionList.common.styles";
import type { ExhibitionListBaseProps } from "./ExhibitionList.types";
import { EXHIBITION_LIST_FALLBACK_IMAGE } from "@/constants/routes";
import { handleImageError } from "@/utils/handleImageError";

type ExhibitionListProps = ExhibitionListBaseProps;

const ExhibitionList = ({
  thumbnailUrl,
  status,
  spaceCount,
  title,
  period,
}: ExhibitionListProps) => {
  return (
    <S.Container>
      <S.Thumbnail
        src={thumbnailUrl || EXHIBITION_LIST_FALLBACK_IMAGE}
        alt=""
        aria-hidden
        onError={(e) => {
          handleImageError(e, EXHIBITION_LIST_FALLBACK_IMAGE);
        }}
      />
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
    </S.Container>
  );
};

export default ExhibitionList;
