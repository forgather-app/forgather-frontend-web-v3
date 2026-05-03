import { useState } from "react";
import IcPhoto from "@/assets/icons/ic_photo.svg?react";
import IcScrap from "@/assets/icons/ic_scrap.svg?react";
import IcVerticalDots from "@/assets/icons/ic_vertical_dots.svg?react";
import IcSmallLogo from "@/assets/icons/logos/logo_small.svg?react";
import { theme } from "@/styles/theme";
import * as S from "./GuestCard.styles";

type GuestCardHeaderIconType = "scrap" | "menu";

interface GuestCardHeaderCommonType {
  iconType: GuestCardHeaderIconType;
}

interface ScrapHeader extends GuestCardHeaderCommonType {
  iconType: "scrap";
  isScrapped: boolean;
  toggleScrap: () => void;
}

interface MenuHeader extends GuestCardHeaderCommonType {
  iconType: "menu";
  onMenuClick: () => void;
}

type GuestCardHeaderType = ScrapHeader | MenuHeader;

interface GuestCardProps {
  /** 방명록 작성자 이름 */
  author: string;
  /** 방명록 내용 */
  text: string;
  /** 새로운 방명록 여부. true이면 뒷면에서 시작해 클릭 시 flip */
  isNew: boolean;
  /** 방명록 사진 존재 여부 */
  isPhotoExist?: boolean;
  /** 헤더 우측 아이콘 및 인터랙션 타입 */
  headerType?: GuestCardHeaderType;
}

const renderHeaderIcon = (headerType: GuestCardHeaderType): React.ReactNode => {
  switch (headerType.iconType) {
    case "scrap": {
      const { isScrapped, toggleScrap } = headerType;

      return (
        <S.IconButton
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleScrap();
          }}
        >
          <IcScrap
            width={24}
            height={24}
            color={
              isScrapped ? theme.colors.main.purple : theme.colors.gray.gray500
            }
          />
        </S.IconButton>
      );
    }
    case "menu": {
      const { onMenuClick } = headerType;
      // TODO: 메뉴 UI 삽입
      return (
        <button type="button" onClick={onMenuClick}>
          <IcVerticalDots
            width={24}
            height={24}
            color={theme.colors.gray.white}
          />
        </button>
      );
    }
  }
};

const GuestCard = ({
  author,
  text,
  isNew,
  isPhotoExist,
  headerType,
}: GuestCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const frontFace = (
    <S.Front $isFlip={isNew} role="button" aria-label={`${author} 님의 방명록`}>
      <S.CardHeader>
        <span>{isPhotoExist && <IcPhoto />}</span>
        {headerType && renderHeaderIcon(headerType)}
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
            role="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsFlipped(true);
            }}
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
