import IcChevronRight from "@/assets/icons/ic_chevron_right.svg?react";
import IcSmallLogo from "@/assets/icons/logos/logo_small.svg?react";
import { handleImageError } from "@/utils/handleImageError";
import * as S from "./SpaceCard.styles";

const spaceCardFallback = "/images/fallback/exhibition_list.png";

interface SpaceCardProps {
  /** 스페이스 제목 */
  title: string;
  /** 방명록 수. 미전달 시 방명록 뱃지·이동 버튼 없이 표시 */
  guestBookCount?: number;
  /** 썸네일 이미지 URL. 미전달·빈 문자열 또는 에러 시 fallback 이미지 표시 */
  thumbnailUrl?: string;
  /** 카드 클릭 핸들러 */
  onClick?: () => void;
}

const SpaceCard = ({
  title,
  guestBookCount,
  thumbnailUrl,
  onClick,
}: SpaceCardProps) => {
  const hasGuestBookCount = guestBookCount !== undefined;

  return (
    <S.Card
      type="button"
      onClick={onClick}
      $hasGuestBookCount={hasGuestBookCount}
      aria-label={
        hasGuestBookCount
          ? `스페이스: ${title}, 방명록 ${guestBookCount}개`
          : `스페이스: ${title}`
      }
    >
      <S.Thumbnail
        src={thumbnailUrl || spaceCardFallback}
        onError={(e) => handleImageError(e, spaceCardFallback)}
        alt=""
        aria-hidden
      />
      <S.InfoRow aria-hidden>
        <S.Content>
          <S.Title $singleLine={hasGuestBookCount}>{title}</S.Title>
          {hasGuestBookCount && (
            <S.MetaRow>
              <S.GuestBadge>
                <IcSmallLogo width={11} height={11} />
              </S.GuestBadge>
              <S.GuestBookCount>{guestBookCount}개의 방명록</S.GuestBookCount>
            </S.MetaRow>
          )}
        </S.Content>
        {hasGuestBookCount && (
          <S.ChevronWrapper>
            <IcChevronRight width={24} height={24} />
          </S.ChevronWrapper>
        )}
      </S.InfoRow>
    </S.Card>
  );
};

export default SpaceCard;
