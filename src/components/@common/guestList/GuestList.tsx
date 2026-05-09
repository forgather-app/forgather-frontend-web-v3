import IcBack from "@/assets/icons/ic_back.svg?react";
import IcPerson from "@/assets/icons/ic_person.svg?react";
import IcSmallLogo from "@/assets/icons/logos/logo_small.svg?react";
import * as S from "./GuestList.styles";

/** 새로 도착한 방명록. 오로라 효과 보더와 함께 알림 UI가 노출됩니다. */
interface NewGuestListProps {
  isNew: true;
}

/** 일반 방명록 카드 */
interface RegularGuestListProps {
  isNew?: false;
  /** 방명록 작성자 이름 */
  title: string;
  /** 사진 첨부 여부. true이면 사진 아이콘을 표시합니다. */
  hasPhoto?: boolean;
  /** 방명록 카드를 클릭했을 때 실행되는 핸들러 */
  onClick: () => void;
}

type GuestListProps = NewGuestListProps | RegularGuestListProps;

const GuestList = (props: GuestListProps) => {
  if (props.isNew) {
    return (
      <S.NewCard type="button" aria-label="새로 도착한 방명록">
        <S.NewCardContent>
          <IcSmallLogo />
          <S.NewCardText>새로 도착한 방명록</S.NewCardText>
        </S.NewCardContent>
      </S.NewCard>
    );
  }

  const { title, hasPhoto = false, onClick } = props;

  return (
    <S.Card type="button" aria-label={`${title} 님의 방명록`} onClick={onClick}>
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
