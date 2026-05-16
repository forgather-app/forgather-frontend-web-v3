import IcLink from "@/assets/icons/ic_link.svg?react";
import IcPinned from "@/assets/icons/ic_pinned.svg?react";
import IcSmallLogo from "@/assets/icons/logos/logo_small.svg?react";
import { handleImageError } from "@/utils/handleImageError";
import * as S from "./SpaceCard.styles";

const spaceCardFallback = "/images/fallback/space_card.png";

interface SpaceCardProps {
  /** 스페이스 제목 */
  title: string;
  /** 연결된 전시 이름. 미전달 시 "연결된 전시 없음" 표시 */
  exhibitionName?: string;
  /** 방문객 수 */
  guestCount: number;
  /** 배경 이미지 URL */
  backgroundImageUrl?: string;
  /** 카드 클릭 핸들러 */
  onClick?: () => void;
  /** 핀 고정 여부 (active: 흰색 아이콘 / inactive: 검정 아이콘) */
  isPinned?: boolean;
  /** 핀 버튼 클릭 핸들러. 전달 시 핀 버튼이 표시됨 */
  onPinClick?: () => void;
}

const SpaceCard = ({
  title,
  exhibitionName,
  guestCount,
  backgroundImageUrl,
  isPinned = false,
  onClick,
  onPinClick,
}: SpaceCardProps) => {
  return (
    <S.Card
      onClick={onClick}
      aria-label={`스페이스: ${title}, 전시: ${exhibitionName ?? "연결된 전시 없음"}`}
      $isClickable
    >
      <S.BackgroundImage
        src={backgroundImageUrl ?? spaceCardFallback}
        onError={(e) => handleImageError(e, spaceCardFallback)}
        alt=""
        aria-hidden
      />
      <S.Content>
        <S.TextArea>
          <S.Title>{title}</S.Title>
          <S.MetaRow>
            <S.ExhibitionLink
              aria-label={`연결된 전시: ${exhibitionName ?? "연결된 전시 없음"}`}
            >
              <IcLink aria-hidden />
              <S.ExhibitionName aria-hidden>
                {exhibitionName ?? "연결된 전시 없음"}
              </S.ExhibitionName>
            </S.ExhibitionLink>
            <S.GuestBadge
              aria-label={`방문객 ${guestCount}명`}
            >
              <S.GuestAvatarGroup aria-hidden>
                <S.GuestAvatar>
                  <IcSmallLogo width={14} height={14} />
                </S.GuestAvatar>
              </S.GuestAvatarGroup>
              <S.GuestCount aria-hidden>{guestCount}</S.GuestCount>
            </S.GuestBadge>
          </S.MetaRow>
        </S.TextArea>
      </S.Content>
      {onPinClick && (
        <S.PinButton
          type="button"
          $isPinned={isPinned}
          onClick={(e) => {
            e.stopPropagation();
            onPinClick();
          }}
          aria-label={isPinned ? "핀 고정 해제" : "핀 고정"}
          aria-pressed={isPinned}
        >
          <IcPinned aria-hidden />
        </S.PinButton>
      )}
    </S.Card>
  );
};

export default SpaceCard;
