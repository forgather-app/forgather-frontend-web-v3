import { useNavigate } from "@tanstack/react-router";
import { useGetProfileSuspense } from "@/api/generated/host-호스트";
import type { ApiResponseHostProfileResponse } from "@/api/model";
import IcChevronRight from "@/assets/icons/ic_chevron_right.svg?react";
import IcLink from "@/assets/icons/ic_link.svg?react";
import IcModify from "@/assets/icons/ic_modify.svg?react";
import LogoWordmark from "@/assets/icons/logos/logo_wordmark.svg?react";
import NavigationBarLayout from "@/components/layout/NavigationBarLayout/NavigationBarLayout";
import * as S from "./MyPage.styles";

// TODO: 버전 관리 방식 확정 시 대체
const APP_VERSION = "v1.0.0";

const MyPage = () => {
  const navigate = useNavigate();
  const { data: profile } = useGetProfileSuspense({
    query: {
      select: (response) =>
        (response as unknown as ApiResponseHostProfileResponse).data,
    },
  });

  const pictureUrl = profile?.pictureUrl ?? "";
  const nickname = profile?.nickname ?? "";
  const introduction = profile?.introduction ?? "";
  const linkUrl = profile?.linkUrl ?? "";

  return (
    <NavigationBarLayout
      title="마이페이지"
      onBackClick={() => navigate({ to: ".." })}
      rightContent={<IcModify aria-hidden="true" />}
      rightAriaLabel="프로필 수정"
      onRightClick={() => navigate({ to: "/my-page/edit" })}
    >
      <S.ProfileSection>
        <S.ProfileRow>
          {pictureUrl ? (
            <S.AvatarImage src={pictureUrl} alt="" aria-hidden="true" />
          ) : (
            <S.Avatar aria-hidden="true" />
          )}
          <S.NameRow>
            <S.Name>{nickname}</S.Name>
            <S.NameSuffix>작가님</S.NameSuffix>
          </S.NameRow>
        </S.ProfileRow>
        <S.IntroBlock>
          <S.IntroText>{introduction}</S.IntroText>
          {linkUrl && (
            <S.ContactLink
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="링크 열기"
            >
              <IcLink aria-hidden="true" />
              {linkUrl}
            </S.ContactLink>
          )}
        </S.IntroBlock>
      </S.ProfileSection>

      <S.Divider aria-hidden="true" />

      <S.MenuList>
        <li>
          <S.MenuButton
            type="button"
            onClick={() => navigate({ to: "/my-page/terms" })}
          >
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
          <S.MenuButton
            type="button"
            onClick={() => {
              // TODO: 로그아웃 API 연동 시 연결
            }}
          >
            로그아웃
            <IcChevronRight aria-hidden="true" />
          </S.MenuButton>
        </li>
      </S.MenuList>

      <S.Footer>
        <S.FooterLinks>
          <S.InquiryButton
            type="button"
            onClick={() => {
              // TODO: 문의 채널 확정 시 연결
            }}
          >
            문의하기
          </S.InquiryButton>
          <S.WithdrawButton
            type="button"
            onClick={() => {
              // TODO: 탈퇴 플로우 확정 시 연결
            }}
          >
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
