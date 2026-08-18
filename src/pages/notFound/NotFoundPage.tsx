import { useNavigate } from "@tanstack/react-router";
import NotFoundCharacter from "@/assets/images/not_found_character.svg?react";
import NotFoundSpeechBubble from "@/assets/images/not_found_speech_bubble.svg?react";
import * as S from "./NotFoundPage.styles";

const NotFoundPage = () => {
  const navigate = useNavigate();

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
          <S.Description>잠시 후 다시 시도해주세요</S.Description>
        </S.TextGroup>
      </S.Content>
      <S.BackButton type="button" onClick={() => navigate({ to: "/" })}>
        돌아가기
      </S.BackButton>
    </S.Wrapper>
  );
};

export default NotFoundPage;
