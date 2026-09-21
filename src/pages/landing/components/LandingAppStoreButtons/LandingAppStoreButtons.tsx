import * as S from "./LandingAppStoreButtons.styles";

const LandingAppStoreButtons = () => {
  return (
    <S.AppButtonGroup>
      <S.AppStoreButton type="button" disabled aria-disabled="true">
        APP STORE 다운로드
      </S.AppStoreButton>
      <S.PlayStoreButton type="button" disabled aria-disabled="true">
        PLAY STORE 출시 예정
      </S.PlayStoreButton>
    </S.AppButtonGroup>
  );
};

export default LandingAppStoreButtons;
