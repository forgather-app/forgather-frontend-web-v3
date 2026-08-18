import { useBottomSheetClose } from "@/components/@common/BottomSheet/BottomSheetCloseContext";
import SpaceCard from "@/components/UI/SpaceCard/SpaceCard";
import * as S from "./ExistingSpaceSelectSheet.styles";

export interface ExistingSpaceOption {
  spaceCode: string;
  name: string;
  thumbnailUrl?: string;
  guestBookCardCount: number;
}

interface ExistingSpaceSelectSheetProps {
  /** 선택 가능한 스페이스 목록 (이미 진행중인 스페이스는 제외하고 전달) */
  spaces: ExistingSpaceOption[];
  /** 스페이스 선택 핸들러 */
  onSelect: (spaceCode: string) => void;
  /** 선택 요청이 진행 중인지 여부. true면 추가 선택을 막습니다. */
  isPending?: boolean;
}

const ExistingSpaceSelectSheet = ({
  spaces,
  onSelect,
  isPending = false,
}: ExistingSpaceSelectSheetProps) => {
  const closeSheet = useBottomSheetClose();

  const handleSelect = (spaceCode: string) => {
    if (isPending) return;
    onSelect(spaceCode);
  };

  return (
    <>
      <S.Header>
        <S.Title>{"진행 중인 스페이스를\n선택해주세요"}</S.Title>
        <S.CloseButton
          type="button"
          aria-label="닫기"
          onClick={closeSheet ?? undefined}
        >
          <S.CloseIcon width={24} height={24} aria-hidden />
        </S.CloseButton>
      </S.Header>
      <S.List>
        {spaces.length === 0 ? (
          <S.EmptyText>추가할 수 있는 스페이스가 없어요</S.EmptyText>
        ) : (
          spaces.map((space) => (
            <SpaceCard
              key={space.spaceCode}
              title={space.name}
              guestBookCount={space.guestBookCardCount}
              thumbnailUrl={space.thumbnailUrl}
              onClick={() => handleSelect(space.spaceCode)}
            />
          ))
        )}
      </S.List>
    </>
  );
};

export default ExistingSpaceSelectSheet;
