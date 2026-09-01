import { useTheme } from "@emotion/react";
import { useGetPublicProfileSuspense } from "@/api/generated/host-호스트";
import { useGetPublicHostSpacesSuspense } from "@/api/generated/space-스페이스";
import type {
  ApiResponsePublicHostProfileResponse,
  ApiResponsePublicHostSpacesResponse,
  PublicHostSpaceItemResponse,
} from "@/api/model";
import IcLink from "@/assets/icons/ic_link.svg?react";
import Divider from "@/components/@common/Divider/Divider";
import GuestHeader from "@/components/@common/GuestHeader/GuestHeader";
import NavigationBar from "@/components/@common/NavigationBar/NavigationBar";
import ProfileImage from "@/components/@common/ProfileImage/ProfileImage";
import SpaceCard from "@/components/UI/SpaceCard/SpaceCard";
import { getImageUrl } from "@/utils/getImageUrl";
import * as S from "./GuestHostProfilePage.styles";

interface GuestHostProfilePageProps {
  /** 호스트 공개 코드 */
  hostCode: string;
  /** 뒤로가기 핸들러 */
  onBack: () => void;
  /** 스페이스 카드 클릭 핸들러 */
  onSpaceClick: (spaceCode: string) => void;
}

const GuestHostProfilePage = ({
  hostCode,
  onBack,
  onSpaceClick,
}: GuestHostProfilePageProps) => {
  const theme = useTheme();

  const { data: profile } = useGetPublicProfileSuspense(hostCode, {
    query: {
      select: (response) =>
        (response as unknown as ApiResponsePublicHostProfileResponse).data,
    },
  });
  const { data: spaces } = useGetPublicHostSpacesSuspense(hostCode, {
    query: {
      select: (response) =>
        (response as unknown as ApiResponsePublicHostSpacesResponse).data
          ?.spaces ?? [],
    },
  });

  const pictureUrl = profile?.photoPath ? getImageUrl(profile.photoPath) : "";
  const nickname = profile?.nickname ?? "";
  const introduction = profile?.introduction ?? "";
  const linkUrl = profile?.linkUrl ?? "";

  const validSpaces = spaces.filter(
    (space): space is PublicHostSpaceItemResponse & { spaceCode: string } =>
      space.spaceCode !== undefined,
  );

  return (
    <S.PageWrapper>
      <GuestHeader />
      <NavigationBar onBackClick={onBack} />
      <S.ScrollArea>
        <S.ProfileSection>
          <S.ProfileRow>
            <ProfileImage src={pictureUrl} size={40} />
            <S.NameRow>
              <S.Name>{nickname}</S.Name>
              <S.NameSuffix>작가님</S.NameSuffix>
            </S.NameRow>
          </S.ProfileRow>
          <S.IntroBlock>
            {introduction && <S.IntroText>{introduction}</S.IntroText>}
            {linkUrl && (
              <S.ContactLink
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="작가 보러가기"
              >
                <IcLink aria-hidden="true" />
                작가 보러가기
              </S.ContactLink>
            )}
          </S.IntroBlock>
        </S.ProfileSection>

        <Divider color={theme.colors.gray.gray600} height={12} />

        <S.SpaceListSection>
          <S.SectionTitle>작가님의 스페이스 목록</S.SectionTitle>
          <S.SpaceList>
            {validSpaces.map((space) => (
              <li key={space.spaceCode}>
                <SpaceCard
                  title={space.name ?? ""}
                  thumbnailUrl={
                    space.spacePhotoPath
                      ? getImageUrl(space.spacePhotoPath)
                      : undefined
                  }
                  onClick={() => onSpaceClick(space.spaceCode)}
                />
              </li>
            ))}
          </S.SpaceList>
        </S.SpaceListSection>
      </S.ScrollArea>
    </S.PageWrapper>
  );
};

export default GuestHostProfilePage;
