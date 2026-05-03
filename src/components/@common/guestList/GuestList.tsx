import IcBack from "@/assets/icons/ic_back.svg?react";
import IcPerson from "@/assets/icons/ic_person.svg?react";
import IcSmallLogo from "@/assets/icons/logos/logo_small.svg?react";
import * as S from "./GuestList.styles";

interface GuestListProps {
  /** 방명록 작성자 이름 */
  title: string;
  /** 새로 도착한 방명록 여부. true이면 오로라 효과 보더와 함께 방명록 알림 UI가 노출됩니다. */
  isNew?: boolean;
  /** 사진 첨부 여부. true이면 사진 아이콘을 표시합니다. */
  hasPhoto?: boolean;
  /** 방명록 카드를 클릭했을 때 실행되는 핸들러 */
  onClick: () => void;
}

const GuestList = ({
  title,
  isNew = false,
  hasPhoto = false,
}: GuestListProps) => {
  if (isNew) {
    return (
      <S.NewCard type="button" aria-label="새로 도착한 방명록">
        <S.NewCardContent>
          <IcSmallLogo />
          <S.NewCardText>새로 도착한 방명록</S.NewCardText>
        </S.NewCardContent>
      </S.NewCard>
    );
  }

  return (
    <S.Card type="button" aria-label={`${title} 님의 방명록`}>
      <S.TitleGroup>
        <S.TitleBold aria-hidden={true}>{title}</S.TitleBold>
        <S.TitleRegular aria-hidden={true}>님의 방명록</S.TitleRegular>
      </S.TitleGroup>
      <S.Actions>
        {hasPhoto && (
          <S.PhotoIconWrapper aria-hidden={true}>
            <IcPerson width={16} height={16} />
          </S.PhotoIconWrapper>
        )}
        <S.ChevronWrapper aria-hidden={true}>
          <IcBack width={24} height={24} />
        </S.ChevronWrapper>
      </S.Actions>
    </S.Card>
  );
};

export default GuestList;
