import * as S from "./CurrentSpaceAddSlot.styles";

interface CurrentSpaceAddSlotProps {
  /** 빈 슬롯 클릭 핸들러 (스페이스 추가 플로우로 이동) */
  onClick?: () => void;
}

const CurrentSpaceAddSlot = ({ onClick }: CurrentSpaceAddSlotProps) => {
  return (
    <S.Slot type="button" onClick={onClick}>
      <S.IconWrapper aria-hidden>
        <S.PlusIcon width={28.8} height={28.8} aria-hidden />
      </S.IconWrapper>
      <S.Text>진행 중인 스페이스 추가하기</S.Text>
    </S.Slot>
  );
};

export default CurrentSpaceAddSlot;
