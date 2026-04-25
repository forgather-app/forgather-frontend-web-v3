import { useId } from "react";
import { getGraphemeLength } from "../../../utils/getGraphemeLength";
import * as S from "./TextArea.styles";

interface TextAreaProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "onChange" | "size" | "maxLength"
  > {
  /** 값 변경 핸들러 */
  onChange: (value: string) => void;
  /** 높이 크기 (medium: 높이 auto, large: 높이 179px 고정) */
  size?: "medium" | "large";
  /** 최대 입력 가능 글자 수 (초과 시 에러 표시) */
  maxLength?: number;
  /** 에러 메시지 (설정 시 에러 상태로 표시, maxLength 초과 에러보다 우선) */
  errorMessage?: string;
}

const TextArea = ({
  value = "",
  onChange,
  size = "large",
  placeholder = "내용을 입력해주세요",
  errorMessage,
  maxLength = 200,
  ...rest
}: TextAreaProps) => {
  const errorId = useId();

  const currentLength = getGraphemeLength(String(value));
  const isOverLimit = currentLength > maxLength;
  const activeError =
    errorMessage ??
    (isOverLimit ? `최대 ${maxLength}자까지 입력 가능합니다.` : undefined);
  const hasError = !!activeError;

  return (
    <S.Wrapper $hasError={hasError} $size={size}>
      <S.Textarea
        {...rest}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
      />
      <S.BottomRow $hasError={hasError}>
        {hasError && (
          <S.ErrorMessage id={errorId} role="alert">
            {activeError}
          </S.ErrorMessage>
        )}
        <S.Counter $hasError={hasError}>
          {currentLength} / {maxLength}자
        </S.Counter>
      </S.BottomRow>
    </S.Wrapper>
  );
};

export default TextArea;
