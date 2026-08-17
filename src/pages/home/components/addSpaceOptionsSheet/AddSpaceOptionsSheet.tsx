import ExistingSpaceIllustration from "@/assets/images/add_space_existing.svg?react";
import NewSpaceIllustration from "@/assets/images/add_space_new.svg?react";
import { useBottomSheetClose } from "@/components/@common/BottomSheet/BottomSheetCloseContext";
import * as S from "./AddSpaceOptionsSheet.styles";

interface AddSpaceOptionsSheetProps {
  /** '새 스페이스' 선택 핸들러 */
  onSelectNew?: () => void;
  /** '기존 스페이스' 선택 핸들러 */
  onSelectExisting?: () => void;
}

const AddSpaceOptionsSheet = ({
  onSelectNew,
  onSelectExisting,
}: AddSpaceOptionsSheetProps) => {
  const closeSheet = useBottomSheetClose();

  return (
    <>
      <S.Header>
        <S.Title>어떤 스페이스를 등록할까요?</S.Title>
        <S.CloseButton
          type="button"
          aria-label="닫기"
          onClick={closeSheet ?? undefined}
        >
          <S.CloseIcon width={24} height={24} aria-hidden />
        </S.CloseButton>
      </S.Header>
      <S.OptionRow>
        <S.OptionCard type="button" onClick={onSelectNew}>
          <NewSpaceIllustration width={80} height={80} aria-hidden />
          <S.OptionTitle>새 스페이스</S.OptionTitle>
          <S.OptionDescription>새 스페이스를 만들어요</S.OptionDescription>
        </S.OptionCard>
        <S.OptionCard type="button" onClick={onSelectExisting}>
          <ExistingSpaceIllustration width={80} height={80} aria-hidden />
          <S.OptionTitle>기존 스페이스</S.OptionTitle>
          <S.OptionDescription>기존 목록에서 선택해요</S.OptionDescription>
        </S.OptionCard>
      </S.OptionRow>
    </>
  );
};

export default AddSpaceOptionsSheet;
