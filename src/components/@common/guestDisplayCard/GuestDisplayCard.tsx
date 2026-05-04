import { useState } from "react";
import IcScrap from "@/assets/icons/ic_scrap.svg?react";
import IcVerticalDots from "@/assets/icons/ic_vertical_dots.svg?react";
import IcSmallLogo from "@/assets/icons/logos/logo_small.svg?react";
import { theme } from "@/styles/theme";
import { formatGuestDisplayDate } from "@/utils/date";
import * as S from "./GuestDisplayCard.styles";

interface CommonDisplayCardProps {
  /** 방명록 작성자 이름 */
  author: string;
  /** 방명록 내용 */
  text: string;
  /** 방명록 작성 일자 */
  createdAt: Date;
  /** 새로운 방명록 여부. true이면 뒷면에서 시작해 클릭 시 flip */
  isNew: boolean;
  /** 방명록 사진 배열 */
  photoSrcArray?: string[];
}

interface OwnerDisplayCardProps extends CommonDisplayCardProps {
  /** 유저 자신의 방명록일 경우 */
  displayType: "owner";
  isScrapped: boolean;
  toggleScrap: () => void;
  onMenuClick: () => void;
}

interface VisitorDisplayCardProps extends CommonDisplayCardProps {
  displayType: "visitor";
}

type GuestDisplayCardProps = OwnerDisplayCardProps | VisitorDisplayCardProps;

const GuestDisplayCard = ({
  author,
  text,
  createdAt,
  displayType,
  isNew,
  photoSrcArray,
}: GuestDisplayCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const formattedDate = formatGuestDisplayDate(createdAt);

  const contentFace = (
    <S.ContentFace
      $isFlip={isNew}
      role={isNew ? undefined : "article"}
      aria-label={`${author} 님의 방명록`}
    >
      {photoSrcArray && (
        <S.PhotoArea>
          <S.Photo src={photoSrcArray[0]} alt="방명록 사진" />
          {photoSrcArray.length - 1 > 0 && (
            <S.PhotoBadge aria-label={`사진 ${photoSrcArray.length}장`}>
              +{photoSrcArray.length - 1} 장
            </S.PhotoBadge>
          )}
        </S.PhotoArea>
      )}
      <S.ContentBody>
        <S.MetaSection>
          <S.HeaderRow>
            <S.AuthorName>{author}</S.AuthorName>
            {displayType === "owner" && (
              <S.IconGroup>
                <S.IconButton type="button" aria-label="스크랩">
                  <IcScrap
                    width={24}
                    height={24}
                    color={theme.colors.gray.gray500}
                  />
                </S.IconButton>
                <S.IconButton type="button" aria-label="메뉴">
                  <IcVerticalDots
                    width={20}
                    height={20}
                    color={theme.colors.gray.gray400}
                  />
                </S.IconButton>
              </S.IconGroup>
            )}
          </S.HeaderRow>
          <S.DateText>{formattedDate}</S.DateText>
        </S.MetaSection>
        <S.BodyText>{text}</S.BodyText>
      </S.ContentBody>
    </S.ContentFace>
  );

  if (isNew) {
    return (
      <S.Scene>
        <S.Inner $isFlipped={isFlipped}>
          {contentFace}
          <S.NewFace
            role="button"
            tabIndex={isFlipped ? -1 : 0}
            aria-label={`${author} 님의 새 방명록 — 클릭하여 열기`}
            onClick={() => setIsFlipped(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsFlipped(true);
              }
            }}
          >
            <S.NewBadge aria-hidden>NEW!</S.NewBadge>
            <S.LogoWrapper aria-hidden>
              <IcSmallLogo width={48} height={48} />
            </S.LogoWrapper>
            <S.AuthorSection aria-hidden>
              <S.AuthorRow>
                <S.TeaserAuthor>{author}</S.TeaserAuthor>
                <S.TeaserSuffix> 님의 방명록</S.TeaserSuffix>
              </S.AuthorRow>
              <S.DateText>{formattedDate}</S.DateText>
            </S.AuthorSection>
          </S.NewFace>
        </S.Inner>
      </S.Scene>
    );
  }

  return <S.Scene>{contentFace}</S.Scene>;
};

export default GuestDisplayCard;
