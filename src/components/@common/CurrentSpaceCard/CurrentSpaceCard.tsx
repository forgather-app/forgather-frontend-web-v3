import IcCalender from "@/assets/icons/ic_calendar.svg?react";
import IcLink from "@/assets/icons/ic_link.svg?react";
import IcLocation from "@/assets/icons/ic_location.svg?react";
import { CURRENT_SPACE_FALLBACK_IMAGE } from "@/constants/routes";
import { theme } from "@/styles/theme";
import { formatExhibitionPeriod } from "@/utils/date";
import { handleImageError } from "@/utils/handleImageError";
import * as S from "./CurrentSpaceCard.styles";

interface ExhibitionDateType {
  /** 전시 시작일 */
  startDate: Date;
  /** 전시 종료일 */
  endDate: Date;
}

interface ExhibitionInfoType {
  /** 전시명 */
  name: string;
  /** 전시 상세 페이지 URL */
  url: string;
  /** 전시 기간 */
  period: ExhibitionDateType;
  /** 전시 장소 */
  location: string;
}

interface CurrentSpaceCardCommonProps {
  /** 공간 이름 */
  spaceName: string;
  /** 공간 썸네일 이미지 URL */
  thumbnailUrl?: string;
  /** 카드 전체 클릭 핸들러 */
  onCardClick?: () => void;
  /** 방명록 버튼 클릭 핸들러 */
  onGuestBookClick?: () => void;
  /** 작품 관리 버튼 클릭 핸들러 */
  onArtworkManageClick?: () => void;
}

interface CurrentSpaceCardWithExhibitionProps
  extends CurrentSpaceCardCommonProps {
  /** 연결된 전시 정보 */
  linkedExhibition: ExhibitionInfoType;
  /** 상단 연결 전시 칩 클릭 핸들러 */
  onLinkedExhibitionClick?: (exhibition: ExhibitionInfoType) => void;
  /** 전시 관리 버튼 클릭 핸들러 */
  onExhibitionManageClick?: () => void;
}

interface CurrentSpaceCardWithoutExhibitionProps
  extends CurrentSpaceCardCommonProps {
  /** 연결된 전시가 없는 상태 */
  linkedExhibition?: undefined;
}

type CurrentSpaceCardProps =
  | CurrentSpaceCardWithExhibitionProps
  | CurrentSpaceCardWithoutExhibitionProps;

const stopCardClick = (event: React.MouseEvent<HTMLElement>) => {
  event.stopPropagation();
};

const CurrentSpaceCard = (props: CurrentSpaceCardProps) => {
  const {
    spaceName,
    thumbnailUrl,
    linkedExhibition,
    onCardClick,
    onGuestBookClick,
    onArtworkManageClick,
  } = props;
  const periodText = linkedExhibition
    ? formatExhibitionPeriod(
        linkedExhibition.period.startDate,
        linkedExhibition.period.endDate,
      )
    : undefined;
  const locationText = linkedExhibition?.location;
  const actions = [
    {
      label: "방명록",
      onClick: onGuestBookClick,
    },
    {
      label: "작품 관리",
      onClick: onArtworkManageClick,
    },
    ...(linkedExhibition
      ? [
          {
            label: "전시 관리",
            onClick: props.onExhibitionManageClick,
          },
        ]
      : []),
  ];

  const handleLinkedExhibitionClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    stopCardClick(event);

    if (linkedExhibition) {
      props.onLinkedExhibitionClick?.(linkedExhibition);
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
            <IcLink width={14} height={14} color={theme.colors.gray.gray200} />
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
        {actions.map(({ label, onClick }, index) => (
          <S.ActionItem key={label}>
            {index > 0 && <S.Divider aria-hidden />}
            <S.ActionButton
              type="button"
              onClick={(event) => {
                stopCardClick(event);
                onClick?.();
              }}
            >
              {label}
            </S.ActionButton>
          </S.ActionItem>
        ))}
      </S.ActionGroup>
    </S.Wrapper>
  );
};

export default CurrentSpaceCard;
