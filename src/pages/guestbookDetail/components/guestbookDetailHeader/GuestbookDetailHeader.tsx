import IcChevronRight from "@/assets/icons/ic_chevron_right.svg?react";
import { formatGuestDisplayDate } from "@/utils/date";
import * as S from "./GuestbookDetailHeader.styles";

export interface GuestbookDetailHeaderProps {
  /** 방명록 작성자 닉네임 */
  nickname: string;
  /** 방명록 작성 일시 */
  createdAt: Date;
  /** 이전 방명록으로 이동 핸들러. 전달하지 않으면 이전 버튼이 비활성화됩니다. */
  onPrevClick?: () => void;
  /** 다음 방명록으로 이동 핸들러. 전달하지 않으면 다음 버튼이 비활성화됩니다. */
  onNextClick?: () => void;
}

const GuestbookDetailHeader = ({
  nickname,
  createdAt,
  onPrevClick,
  onNextClick,
}: GuestbookDetailHeaderProps) => {
  const [displayDate, displayTime] =
    formatGuestDisplayDate(createdAt).split("  |  ");

  return (
    <S.Wrapper>
      <S.NavButton
        type="button"
        onClick={onPrevClick}
        disabled={!onPrevClick}
        aria-label="이전 방명록"
      >
        <S.MirroredIcon aria-hidden>
          <IcChevronRight width={20} height={20} />
        </S.MirroredIcon>
      </S.NavButton>

      <S.TitleGroup
        role="group"
        tabIndex={0}
        aria-label={`${nickname}님의 방명록, ${displayDate} ${displayTime} 작성`}
      >
        <S.NameRow aria-hidden>
          <S.Nickname>{nickname}</S.Nickname>
          <S.TitleSuffix>님의 방명록</S.TitleSuffix>
        </S.NameRow>
        <S.MetaRow aria-hidden>
          <span>{displayDate}</span>
          <S.Divider />
          <span>{displayTime}</span>
        </S.MetaRow>
      </S.TitleGroup>

      <S.NavButton
        type="button"
        onClick={onNextClick}
        disabled={!onNextClick}
        aria-label="다음 방명록"
      >
        <IcChevronRight width={20} height={20} />
      </S.NavButton>
    </S.Wrapper>
  );
};

export default GuestbookDetailHeader;
