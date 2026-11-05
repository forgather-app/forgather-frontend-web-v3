import { APP_STORE_URL, PLAY_STORE_URL } from "@/constants/appLinks";
import * as S from "./LandingAppStoreButtons.styles";

const LandingAppStoreButtons = () => {
  return (
    <S.AppButtonGroup>
      <S.AppStoreButton
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        APP STORE 다운로드
      </S.AppStoreButton>
      <S.PlayStoreButton
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        PLAY STORE 다운로드
      </S.PlayStoreButton>
    </S.AppButtonGroup>
  );
};

export default LandingAppStoreButtons;
