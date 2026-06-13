import IcDown from "@/assets/icons/ic_down.svg?react";
import * as S from "./PickerField.styles";

interface PickerFieldProps {
  /** 선택된 값. 없으면 placeholder 표시 */
  value?: string;
  /** placeholder 텍스트 */
  placeholder?: string;
  /** 클릭 핸들러 (picker 열기 등) */
  onClick?: () => void;
}

const PickerField = ({
  value,
  placeholder = "선택해주세요",
  onClick,
}: PickerFieldProps) => {
  const hasValue = !!value;

  return (
    <S.Trigger
      type="button"
      $hasValue={hasValue}
      onClick={onClick}
      aria-haspopup="listbox"
    >
      <S.Label $hasValue={hasValue}>{value || placeholder}</S.Label>
      <S.IconArea $hasValue={hasValue}>
        <IcDown width={28} height={28} />
      </S.IconArea>
    </S.Trigger>
  );
};

export default PickerField;
