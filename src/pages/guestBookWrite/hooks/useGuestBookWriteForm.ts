import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  validateMessageMaxLength,
  validateMessageRequired,
  validateNicknameMaxLength,
  validateNicknameRequired,
} from "@/pages/guestBookWrite/validate/guestBookWriteValidation";

interface GuestBookWriteFormValues {
  nickname: string;
  message: string;
}

const nicknameRules = {
  validate: {
    required: validateNicknameRequired,
    maxLength: validateNicknameMaxLength,
  },
};

const messageRules = {
  validate: {
    required: validateMessageRequired,
    maxLength: validateMessageMaxLength,
  },
};

const INITIAL_VALUES: GuestBookWriteFormValues = { nickname: "", message: "" };

/** 방명록 작성 폼 상태(react-hook-form) + 사진 첨부 상태 + 확인 모달 열림 상태를 관리하는 훅 */
export const useGuestBookWriteForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
  } = useForm<GuestBookWriteFormValues>({
    mode: "onChange",
    defaultValues: INITIAL_VALUES,
  });

  const [photos, setPhotos] = useState<File[]>([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmedValues, setConfirmedValues] =
    useState<GuestBookWriteFormValues>(INITIAL_VALUES);

  // 필수값 미입력 에러는 blur로 터치된 이후에만 노출, 글자 수 초과 에러는 항상 즉시 노출
  const nicknameError =
    errors.nickname?.type === "required" && !touchedFields.nickname
      ? undefined
      : errors.nickname?.message;
  const messageError =
    errors.message?.type === "required" && !touchedFields.message
      ? undefined
      : errors.message?.message;

  const openConfirm = handleSubmit((values) => {
    setConfirmedValues(values);
    setIsConfirmOpen(true);
  });
  const closeConfirm = () => setIsConfirmOpen(false);

  return {
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
  };
};
