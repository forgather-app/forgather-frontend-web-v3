import icFile from "@/assets/icons/ic_file.svg";
import IcSmallLogo from "@/assets/icons/logos/logo_small.svg?react";
import { handleImageError } from "@/utils/handleImageError";
import * as S from "./SpaceFileCard.styles";

const spaceCardFallback = "/images/fallback/space_card_file.png";

interface SpaceFileCardProps {
  /** 스페이스 제목 */
  title: string;
  /** 방문객 수 */
  guestCount: number;
  /** 썸네일 이미지 URL. 미전달 또는 에러 시 fallback 이미지 표시 */
  thumbnailUrl?: string;
  /** 카드 variant: 기본(default) 또는 새 방문객 알림(new) */
  variant?: "default" | "new";
  /** 새 방문객 수. variant="new"일 때 빨간 배지에 표시되는 숫자 */
  newGuestCount?: number;
  /** 카드 클릭 핸들러 */
  onClick?: () => void;
}

const SpaceFileCard = ({
  title,
  guestCount,
  thumbnailUrl,
  variant = "default",
  newGuestCount,
  onClick,
}: SpaceFileCardProps) => {
  return (
    <S.Card
      role="button"
      onClick={onClick}
      aria-label={`스페이스 파일: ${title}`}
    >
      <S.ImageFrame>
        <S.Thumbnail
          src={thumbnailUrl ?? spaceCardFallback}
          onError={(e) => handleImageError(e, spaceCardFallback)}
          alt=""
          aria-hidden
        />
        <S.FileShape src={icFile} alt="" aria-hidden />
        <S.BadgeArea>
          <S.GuestBadge aria-label={`방문객 ${guestCount}명`}>
            <S.GuestAvatarGroup aria-hidden>
              <S.GuestAvatar>
                <IcSmallLogo width={14} height={14} />
              </S.GuestAvatar>
            </S.GuestAvatarGroup>
            <S.GuestCount aria-hidden>{guestCount}</S.GuestCount>
          </S.GuestBadge>
          {variant === "new" && newGuestCount !== undefined && (
            <S.NewGuestBadge aria-label={`새 방문객 ${newGuestCount}명`}>
              <S.NewGuestCount aria-hidden>+{newGuestCount}</S.NewGuestCount>
            </S.NewGuestBadge>
          )}
        </S.BadgeArea>
      </S.ImageFrame>
      <S.Title>{title}</S.Title>
    </S.Card>
  );
};

export default SpaceFileCard;
