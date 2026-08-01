import { useReducedMotion } from "framer-motion";
import IcSmallLogo from "@/assets/icons/logos/logo_small.svg?react";
import * as S from "./GuestListStack.styles";

interface GuestListStackProps {
  /** 새로 도착한 방명록 개수. 2개 이상이면 카드가 겹쳐진 스택 형태로 표시됩니다. */
  count?: number;
  /** 새 방명록 스택 클릭 핸들러 */
  onClick?: () => void;
}

// 뒤쪽(깊은) 레이어부터 나열 — 렌더 순서대로 쌓여 앞쪽 레이어와 Container가 위에 겹침
const PEEK_DEPTHS: S.PeekDepth[] = [2, 1];

const GuestListStack = ({ count = 1, onClick }: GuestListStackProps) => {
  const prefersReducedMotion = useReducedMotion();
  const peekLayerCount = Math.min(Math.max(count - 1, 0), PEEK_DEPTHS.length);
  const peekDepths = PEEK_DEPTHS.slice(PEEK_DEPTHS.length - peekLayerCount);

  return (
    <S.Wrapper>
      {peekDepths.map((depth) => {
        const { top, rotate } = S.peekLayerVariants[depth];

        return (
          <S.PeekLayer
            key={depth}
            $depth={depth}
            aria-hidden
            style={{ top, rotate, transformOrigin: "bottom center" }}
            animate={
              prefersReducedMotion
                ? undefined
                : { y: [0, -3, 0], scale: [1, 1.015, 1] }
            }
            transition={{
              duration: 3 + depth,
              delay: depth * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
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
