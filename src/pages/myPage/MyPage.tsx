import IcChevronRight from "@/assets/icons/ic_chevron_right_sm.svg?react";
import IcLink from "@/assets/icons/ic_link.svg?react";
import IcModify from "@/assets/icons/ic_modify.svg?react";
import LogoWordmark from "@/assets/icons/logos/logo_wordmark.svg?react";
import NavigationBarLayout from "@/components/layout/NavigationBarLayout/NavigationBarLayout";
import * as S from "./MyPage.styles";

interface MyPageProps {
  /** 뒤로가기 핸들러 */
  onBack: () => void;
  /** 프로필 수정 버튼 클릭 핸들러 */
  onEditProfile: () => void;
  /** 서비스 이용 약관 클릭 핸들러 */
  onTermsClick: () => void;
  /** 로그아웃 클릭 핸들러 */
  onLogout: () => void;
  /** 문의하기 클릭 핸들러 */
  onInquiryClick: () => void;
  /** 탈퇴하기 클릭 핸들러 */
  onWithdraw: () => void;
}

// TODO: API 연동 시 서버 상태로 대체
const DUMMY_PROFILE = {
  name: "김여름",
  intro: "안녕하세요.\n여름을 좋아하는 회화과 대학생, 김여름입니다.",
  contactUrl: "",
};

// TODO: 버전 관리 방식 확정 시 대체
const APP_VERSION = "v1.0.0";

const MyPage = ({
  onBack,
  onEditProfile,
  onTermsClick,
  onLogout,
  onInquiryClick,
  onWithdraw,
}: MyPageProps) => {
  return (
    <NavigationBarLayout
      title="마이페이지"
      onBackClick={onBack}
      rightIcon={<IcModify aria-hidden="true" />}
      rightIconAriaLabel="프로필 수정"
      onRightIconClick={onEditProfile}
    >
      <S.ProfileSection>
        <S.ProfileRow>
          <S.Avatar aria-hidden="true" />
          <S.NameRow>
            <S.Name>{DUMMY_PROFILE.name}</S.Name>
            <S.NameSuffix>작가님</S.NameSuffix>
          </S.NameRow>
        </S.ProfileRow>
        <S.IntroBlock>
          <S.IntroText>{DUMMY_PROFILE.intro}</S.IntroText>
          <S.ContactLink
            href={DUMMY_PROFILE.contactUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="연락처 링크 열기"
          >
            <IcLink aria-hidden="true" />
            contact
          </S.ContactLink>
        </S.IntroBlock>
      </S.ProfileSection>

      <S.Divider aria-hidden="true" />

      <S.MenuList>
        <li>
          <S.MenuButton type="button" onClick={onTermsClick}>
            서비스 이용 약관
            <IcChevronRight aria-hidden="true" />
          </S.MenuButton>
        </li>
        <li>
          <S.MenuRow>
            <span>앱 버전</span>
            <span>{APP_VERSION}</span>
          </S.MenuRow>
        </li>
        <li>
          <S.MenuButton type="button" onClick={onLogout}>
            로그아웃
            <IcChevronRight aria-hidden="true" />
          </S.MenuButton>
        </li>
      </S.MenuList>

      <S.Footer>
        <S.FooterLinks>
          <S.InquiryButton type="button" onClick={onInquiryClick}>
            문의하기
          </S.InquiryButton>
          <S.WithdrawButton type="button" onClick={onWithdraw}>
            탈퇴하기
          </S.WithdrawButton>
        </S.FooterLinks>
        <S.FooterInfo>
          <S.Copyright>© 2025 Forgather. All rights reserved.</S.Copyright>
          <LogoWordmark aria-hidden="true" />
        </S.FooterInfo>
      </S.Footer>
    </NavigationBarLayout>
  );
};

export default MyPage;
