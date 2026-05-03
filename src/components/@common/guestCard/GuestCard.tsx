import { useState } from "react";
import IcPhoto from "@/assets/icons/ic_photo.svg?react";
import IcScrap from "@/assets/icons/ic_scrap.svg?react";
import IcVerticalDots from "@/assets/icons/ic_vertical_dots.svg?react";
import IcSmallLogo from "@/assets/icons/logos/logo_small.svg?react";
import { theme } from "@/styles/theme";
import * as S from "./GuestCard.styles";

type GuestCardHeaderIconType = "scrap" | "menu";

interface GuestCardProps {
  /** 방명록 작성자 이름 */
  author: string;
  /** 방명록 내용 */
  text: string;
  /** 새로운 방명록 여부. true이면 뒷면에서 시작해 클릭 시 flip */
  isNew: boolean;
  /** 방명록 사진 존재 여부 */
  isPhotoExist?: boolean;
  /** 헤더 우측 아이콘 타입 */
  iconType?: GuestCardHeaderIconType;
}

const renderHeaderIcon = (type: GuestCardHeaderIconType): React.ReactNode => {
  switch (type) {
    case "scrap":
      return (
        <IcScrap width={24} height={24} color={theme.colors.gray.gray500} />
      );
    case "menu":
      return (
        <IcVerticalDots
          width={24}
          height={24}
          color={theme.colors.gray.white}
        />
      );
  }
};

const GuestCard = ({
  author,
  text,
  isNew,
  isPhotoExist,
  iconType,
}: GuestCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const frontFace = (
    <S.Front $isFlip={isNew}>
      <S.CardHeader>
        <span>{isPhotoExist && <IcPhoto />}</span>
        <span>{iconType && renderHeaderIcon(iconType)}</span>
      </S.CardHeader>
      <S.ContentArea>
        <S.Author>{author}</S.Author>
        <S.Text>{text}</S.Text>
      </S.ContentArea>
    </S.Front>
  );

  if (isNew) {
    return (
      <S.Scene>
        <S.Inner $isFlipped={isFlipped}>
          <S.Back
            type="button"
            onClick={() => setIsFlipped(true)}
            aria-label="새로 도착한 방명록 — 클릭하여 열기"
            tabIndex={isFlipped ? -1 : 0}
          >
            <S.LogoWrapper aria-hidden={true}>
              <IcSmallLogo width={64} height={64} />
            </S.LogoWrapper>
            <S.BackText aria-hidden={true}>새로 도착한 방명록</S.BackText>
          </S.Back>
          {frontFace}
        </S.Inner>
      </S.Scene>
    );
  }

  return <S.Scene>{frontFace}</S.Scene>;
};

export default GuestCard;
