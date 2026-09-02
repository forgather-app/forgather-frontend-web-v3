import { useNavigate } from "@tanstack/react-router";
import { Lottie } from "lottie-react";
import spaceAnimation from "@/assets/animations/space.json";
import Button from "@/components/@common/Button/Button";
import * as S from "./SignUpCompletePage.styles";

const SignUpCompletePage = () => {
  const navigate = useNavigate();

  return (
    <S.Wrapper>
      <S.Content>
        <S.Subtitle>가입이 완료되었어요!</S.Subtitle>
        <S.Title>
          첫번째 작품을 등록하고,
          <br />
          방명록을 받아보세요.
        </S.Title>
      </S.Content>

      <S.GraphicArea aria-hidden="true">
        <Lottie src={spaceAnimation} loop autoplay />
      </S.GraphicArea>

      <S.Footer>
        <Button
          text="스페이스 만들기"
          onClick={() => navigate({ to: "/create-space" })}
        />
        <S.SkipButton type="button" onClick={() => navigate({ to: "/home" })}>
          나중에 하기
        </S.SkipButton>
      </S.Footer>
    </S.Wrapper>
  );
};

export default SignUpCompletePage;
