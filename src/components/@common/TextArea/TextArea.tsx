import { useId } from "react";
import { getGraphemeLength } from "../../../utils/getGraphemeLength";
import * as S from "./TextArea.styles";

interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  /** 높이 크기 (medium: 높이 auto, large: 높이 179px 고정) */
  size?: "medium" | "large";
  /** 최대 입력 가능 글자 수 (Counter 표시용) */
  maxLength?: number;
  /** 에러 메시지 (설정 시 에러 상태로 표시) */
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
  const hasError = !!errorMessage;
  const currentLength = getGraphemeLength(String(value));

  return (
    <S.Wrapper $hasError={hasError} $size={size}>
      <S.Textarea
        {...rest}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
      />
      <S.BottomRow $hasError={hasError}>
        {hasError && (
          <S.ErrorMessage id={errorId} role="alert">
            {errorMessage}
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
