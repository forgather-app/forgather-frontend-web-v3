import { Controller } from "react-hook-form";
import IcCamera from "@/assets/icons/ic_camera.svg?react";
import Button from "@/components/@common/Button/Button";
import PhotoInput from "@/components/@common/photoInput/PhotoInput";
import TextArea from "@/components/@common/TextArea/TextArea";
import TextField from "@/components/@common/TextField/TextField";
import NavigationBarLayout from "@/components/layout/NavigationBarLayout/NavigationBarLayout";
import { CONSTRAINTS } from "@/constants/constraints";
import GuestBookConfirmModal from "./components/GuestBookConfirmModal/GuestBookConfirmModal";
import * as S from "./GuestBookWritePage.styles";
import { useGuestBookSubmit } from "./hooks/useGuestBookSubmit";
import { useGuestBookWriteForm } from "./hooks/useGuestBookWriteForm";

interface GuestBookWritePageProps {
  /** 방명록을 작성할 스페이스 코드 */
  spaceCode: string;
  /** 뒤로가기 핸들러 */
  onBack: () => void;
  /** 방명록 작성 성공 핸들러 */
  onSuccess: () => void;
}

const GuestBookWritePage = ({
  spaceCode,
  onBack,
  onSuccess,
}: GuestBookWritePageProps) => {
  const {
    control,
    nicknameRules,
    messageRules,
    nicknameError,
    messageError,
    isValid,
    photos,
    setPhotos,
    isConfirmOpen,
    confirmedValues,
    openConfirm,
    closeConfirm,
  } = useGuestBookWriteForm();
  const { submit, isSubmitting } = useGuestBookSubmit();

  const handleConfirm = () => {
    submit(
      {
        spaceCode,
        nickname: confirmedValues.nickname,
        message: confirmedValues.message,
        photos,
      },
      onSuccess,
    );
  };

  return (
    <NavigationBarLayout title="방명록 남기기" onBackClick={onBack}>
      <S.PageWrapper onSubmit={openConfirm} noValidate>
        <S.FieldsWrapper>
          <S.FieldGroup>
            <S.LabelRow>
              <S.FieldLabel>닉네임</S.FieldLabel>
              <S.RequiredDot aria-hidden="true" />
            </S.LabelRow>
            <Controller
              control={control}
              name="nickname"
              rules={nicknameRules}
              render={({ field }) => (
                <TextField
                  variant="count"
                  value={field.value}
                  maxCount={CONSTRAINTS.GUEST_BOOK_WRITE.NICKNAME_MAX_LENGTH}
                  placeholder="작가님께 전달될 닉네임을 입력해주세요."
                  errorMessage={nicknameError}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  aria-label="닉네임"
                />
              )}
            />
          </S.FieldGroup>

          <S.FieldGroup>
            <S.LabelRow>
              <S.FieldLabel>방명록</S.FieldLabel>
              <S.RequiredDot aria-hidden="true" />
            </S.LabelRow>
            <Controller
              control={control}
              name="message"
              rules={messageRules}
              render={({ field }) => (
                // TODO: 토큰 없음 - 디자인 높이 262px(라벨 포함, autoGrow) vs TextArea size="large" 고정 179px
                <TextArea
                  size="large"
                  value={field.value}
                  maxLength={CONSTRAINTS.GUEST_BOOK_WRITE.MESSAGE_MAX_LENGTH}
                  placeholder="작가님께 전달할 축하/응원/감상의 말을 입력해주세요."
                  errorMessage={messageError}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  aria-label="방명록"
                />
              )}
            />
          </S.FieldGroup>

          <S.FieldGroup>
            <S.PhotoLabel>
              사진(최대 {CONSTRAINTS.GUEST_BOOK_WRITE.MAX_PHOTO_COUNT}장)
            </S.PhotoLabel>
            <PhotoInput
              photos={photos}
              maxCount={CONSTRAINTS.GUEST_BOOK_WRITE.MAX_PHOTO_COUNT}
              onChange={setPhotos}
              icon={
                <IcCamera
                  aria-hidden="true"
                  width={24}
                  height={24}
                  fill="none"
                />
              }
              addButtonAriaLabel="사진 추가"
              listAriaLabel="첨부한 방명록 사진"
            />
          </S.FieldGroup>
        </S.FieldsWrapper>

        <S.Footer>
          <Button text="작성하기" type="submit" disabled={!isValid} />
        </S.Footer>
      </S.PageWrapper>
      <GuestBookConfirmModal
        isOpen={isConfirmOpen}
        onClose={closeConfirm}
        onConfirm={handleConfirm}
        isSubmitting={isSubmitting}
      />
    </NavigationBarLayout>
  );
};

export default GuestBookWritePage;
