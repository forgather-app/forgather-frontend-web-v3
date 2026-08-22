import IcClear from "@/assets/icons/ic_clear.svg?react";
import IcLink from "@/assets/icons/ic_link.svg?react";
import { SPACE_LINK_URL_PREFIX } from "@/pages/createSpace/utils/createSpaceValidation";
import * as S from "./LinkUrlField.styles";

interface LinkUrlFieldProps {
  /** 프로토콜(https://)을 제외한 나머지 URL 값 */
  value: string;
  /** 값 변경 시 호출. 프로토콜을 제외한 값을 전달함 */
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  /** 에러 메시지 — 있으면 에러 상태(빨간 밑줄 + 하단 메시지)로 표시됨 */
  errorMessage?: string;
  "aria-label"?: string;
}

/** 스페이스 링크 URL 입력 필드. "https://" prefix가 항상 고정으로 노출되며 삭제할 수 없음 */
const LinkUrlField = ({
  value,
  onChange,
  onBlur,
  placeholder,
  errorMessage,
  ...rest
}: LinkUrlFieldProps) => {
  const hasError = !!errorMessage;
  const hasValue = !!value;

  return (
    <S.Wrapper>
      <S.FieldRow $hasError={hasError}>
        <IcLink aria-hidden width={16} height={16} />
        <S.Prefix aria-hidden="true">{SPACE_LINK_URL_PREFIX}</S.Prefix>
        <S.Input
          {...rest}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={hasError || undefined}
        />
        {hasValue && (
          <S.ClearButton
            type="button"
            aria-label="입력 내용 지우기"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onChange("")}
          >
            <IcClear aria-hidden width={20} height={20} />
          </S.ClearButton>
        )}
      </S.FieldRow>
      {hasError && <S.ErrorMessage role="alert">{errorMessage}</S.ErrorMessage>}
    </S.Wrapper>
  );
};

export default LinkUrlField;
