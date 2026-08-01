import IcSmallLogo from "@/assets/icons/logos/logo_small.svg?react";
import * as S from "./GuestListStack.styles";

interface GuestListStackProps {
  /** 새로 도착한 방명록 개수. 2개 이상이면 카드가 겹쳐진 스택 형태로 표시됩니다. */
  count?: number;
  /** 새 방명록 스택 클릭 핸들러 */
  onClick?: () => void;
}

const MAX_PEEK_LAYERS = 2;

const GuestListStack = ({ count = 1, onClick }: GuestListStackProps) => {
  const peekLayerCount = Math.min(Math.max(count - 1, 0), MAX_PEEK_LAYERS);

  return (
    <S.Wrapper>
      {/* 뒤쪽(깊은) 레이어부터 렌더링해 앞쪽 레이어와 Container가 그 위에 겹치도록 함 */}
      {Array.from({ length: peekLayerCount }, (_, index) => (
        <S.PeekLayer
          // biome-ignore lint/suspicious/noArrayIndexKey: 고정된 개수의 장식용 레이어라 index만 사용 가능함
          key={index}
          $depth={peekLayerCount - index}
          aria-hidden
        />
      ))}
      <S.Container
        type="button"
        onClick={onClick}
        aria-label="새로 도착한 방명록 — 클릭하여 열기"
      >
        <IcSmallLogo width={40} height={40} aria-hidden />
        <S.Label aria-hidden>새로 도착한 방명록</S.Label>
      </S.Container>
    </S.Wrapper>
  );
};

export default GuestListStack;
