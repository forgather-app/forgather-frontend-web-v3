import IcPhoto from "@/assets/icons/ic_photo.svg?react";
import IcScrap from "@/assets/icons/ic_scrap.svg?react";
import IcVerticalDots from "@/assets/icons/ic_vertical_dots.svg?react";
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
  /** 방명록 사진 존재 여부 */
  isPhotoExist?: boolean;
  /** 헤더 우측 아이콘 및 인터랙션 타입 */
  headerType?: GuestCardHeaderType;
  /** 카드 클릭 핸들러 */
  onClick?: () => void;
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
  isPhotoExist,
  headerType,
  onClick,
}: GuestCardProps) => {
  return (
    <S.Scene>
      <S.Front
        role="article"
        aria-label={`${author} 님의 방명록`}
        onClick={onClick}
        style={{ cursor: onClick ? "pointer" : "default" }}
      >
        <S.CardHeader>
          <span>{isPhotoExist && <IcPhoto />}</span>
          {headerType && renderHeaderIcon(headerType)}
        </S.CardHeader>
        <S.ContentArea>
          <S.Author>{author}</S.Author>
          <S.Text>{text}</S.Text>
        </S.ContentArea>
      </S.Front>
    </S.Scene>
  );
};

export default GuestCard;
