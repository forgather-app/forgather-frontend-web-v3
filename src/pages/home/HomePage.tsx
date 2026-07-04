import { useState } from "react";
import IcSpace from "@/assets/icons/ic_space.svg?react";
import BottomTabBar from "@/components/@common/BottomTabBar/BottomTabBar";
import SpaceCard from "@/components/UI/SpaceCard/SpaceCard";
import CurrentSpaceSection from "./components/currentSpaceSection/CurrentSpaceSection";
import HomeEmptyView from "./components/homeEmptyView/HomeEmptyView";
import * as S from "./HomePage.styles";
import { MOCK_CURRENT_SPACES, MOCK_SPACES } from "./mock";

const HomePage = () => {
  const [activeNavTab, setActiveNavTab] = useState<"홈" | "방명록" | "마이">(
    "홈",
  );
  const [spaces, setSpaces] = useState(MOCK_SPACES);

  const handlePinClick = (spaceId: number) => {
    setSpaces((prev) =>
      prev.map((space) =>
        space.id === spaceId ? { ...space, isPinned: !space.isPinned } : space,
      ),
    );
  };

  return (
    <S.HomePageContainer>
      <S.PageWrapper>
        <S.Header>
          <S.UserGreeting>
            <S.UserAvatar aria-hidden />
            <S.UserTextWrapper>
              <S.UserName>김여름</S.UserName>
              <S.GreetingText>작가님, 안녕하세요</S.GreetingText>
            </S.UserTextWrapper>
          </S.UserGreeting>
        </S.Header>

        <S.ContentWrapper>
          {spaces.length === 0 && MOCK_CURRENT_SPACES.length === 0 ? (
            <HomeEmptyView />
          ) : (
            <>
              {MOCK_CURRENT_SPACES.length > 0 && (
                <CurrentSpaceSection spaces={MOCK_CURRENT_SPACES} />
              )}

              <S.ContentHeader>
                <S.SpaceCount>{spaces.length}개</S.SpaceCount>
                <S.SpaceCountText>의 스페이스</S.SpaceCountText>
              </S.ContentHeader>

              <S.SpaceList>
                {spaces.map((space) => (
                  <SpaceCard
                    key={space.id}
                    title={space.title}
                    exhibitionName={space.exhibitionName}
                    guestCount={space.guestCount}
                    backgroundImageUrl={space.backgroundImageUrl}
                    isPinned={space.isPinned}
                    onClick={() => {}}
                    onPinClick={() => handlePinClick(space.id)}
                  />
                ))}
              </S.SpaceList>
            </>
          )}
        </S.ContentWrapper>
      </S.PageWrapper>

      <S.BottomSection>
        <S.CreateButtonContainer>
          <S.CreateButton type="button">
            <IcSpace width={24} height={24} />
            <S.CreateButtonText>스페이스 만들기</S.CreateButtonText>
          </S.CreateButton>
        </S.CreateButtonContainer>
        {/* TODO: 탭 클릭 시 해당 라우트(방명록, 마이 등)로 navigate 연결 필요 (현재는 활성 상태만 변경) */}
        <BottomTabBar activeTab={activeNavTab} onTabChange={setActiveNavTab} />
      </S.BottomSection>
    </S.HomePageContainer>
  );
};

export default HomePage;
