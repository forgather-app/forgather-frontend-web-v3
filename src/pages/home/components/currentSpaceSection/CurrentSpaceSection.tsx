import IcFire from "@/assets/icons/ic_fire.svg?react";
import { handleImageError } from "@/utils/handleImageError";
import * as S from "./CurrentSpaceSection.styles";

const spaceCardFallback = "/images/fallback/space_card.png";

interface CurrentSpaceSectionProps {
  /** 스페이스 이름 (최대 두 줄 표시) */
  spaceName: string;
  /** 썸네일 이미지 URL. 미전달·빈 문자열 또는 에러 시 fallback 이미지 표시 */
  thumbnailUrl?: string;
  /** 새로 작성된 방명록 수. 1 이상이면 방명록 보기 버튼에 배지 표시 */
  newGuestBookCount?: number;
  /** 방명록 보기 버튼 클릭 핸들러 */
  onGuestBookClick?: () => void;
  /** 작품 관리 버튼 클릭 핸들러 */
  onArtworkManageClick?: () => void;
}

const CurrentSpaceSection = ({
  spaceName,
  thumbnailUrl,
  newGuestBookCount = 0,
  onGuestBookClick,
  onArtworkManageClick,
}: CurrentSpaceSectionProps) => {
  return (
    <S.Card>
      <S.ImageArea>
        <S.Thumbnail
          src={thumbnailUrl || spaceCardFallback}
          onError={(e) => handleImageError(e, spaceCardFallback)}
          alt=""
          aria-hidden
        />
        <S.Dim aria-hidden />
        <S.LabelRow>
          <IcFire width={20} height={20} aria-hidden />
          <S.Label>지금 축하받는 스페이스</S.Label>
        </S.LabelRow>
        <S.SpaceName>{spaceName}</S.SpaceName>
      </S.ImageArea>

      <S.Actions>
        <S.ActionButton type="button" onClick={onGuestBookClick}>
          방명록 보기
          {newGuestBookCount > 0 && (
            <S.Badge aria-label={`새 방명록 ${newGuestBookCount}개`}>
              {newGuestBookCount}
            </S.Badge>
          )}
        </S.ActionButton>
        <S.Divider aria-hidden />
        <S.ActionButton type="button" onClick={onArtworkManageClick}>
          작품 관리
        </S.ActionButton>
      </S.Actions>
    </S.Card>
  );
};

export default CurrentSpaceSection;
