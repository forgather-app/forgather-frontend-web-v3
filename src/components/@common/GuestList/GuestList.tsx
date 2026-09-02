import IcChevronRight from "@/assets/icons/ic_chevron_right.svg?react";
import IcPhoto from "@/assets/icons/ic_photo.svg?react";
import { formatCardDate, formatCardTime } from "@/utils/date";
import * as S from "./GuestList.styles";

interface GuestListProps {
  /** 방문객 닉네임 */
  nickname: string;
  /** 방명록 메시지 내용. 목록 API에 값이 없으면 생략됩니다. */
  message?: string;
  /** 방명록 작성 일시. 목록 API에 값이 없으면 생략됩니다. */
  createdAt?: Date;
  /** 사진 첨부 여부. true이면 닉네임 우측에 사진 아이콘을 표시합니다. */
  hasPhoto?: boolean;
  /** 카드(자세히보기) 클릭 핸들러 */
  onClick: () => void;
}

const GuestList = ({
  nickname,
  message,
  createdAt,
  hasPhoto = false,
  onClick,
}: GuestListProps) => {
  return (
    <S.Card
      type="button"
      aria-label={`${nickname} 님의 방명록 자세히보기`}
      onClick={onClick}
      $hasPhoto={hasPhoto}
    >
      <S.HeaderRow>
        <S.Nickname aria-hidden>{nickname}</S.Nickname>
        {hasPhoto && (
          <S.PhotoIconWrapper aria-hidden>
            <IcPhoto width={20} height={20} />
          </S.PhotoIconWrapper>
        )}
      </S.HeaderRow>
      <S.Body>
        {message && <S.Message aria-hidden>{message}</S.Message>}
        <S.MetaRow>
          <S.DateTimeGroup aria-hidden>
            {createdAt && (
              <>
                <span>{formatCardDate(createdAt)}</span>
                <span>{formatCardTime(createdAt)}</span>
              </>
            )}
          </S.DateTimeGroup>
          <S.DetailLink aria-hidden>
            자세히보기
            <S.ChevronWrapper>
              <IcChevronRight width={20} height={20} />
            </S.ChevronWrapper>
          </S.DetailLink>
        </S.MetaRow>
      </S.Body>
    </S.Card>
  );
};

export default GuestList;
