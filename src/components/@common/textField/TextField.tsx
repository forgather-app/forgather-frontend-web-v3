import { useId, useState } from "react";
import clearIcon from "../../../assets/icons/ic_clear.svg";
import linkIcon from "../../../assets/icons/ic_link.svg";
import searchIcon from "../../../assets/icons/ic_search.svg";
import { getGraphemeLength } from "../../../utils/getGraphemeLength";
import * as S from "./TextField.styles";

export type TextFieldVariant = "default" | "search" | "link" | "count";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * 컴포넌트 변형
   * - `default`: 기본 텍스트 입력 (아이콘 없음)
   * - `search`: 돋보기 아이콘 + 포커스 시 clear 버튼
   * - `link`: 링크 아이콘 + clear 버튼 + 에러 메시지 지원
   * - `count`: 글자 수 카운터 + 에러 메시지 지원 (rounded box 스타일)
   */
  variant?: TextFieldVariant;
  /** clear 버튼 클릭 시 호출. 미지정 시 onChange("")로 값을 비움 */
  onClear?: () => void;
  /** 에러 메시지 — link, count variant에서 에러 상태로 표시됨 */
  errorMessage?: string;
  /** 최대 글자 수 — count variant에서 사용. 설정 시 `{현재} / {maxCount}자` 카운터 표시 */
  maxCount?: number;
}

const DEFAULT_PLACEHOLDER: Record<TextFieldVariant, string> = {
  default: "",
  search: "장소를 검색해주세요",
  link: "링크를 입력해주세요",
  count: "",
};

const TextField = ({
  value,
  onChange,
  variant = "default",
  onClear,
  errorMessage,
  maxCount,
  placeholder,
  onFocus,
  onBlur,
  ...rest
}: TextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const errorId = useId();

  const hasValue = !!value;
  const hasError =
    (variant === "link" || variant === "count") && !!errorMessage;

  const graphemeCount =
    variant === "count" ? getGraphemeLength(String(value ?? "")) : 0;

  const showClear =
    variant === "search"
      ? hasValue && isFocused
      : variant === "link"
        ? hasValue
        : false;

  const handleClear = () => {
    if (onClear) onClear();
    else
      onChange?.({
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <S.Wrapper>
      <S.FieldRow
        $variant={variant}
        $hasValue={hasValue}
        $hasError={hasError}
        $isFocused={isFocused}
      >
        {variant === "search" && (
          <S.LeadingIcon
            src={searchIcon}
            alt=""
            aria-hidden
            width={20}
            height={20}
          />
        )}
        {variant === "link" && (
          <S.LeadingIcon
            src={linkIcon}
            alt=""
            aria-hidden
            width={16}
            height={16}
          />
        )}
        <S.Input
          {...rest}
          $variant={variant}
          type={variant === "search" ? "search" : "text"}
          value={value}
          placeholder={placeholder ?? DEFAULT_PLACEHOLDER[variant]}
          onChange={onChange}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
        />
        {showClear && (
          <S.ClearButton
            type="button"
            aria-label="입력 내용 지우기"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleClear}
          >
            <img src={clearIcon} alt="" aria-hidden width={20} height={20} />
          </S.ClearButton>
        )}
        {variant === "count" && maxCount !== undefined && (
          <S.CounterBox>
            <S.Counter $isFocused={isFocused}>
              {graphemeCount} / {maxCount}자
            </S.Counter>
            {hasError && (
              <S.ErrorMessage id={errorId} role="alert">
                {errorMessage}
              </S.ErrorMessage>
            )}
          </S.CounterBox>
        )}
      </S.FieldRow>
      {variant === "link" && hasError && (
        <S.ErrorMessage id={errorId} role="alert">
          {errorMessage}
        </S.ErrorMessage>
      )}
    </S.Wrapper>
  );
};

export default TextField;
