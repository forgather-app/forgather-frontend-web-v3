import inviteIllustration from "@/assets/images/landing/invite_illustration.png";
import { MobileBreak } from "@/pages/landing/Landing.shared.styles";
import * as S from "./LandingSlogan.styles";

const LandingSlogan = () => {
  return (
    <S.Wrapper>
      <S.TextGroup>
        <S.Eyebrow>작가와 방문객이 연결되는 공간</S.Eyebrow>
        <S.Heading>
          {"For every moment"}
          <MobileBreak />
          {" we gather!"}
        </S.Heading>
      </S.TextGroup>
      <S.IllustrationImage
        src={inviteIllustration}
        alt="스페이스 초대장 미리보기"
      />
    </S.Wrapper>
  );
};

export default LandingSlogan;
