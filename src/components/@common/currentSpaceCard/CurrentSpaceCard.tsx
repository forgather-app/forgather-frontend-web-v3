import IcCalender from "@/assets/icons/ic_calendar.svg?react";
import IcLink from "@/assets/icons/ic_link.svg?react";
import IcLocation from "@/assets/icons/ic_location.svg?react";
import { CURRENT_SPACE_FALLBACK_IMAGE } from "@/constants/routes";
import { theme } from "@/styles/theme";
import { handleImageError } from "@/utils/handleImageError";
import * as S from "./CurrentSpaceCard.styles";

interface ExhibitionDateType {
  startDate: Date;
  endDate: Date;
}

interface ExhibitionInfoType {
  name: string;
  url: string;
  period: ExhibitionDateType;
  location: string;
}

interface CurrentSpaceCardProps {
  /** 공간 이름 */
  spaceName: string;
  /** 공간 썸네일 이미지 URL */
  thumbnailUrl?: string;
  /** 연결된 전시 정보 */
  linkedExhibition?: ExhibitionInfoType;
  /** 카드 전체 클릭 핸들러 */
  onCardClick?: () => void;
  /** 상단 연결 전시 칩 클릭 핸들러 */
  onLinkedExhibitionClick?: (exhibition: ExhibitionInfoType) => void;
  /** 방명록 버튼 클릭 핸들러 */
  onGuestBookClick?: () => void;
  /** 작품 관리 버튼 클릭 핸들러 */
  onArtworkManageClick?: () => void;
  /** 전시 관리 버튼 클릭 핸들러 */
  onExhibitionManageClick?: () => void;
}

const formatShortDate = (date: Date) => {
  const year = String(date.getFullYear()).slice(-2);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}.${month}.${day}`;
};

const formatPeriod = ({ startDate, endDate }: ExhibitionDateType) =>
  `${formatShortDate(startDate)} - ${formatShortDate(endDate)}`;

const stopCardClick = (event: React.MouseEvent<HTMLElement>) => {
  event.stopPropagation();
};

const CurrentSpaceCard = ({
  spaceName,
  thumbnailUrl,
  linkedExhibition,
  onCardClick,
  onLinkedExhibitionClick,
  onGuestBookClick,
  onArtworkManageClick,
  onExhibitionManageClick,
}: CurrentSpaceCardProps) => {
  const periodText = linkedExhibition
    ? formatPeriod(linkedExhibition.period)
    : undefined;
  const locationText = linkedExhibition?.location;

  const handleLinkedExhibitionClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    stopCardClick(event);

    if (linkedExhibition) {
      onLinkedExhibitionClick?.(linkedExhibition);
    }
  };

  return (
    <S.Wrapper>
      <S.Card
        role="button"
        tabIndex={0}
        aria-label={`${spaceName} 공간 카드`}
        onClick={onCardClick}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onCardClick?.();
          }
        }}
      >
        <S.Thumbnail
          src={thumbnailUrl || CURRENT_SPACE_FALLBACK_IMAGE}
          alt={`${spaceName} 썸네일`}
          onError={(e) => handleImageError(e, CURRENT_SPACE_FALLBACK_IMAGE)}
        />
        <S.GradientOverlay aria-hidden />

        {linkedExhibition && (
          <S.LinkedExhibitionButton
            type="button"
            aria-label={`${linkedExhibition.name} 연결 전시 보기`}
            onClick={handleLinkedExhibitionClick}
          >
            <IcLink width={14} height={14} fill={theme.colors.gray.gray50} />
            <S.LinkedExhibitionName>
              {linkedExhibition.name}
            </S.LinkedExhibitionName>
          </S.LinkedExhibitionButton>
        )}

        <S.Content>
          <S.SpaceName>{spaceName}</S.SpaceName>
          {linkedExhibition && (
            <S.ExhibitionMeta>
              <S.MetaItem>
                <IcLocation
                  width={12}
                  height={14}
                  fill={theme.colors.gray.gray300}
                />
                <span>{periodText}</span>
              </S.MetaItem>
              <S.MetaItem>
                <IcCalender
                  width={16}
                  height={16}
                  stroke={theme.colors.gray.gray300}
                />
                <span>{locationText}</span>
              </S.MetaItem>
            </S.ExhibitionMeta>
          )}
        </S.Content>
      </S.Card>

      <S.ActionGroup aria-label={`${spaceName} 관리 메뉴`}>
        <S.ActionButton
          type="button"
          onClick={(event) => {
            stopCardClick(event);
            onGuestBookClick?.();
          }}
        >
          방명록
        </S.ActionButton>
        <S.Divider aria-hidden />
        <S.ActionButton
          type="button"
          onClick={(event) => {
            stopCardClick(event);
            onArtworkManageClick?.();
          }}
        >
          작품 관리
        </S.ActionButton>
        <S.Divider aria-hidden />
        <S.ActionButton
          type="button"
          onClick={(event) => {
            stopCardClick(event);
            onExhibitionManageClick?.();
          }}
        >
          전시 관리
        </S.ActionButton>
      </S.ActionGroup>
    </S.Wrapper>
  );
};

export default CurrentSpaceCard;
export type { CurrentSpaceCardProps, ExhibitionDateType, ExhibitionInfoType };
