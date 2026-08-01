import IcChevronRight from "@/assets/icons/ic_chevron_right.svg?react";
import BannerIllustration from "@/assets/images/home_cta_banner.svg?react";
import * as S from "./HomeCtaBanner.styles";

interface HomeCtaBannerProps {
  /** 배너 클릭 핸들러 */
  onClick?: () => void;
}

const HomeCtaBanner = ({ onClick }: HomeCtaBannerProps) => {
  return (
    <S.Banner type="button" onClick={onClick}>
      <S.LeftGroup>
        <BannerIllustration width={41} height={41} aria-hidden />
        <S.TextGroup>
          <S.Title>진행 중인 스페이스 추가하기</S.Title>
          <S.Description>
            방명록과 작품을 더 빠르게 관리해 보세요!
          </S.Description>
        </S.TextGroup>
      </S.LeftGroup>
      <IcChevronRight width={28} height={28} aria-hidden />
    </S.Banner>
  );
};

export default HomeCtaBanner;
