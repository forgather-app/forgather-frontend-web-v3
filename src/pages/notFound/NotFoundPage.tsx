import { useNavigate, useRouter } from "@tanstack/react-router";
import NotFoundCharacter from "@/assets/images/not_found_character.svg?react";
import NotFoundSpeechBubble from "@/assets/images/not_found_speech_bubble.svg?react";
import { isGuestFlow } from "@/utils/isGuestFlow";
import * as S from "./NotFoundPage.styles";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const router = useRouter();

  // NOTE: 게스트 flow(_appOnly 밖)에서 "/"로 보내면 _appOnly/_authenticated의 인증
  // 가드에 걸려 로그인 리다이렉트로 빠진다 — 안전한 /landing으로 대신 보낸다.
  const handleBack = () => {
    navigate({ to: isGuestFlow(router.state.matches) ? "/landing" : "/" });
  };

  return (
    <S.Wrapper>
      <S.Content>
        <S.IllustrationWrapper aria-hidden="true">
          <S.Character>
            <NotFoundCharacter />
          </S.Character>
          <S.BubbleTopRight>
            <NotFoundSpeechBubble />
          </S.BubbleTopRight>
          <S.BubbleLeft>
            <NotFoundSpeechBubble />
          </S.BubbleLeft>
        </S.IllustrationWrapper>
        <S.TextGroup>
          <S.Title>오류가 발생했어요</S.Title>
          <S.Description>
            이미 삭제됐거나 존재하지 않는 페이지입니다
          </S.Description>
        </S.TextGroup>
      </S.Content>
      <S.BackButton type="button" onClick={handleBack}>
        돌아가기
      </S.BackButton>
    </S.Wrapper>
  );
};

export default NotFoundPage;
