import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useGetProfile } from "@/api/generated/host-호스트";
import {
  getGetSpacesInformationQueryKey,
  useFeatureSpaces,
  useGetSpacesInformation,
} from "@/api/generated/space-스페이스";
import type {
  ApiResponseHostProfileResponse,
  ApiResponseHostSpaceResponse,
  HostSpaceItemResponse,
} from "@/api/model";
import IcPerson from "@/assets/icons/ic_person.svg?react";
import BottomSheet from "@/components/@common/BottomSheet/BottomSheet";
import Button from "@/components/@common/Button/Button";
import SpaceCard from "@/components/UI/SpaceCard/SpaceCard";
import { ERROR_MESSAGES } from "@/constants/error";
import useSnackBar from "@/hooks/@common/useSnackBar";
import { getImageUrl } from "@/utils/getImageUrl";
import AddSpaceOptionsSheet from "./components/addSpaceOptionsSheet/AddSpaceOptionsSheet";
import CurrentSpaceAddSlot from "./components/currentSpaceAddSlot/CurrentSpaceAddSlot";
import CurrentSpaceCarousel from "./components/currentSpaceCarousel/CurrentSpaceCarousel";
import CurrentSpaceSection from "./components/currentSpaceSection/CurrentSpaceSection";
import ExistingSpaceSelectSheet from "./components/existingSpaceSelectSheet/ExistingSpaceSelectSheet";
import HomeCtaBanner from "./components/homeCtaBanner/HomeCtaBanner";
import HomeEmptyView from "./components/homeEmptyView/HomeEmptyView";
import * as S from "./HomePage.styles";

type AddSpaceSheetStep = "options" | "existing" | null;

const getSpaceThumbnailUrl = (
  spacePhotoPath?: HostSpaceItemResponse["spacePhotoPath"],
) => (spacePhotoPath ? getImageUrl(spacePhotoPath) : undefined);

const HomePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showSnackBar } = useSnackBar();
  const [sheetStep, setSheetStep] = useState<AddSpaceSheetStep>(null);
  const { mutate: featureSpace, isPending: isFeaturing } = useFeatureSpaces();

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
  const currentSpaces = spaces.filter((space) => space.isFeatured);
  const isEmpty = !isPending && spaces.length === 0;
  const nonFeaturedSpaces = spaces
    .filter((space) => !space.isFeatured)
    .map((space) => ({
      spaceCode: space.spaceCode,
      name: space.name ?? "",
      thumbnailUrl: getSpaceThumbnailUrl(space.spacePhotoPath),
      guestBookCardCount: space.guestBookCardCount ?? 0,
    }));

  const handleAddSpaceClick = () => setSheetStep("options");

  const handleSelectExistingSpace = (spaceCode: string) => {
    featureSpace(
      { data: { spaceCodes: [spaceCode] } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getGetSpacesInformationQueryKey(),
          });
          setSheetStep(null);
          showSnackBar("진행 중인 스페이스로 등록했어요", "alert");
        },
        onError: () => {
          showSnackBar(ERROR_MESSAGES.SPACE_FEATURE_FAILED, "error");
        },
      },
    );
  };

  return (
    <S.HomePageContainer>
      <S.PageWrapper>
        <S.Header>
          <S.UserProfile>
            {profile?.photoPath ? (
              <S.UserAvatarImage
                src={getImageUrl(profile.photoPath)}
                alt=""
                aria-hidden
              />
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
              {currentSpaces.length > 0 ? (
                <CurrentSpaceCarousel>
                  {currentSpaces.map((space) => (
                    <CurrentSpaceSection
                      key={space.spaceCode}
                      spaceName={space.name ?? ""}
                      thumbnailUrl={getSpaceThumbnailUrl(space.spacePhotoPath)}
                      newGuestBookCount={space.unreadGuestBookCount}
                      onGuestBookClick={() =>
                        navigate({
                          to: "/spaces/$spaceId/guestbook",
                          params: { spaceId: space.spaceCode },
                        })
                      }
                      onArtworkManageClick={() =>
                        navigate({
                          to: "/spaces/$spaceId",
                          params: { spaceId: space.spaceCode },
                        })
                      }
                    />
                  ))}
                  <CurrentSpaceAddSlot onClick={handleAddSpaceClick} />
                </CurrentSpaceCarousel>
              ) : (
                <HomeCtaBanner onClick={handleAddSpaceClick} />
              )}

              <S.MySpaceSection $topGap={currentSpaces.length > 0 ? 32 : 24}>
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
                      thumbnailUrl={getSpaceThumbnailUrl(space.spacePhotoPath)}
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

      {sheetStep && (
        <BottomSheet
          isOpen
          onClose={() => setSheetStep(null)}
          maxContentHeight={sheetStep === "existing" ? "85dvh" : undefined}
        >
          {sheetStep === "options" ? (
            <AddSpaceOptionsSheet
              onSelectNew={() => navigate({ to: "/create-space" })}
              onSelectExisting={() => setSheetStep("existing")}
            />
          ) : (
            <ExistingSpaceSelectSheet
              spaces={nonFeaturedSpaces}
              onSelect={handleSelectExistingSpace}
              isPending={isFeaturing}
            />
          )}
        </BottomSheet>
      )}
    </S.HomePageContainer>
  );
};

export default HomePage;
