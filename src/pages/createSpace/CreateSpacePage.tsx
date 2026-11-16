import { type FormEvent, useLayoutEffect, useRef, useState } from "react";
import IcLock from "@/assets/icons/ic_lock.svg?react";
import Button from "@/components/@common/Button/Button";
import GuestBookWritingPolicyField from "@/components/@common/GuestBookWritingPolicyField/GuestBookWritingPolicyField";
import LocationInput from "@/components/@common/LocationInput/LocationInput";
import NavigationBar from "@/components/@common/NavigationBar/NavigationBar";
import PeriodInput from "@/components/@common/PeriodInput/PeriodInput";
import ProgressBar from "@/components/@common/ProgressBar/ProgressBar";
import TextArea from "@/components/@common/TextArea/TextArea";
import TextField from "@/components/@common/TextField/TextField";
import Toggle from "@/components/@common/Toggle/Toggle";
import { CONSTRAINTS } from "@/constants/constraints";
import * as S from "./CreateSpacePage.styles";
import { useCreateSpaceForm } from "./hooks/useCreateSpaceForm";

interface CreateSpacePageProps {
  /** 스페이스 생성 성공 시 호출되는 핸들러 (생성된 스페이스 코드 전달) */
  onSuccess: (spaceCode: string) => void;
}

const CreateSpacePage = ({ onSuccess }: CreateSpacePageProps) => {
  const {
    spaceName,
    description,
    linkUrl,
    linkName,
    exhibitionPeriod,
    exhibitionLocation,
    guestBookWritingPolicy,
    guestBookPrivate,
    exhibitionPeriodError,
    isExhibitionPeriodComplete,
    exhibitionLocationError,
    isSpaceNameValid,
    spaceNameError,
    descriptionError,
    linkNameError,
    linkUrlError,
    validateLinkUrl,
    validateIntroduction,
    isValid,
    isSubmitting,
    getSubmitHandler,
  } = useCreateSpaceForm();

  const [step, setStep] = useState<"introduction" | "exhibition">(
    "introduction",
  );
  const isIntroduction = step === "introduction";
  const previousStep = useRef(step);
  const mainRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const periodRef = useRef<HTMLDivElement>(null);
  const isHandlingSubmit = useRef(false);

  useLayoutEffect(() => {
    if (previousStep.current === step) return;
    previousStep.current = step;
    if (mainRef.current) mainRef.current.scrollTop = 0;
    titleRef.current?.focus({ preventScroll: true });
  }, [step]);

  const handleBack = () => {
    if (isIntroduction) {
      window.history.back();
    } else if (!isHandlingSubmit.current) {
      setStep("introduction");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isHandlingSubmit.current) return;
    isHandlingSubmit.current = true;

    try {
      if (isIntroduction) {
        if (await validateIntroduction()) setStep("exhibition");
        return;
      }

      await getSubmitHandler(onSuccess)();
    } finally {
      isHandlingSubmit.current = false;
    }
  };

  return (
    <S.Container onSubmit={handleSubmit} noValidate>
      <S.Navigation disabled={isSubmitting}>
        <NavigationBar title="새 스페이스" onBackClick={handleBack} />
      </S.Navigation>
      <S.Progress>
        <ProgressBar value={isIntroduction ? 50 : 100} />
      </S.Progress>
      <S.Main ref={mainRef}>
        <S.Title ref={titleRef} tabIndex={-1}>
          {isIntroduction
            ? "스페이스를 소개해주세요!"
            : "기간과 장소를 추가해주세요."}
        </S.Title>
        {isIntroduction ? (
          <>
            <S.FieldGroup>
              <S.FieldLabelRow>
                <S.Label>스페이스명</S.Label>
                <S.RequiredDot aria-hidden="true" />
              </S.FieldLabelRow>
              <TextField
                {...spaceName}
                variant="count"
                maxCount={CONSTRAINTS.CREATE_SPACE.NAME_MAX_LENGTH}
                placeholder="예) 2026 졸업전시, 나의 여름"
                errorMessage={spaceNameError}
                aria-label="스페이스명"
              />
            </S.FieldGroup>

            <S.FieldGroup>
              <S.FieldLabelRow>
                <S.Label>스페이스 소개</S.Label>
              </S.FieldLabelRow>
              <TextArea
                {...description}
                maxLength={CONSTRAINTS.CREATE_SPACE.DESCRIPTION_MAX_LENGTH}
                placeholder={
                  "전시 소개나 관람 안내를 자유롭게 적어주세요.\n운영 시간, 작가 상주 시간, 환영 인사도 좋아요."
                }
                errorMessage={descriptionError}
                aria-label="스페이스 소개"
              />
            </S.FieldGroup>

            <S.FieldGroup>
              <S.FieldLabelRow>
                <S.Label>링크</S.Label>
              </S.FieldLabelRow>
              <TextField
                {...linkUrl}
                variant="link"
                placeholder="전시와 관련된 링크를 첨부해주세요."
                errorMessage={linkUrlError}
                onBlur={(event) => {
                  linkUrl.onBlur();
                  validateLinkUrl(event.currentTarget.value);
                }}
                aria-label="링크 URL"
              />
              <TextField
                {...linkName}
                variant="count"
                maxCount={CONSTRAINTS.CREATE_SPACE.LINK_NAME_MAX_LENGTH}
                placeholder="링크 제목을 작성해주세요."
                errorMessage={linkNameError}
                aria-label="링크 제목"
              />
            </S.FieldGroup>
          </>
        ) : (
          <>
            <S.FieldGroup ref={periodRef}>
              <S.FieldLabelRow>
                <S.Label>전시 기간</S.Label>
              </S.FieldLabelRow>
              <PeriodInput
                errorMessage={exhibitionPeriodError}
                value={exhibitionPeriod.value}
                onChange={exhibitionPeriod.onChange}
                highlightToday={true}
              />
            </S.FieldGroup>

            <LocationInput
              value={exhibitionLocation.value}
              onChange={exhibitionLocation.onChange}
              onBlur={exhibitionLocation.onBlur}
              errorMessage={exhibitionLocationError}
            />

            <GuestBookWritingPolicyField
              value={guestBookWritingPolicy.value}
              onChange={(policy) => {
                guestBookWritingPolicy.onChange(policy);
                if (
                  policy === "EXHIBITION_PERIOD" &&
                  !isExhibitionPeriodComplete
                ) {
                  periodRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }
              }}
            />

            <S.FieldGroup>
              <S.FieldLabelRow>
                <S.Label>방명록 공개 설정</S.Label>
              </S.FieldLabelRow>
              <S.ToggleRow>
                <S.ToggleLabelGroup>
                  <IcLock aria-hidden="true" width={20} height={20} />
                  <S.ToggleLabel>방명록 나만 보기</S.ToggleLabel>
                </S.ToggleLabelGroup>
                <Toggle
                  checked={guestBookPrivate.value}
                  onChange={guestBookPrivate.onChange}
                  ariaLabel="방명록 나만 보기"
                />
              </S.ToggleRow>
            </S.FieldGroup>
          </>
        )}
      </S.Main>

      <S.Footer>
        <Button
          text={isIntroduction ? "다음" : "완료"}
          type="submit"
          disabled={
            isIntroduction ? !isSpaceNameValid : !isValid || isSubmitting
          }
          onClick={(event) => {
            // 다음을 누른 다중 클릭이 같은 버튼의 완료까지 실행하지 않도록 한다.
            if (!isIntroduction && event.detail > 1) event.preventDefault();
          }}
        />
      </S.Footer>
    </S.Container>
  );
};

export default CreateSpacePage;
