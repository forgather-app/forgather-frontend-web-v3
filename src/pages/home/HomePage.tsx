import { useNavigate } from "@tanstack/react-router";
import { useGetProfile } from "@/api/generated/host-호스트";
import { useGetSpacesInformation } from "@/api/generated/space-스페이스";
import type {
  ApiResponseHostProfileResponse,
  ApiResponseHostSpaceResponse,
  HostSpaceItemResponse,
} from "@/api/model";
import IcPerson from "@/assets/icons/ic_person.svg?react";
import Button from "@/components/@common/Button/Button";
import SpaceCard from "@/components/UI/SpaceCard/SpaceCard";
import { getImageUrl } from "@/utils/getImageUrl";
import CurrentSpaceSection from "./components/currentSpaceSection/CurrentSpaceSection";
import HomeCtaBanner from "./components/homeCtaBanner/HomeCtaBanner";
import HomeEmptyView from "./components/homeEmptyView/HomeEmptyView";
import * as S from "./HomePage.styles";

const getSpaceThumbnailUrl = (
  spacePhoto?: HostSpaceItemResponse["spacePhoto"],
) =>
  spacePhoto?.isExists && spacePhoto.path
    ? getImageUrl(spacePhoto.path)
    : undefined;

const HomePage = () => {
  const navigate = useNavigate();
  // TODO: MyPage/ProfileEditPage에서도 useGetProfile을 각자 호출 중 —
  // 소비처가 더 늘어나면 _authenticated 레이아웃에서 fetch해 Context로 내려주는 방식 고려
  const { data: profile } = useGetProfile({
    query: {
      select: (response) =>
        (response as unknown as ApiResponseHostProfileResponse).data,
    },
  });
  const {
    data: allSpaces,
    isPending,
    isError,
  } = useGetSpacesInformation({
    query: {
      select: (response) =>
        // TODO: 응답 content-type이 `*/*`로 내려와 orval이 실제 스키마 대신 Blob으로 추론함 — 백엔드가 application/json으로 명시하면 캐스팅 제거 가능
        (response as unknown as ApiResponseHostSpaceResponse).data?.spaces ??
        [],
    },
  });

  // TODO: 에러 UI 구현
  if (isError) {
    return;
  }

  const spaces = (allSpaces ?? []).filter(
    (space): space is HostSpaceItemResponse & { spaceCode: string } =>
      space.spaceCode !== undefined,
  );
  const currentSpace = spaces.find((space) => space.isFeatured);
  const isEmpty = !isPending && spaces.length === 0;

  return (
    <S.HomePageContainer>
      <S.PageWrapper>
        <S.Header>
          <S.UserProfile>
            {profile?.pictureUrl ? (
              <S.UserAvatarImage src={profile.pictureUrl} alt="" aria-hidden />
            ) : (
              <S.UserAvatar aria-hidden />
            )}
            <S.UserName>{profile?.nickname ?? ""}</S.UserName>
          </S.UserProfile>
          <S.HeaderActions>
            <S.IconButton
              type="button"
              aria-label="마이페이지"
              onClick={() => navigate({ to: "/my-page" })}
            >
              <IcPerson width={24} height={24} aria-hidden />
            </S.IconButton>
            <S.IconButton
              type="button"
              aria-label="스페이스 만들기"
              onClick={() => navigate({ to: "/create-space" })}
            >
              <S.PlusIcon width={24} height={24} aria-hidden />
            </S.IconButton>
          </S.HeaderActions>
        </S.Header>
        <S.ContentWrapper>
          {isPending ? (
            <>
              <S.CurrentSpaceSkeleton aria-hidden />
              <S.CurrentSpaceActionsSkeleton aria-hidden />
              <S.MySpaceSection $topGap={32}>
                <S.SectionTitle>나의 스페이스</S.SectionTitle>
                <S.SpaceList>
                  <S.SpaceCardSkeleton aria-hidden />
                  <S.SpaceCardSkeleton aria-hidden />
                  <S.SpaceCardSkeleton aria-hidden />
                </S.SpaceList>
              </S.MySpaceSection>
            </>
          ) : isEmpty ? (
            <HomeEmptyView />
          ) : (
            <>
              {currentSpace ? (
                <CurrentSpaceSection
                  spaceName={currentSpace.name ?? ""}
                  thumbnailUrl={getSpaceThumbnailUrl(currentSpace.spacePhoto)}
                  newGuestBookCount={currentSpace.unreadGuestBookCount}
                  onGuestBookClick={() =>
                    navigate({
                      to: "/spaces/$spaceId/guestbook",
                      params: { spaceId: currentSpace.spaceCode },
                    })
                  }
                  onArtworkManageClick={() =>
                    navigate({
                      to: "/spaces/$spaceId",
                      params: { spaceId: currentSpace.spaceCode },
                    })
                  }
                />
              ) : (
                <HomeCtaBanner
                  onClick={() => navigate({ to: "/create-space" })}
                />
              )}

              <S.MySpaceSection $topGap={currentSpace ? 32 : 24}>
                <S.SectionTitle>나의 스페이스</S.SectionTitle>
                <S.ListHeader>
                  <S.SpaceCountGroup>
                    <S.SpaceCount>{spaces.length}개</S.SpaceCount>
                    <S.SpaceCountText>의 스페이스</S.SpaceCountText>
                  </S.SpaceCountGroup>
                  <S.SortLabel>최신 순</S.SortLabel>
                </S.ListHeader>
                <S.SpaceList>
                  {spaces.map((space) => (
                    <SpaceCard
                      key={space.spaceCode}
                      title={space.name ?? ""}
                      guestBookCount={space.guestBookCardCount ?? 0}
                      thumbnailUrl={getSpaceThumbnailUrl(space.spacePhoto)}
                      onClick={() =>
                        navigate({
                          to: "/spaces/$spaceId",
                          params: { spaceId: space.spaceCode },
                        })
                      }
                    />
                  ))}
                </S.SpaceList>
              </S.MySpaceSection>
            </>
          )}
        </S.ContentWrapper>
      </S.PageWrapper>

      {isEmpty && (
        <S.BottomCta>
          <Button
            variant="primary"
            text="스페이스 만들기"
            onClick={() => navigate({ to: "/create-space" })}
          />
        </S.BottomCta>
      )}
    </S.HomePageContainer>
  );
};

export default HomePage;
