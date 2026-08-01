import IcChevronRight from "@/assets/icons/ic_chevron_right.svg?react";
import IcSmallLogo from "@/assets/icons/logos/logo_small.svg?react";
import { handleImageError } from "@/utils/handleImageError";
import * as S from "./SpaceCard.styles";

const spaceCardFallback = "/images/fallback/exhibition_list.png";

interface SpaceCardProps {
  /** 스페이스 제목 */
  title: string;
  /** 방명록 수 */
  guestBookCount: number;
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
  return (
    <S.Card
      type="button"
      onClick={onClick}
      aria-label={`스페이스: ${title}, 방명록 ${guestBookCount}개`}
    >
      <S.Thumbnail
        src={thumbnailUrl || spaceCardFallback}
        onError={(e) => handleImageError(e, spaceCardFallback)}
        alt=""
        aria-hidden
      />
      <S.Content aria-hidden>
        <S.Title>{title}</S.Title>
        <S.MetaRow>
          <S.GuestBadge>
            <IcSmallLogo width={11} height={11} />
          </S.GuestBadge>
          <S.GuestBookCount>{guestBookCount}개의 방명록</S.GuestBookCount>
        </S.MetaRow>
      </S.Content>
      <S.ChevronWrapper aria-hidden>
        <IcChevronRight width={24} height={24} />
      </S.ChevronWrapper>
    </S.Card>
  );
};

export default SpaceCard;
