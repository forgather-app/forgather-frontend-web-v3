import IcLeftArrow from "@/assets/icons/ic_left_arrow.svg?react";
import IcVerticalDots from "@/assets/icons/ic_vertical_dots.svg?react";
import { MOCK_ARTWORK_DETAIL } from "./ArtworkDetailPage.mock";
import * as S from "./ArtworkDetailPage.styles";

interface ArtworkDetailPageProps {
  /** 뒤로가기 핸들러 */
  onBack: () => void;
  /** 더보기(케밥) 메뉴 클릭 핸들러 */
  onMenuClick?: () => void;
}

const ArtworkDetailPage = ({ onBack, onMenuClick }: ArtworkDetailPageProps) => {
  const { title, artistName, description, imageUrl, video } =
    MOCK_ARTWORK_DETAIL;

  return (
    <S.ScrollArea>
      <S.Nav>
        <S.IconButton type="button" aria-label="뒤로 가기" onClick={onBack}>
          <IcLeftArrow width={24} height={24} />
        </S.IconButton>
        <S.IconButton
          type="button"
          aria-label="더보기 메뉴"
          onClick={onMenuClick}
        >
          <IcVerticalDots width={24} height={24} />
        </S.IconButton>
      </S.Nav>

      <S.Content>
        <S.TitleSection>
          <S.Title>{title}</S.Title>
          <S.Artist>{artistName}</S.Artist>
        </S.TitleSection>

        <S.DescriptionSection>
          <S.Description>{description}</S.Description>
          <S.ArtworkImage src={imageUrl} alt={title} />
        </S.DescriptionSection>

        <S.VideoSection>
          <S.SectionTitle>영상</S.SectionTitle>
          <S.VideoFrame>
            <S.VideoIframe
              src={`https://www.youtube.com/embed/${video.youtubeVideoId}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </S.VideoFrame>
        </S.VideoSection>
      </S.Content>
    </S.ScrollArea>
  );
};

export default ArtworkDetailPage;
