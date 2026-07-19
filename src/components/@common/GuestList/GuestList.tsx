import IcBack from "@/assets/icons/ic_back.svg?react";
import IcPerson from "@/assets/icons/ic_person.svg?react";
import * as S from "./GuestList.styles";

interface GuestListProps {
  /** 방명록 작성자 이름 */
  title: string;
  /** 사진 첨부 여부. true이면 사진 아이콘을 표시합니다. */
  hasPhoto?: boolean;
  /** 방명록 카드를 클릭했을 때 실행되는 핸들러 */
  onClick: () => void;
}

const GuestList = ({ title, hasPhoto = false, onClick }: GuestListProps) => {
  return (
    <S.Card type="button" aria-label={`${title} 님의 방명록`} onClick={onClick}>
      <S.TitleGroup>
        <S.TitleBold aria-hidden>{title}</S.TitleBold>
        <S.TitleRegular aria-hidden>님의 방명록</S.TitleRegular>
      </S.TitleGroup>
      <S.Actions>
        {hasPhoto && (
          <S.PhotoIconWrapper aria-hidden>
            <IcPerson width={16} height={16} />
          </S.PhotoIconWrapper>
        )}
        <S.ChevronWrapper aria-hidden>
          <IcBack width={24} height={24} />
        </S.ChevronWrapper>
      </S.Actions>
    </S.Card>
  );
};

export default GuestList;
