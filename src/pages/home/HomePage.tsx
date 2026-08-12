import { useNavigate } from "@tanstack/react-router";
import IcPerson from "@/assets/icons/ic_person.svg?react";
import Button from "@/components/@common/Button/Button";
import SpaceCard from "@/components/UI/SpaceCard/SpaceCard";
import CurrentSpaceSection from "./components/currentSpaceSection/CurrentSpaceSection";
import HomeCtaBanner from "./components/homeCtaBanner/HomeCtaBanner";
import HomeEmptyView from "./components/homeEmptyView/HomeEmptyView";
import * as S from "./HomePage.styles";
import { MOCK_CURRENT_SPACES, MOCK_SPACES } from "./mock";

// TODO: 방명록 상세 페이지 확인용 개발 진입 버튼 전용 테스트 값 — 실제 스페이스/카드 목록 연동 후 제거
const DEV_TEST_SPACE_ID = "o6shou1fvq";
const DEV_TEST_GUESTBOOK_CARD_ID = "2";
// TODO: 작품 상세 페이지 확인용 개발 진입 버튼 전용 테스트 값 — 실제 작품 목록 클릭 진입 플로우 연동 후 제거
const DEV_TEST_ARTWORK_ID = "1";

const HomePage = () => {
  const navigate = useNavigate();
  const spaces = MOCK_SPACES;
  const currentSpace = MOCK_CURRENT_SPACES[0];
  const isEmpty = spaces.length === 0 && !currentSpace;

  return (
    <S.HomePageContainer>
      <S.PageWrapper>
        <S.Header>
          <S.UserProfile>
            <S.UserAvatar aria-hidden />
            <S.UserName>김여름</S.UserName>
          </S.UserProfile>
          <S.HeaderActions>
            {/* TODO: 마이페이지 라우트 연결 필요 */}
            <S.IconButton type="button" aria-label="마이페이지">
              <IcPerson width={24} height={24} aria-hidden />
            </S.IconButton>
            {/* TODO: 스페이스 만들기 라우트 연결 필요 */}
            <S.IconButton type="button" aria-label="스페이스 만들기">
              <S.PlusIcon width={24} height={24} aria-hidden />
            </S.IconButton>
          </S.HeaderActions>
        </S.Header>

        {/* TODO: 방명록 상세 페이지 확인용 임시 진입점 — 실제 카드 클릭 진입 플로우 연동 후 제거 */}
        <Button
          variant="underlined"
          text="방명록 상세 보기 (dev)"
          onClick={() =>
            navigate({
              to: "/spaces/$spaceId/guestbook/$guestbookId",
              params: {
                spaceId: DEV_TEST_SPACE_ID,
                guestbookId: DEV_TEST_GUESTBOOK_CARD_ID,
              },
            })
          }
        />

        {/* TODO: 작품 상세 페이지 확인용 임시 진입점 — 실제 작품 카드 클릭 진입 플로우 연동 후 제거 */}
        <Button
          variant="underlined"
          text="작품 상세 보기 (dev)"
          onClick={() =>
            navigate({
              to: "/artworks/$artworkId",
              params: { artworkId: DEV_TEST_ARTWORK_ID },
            })
          }
        />

        <S.ContentWrapper>
          {isEmpty ? (
            <HomeEmptyView />
          ) : (
            <>
              {currentSpace ? (
                <CurrentSpaceSection
                  spaceName={currentSpace.spaceName}
                  thumbnailUrl={currentSpace.thumbnailUrl}
                  newGuestBookCount={currentSpace.newGuestBookCount}
                  onGuestBookClick={() =>
                    navigate({
                      to: "/spaces/$spaceId/guestbook",
                      params: { spaceId: String(currentSpace.id) },
                    })
                  }
                  onArtworkManageClick={() =>
                    navigate({
                      to: "/spaces/$spaceId",
                      params: { spaceId: String(currentSpace.id) },
                    })
                  }
                />
              ) : (
                /* TODO: 스페이스 추가 플로우 연결 필요 */
                <HomeCtaBanner />
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
                      key={space.id}
                      title={space.title}
                      guestBookCount={space.guestBookCount}
                      thumbnailUrl={space.thumbnailUrl}
                      onClick={() =>
                        navigate({
                          to: "/spaces/$spaceId",
                          params: { spaceId: String(space.id) },
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
          {/* TODO: 스페이스 만들기 라우트 연결 필요 */}
          <Button variant="primary" text="스페이스 만들기" />
        </S.BottomCta>
      )}
    </S.HomePageContainer>
  );
};

export default HomePage;
