import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  validateSpaceDescriptionMaxLength,
  validateSpaceNameMaxLength,
  validateSpaceNameRequired,
} from "@/pages/createSpace/utils/createSpaceValidation";

export interface CreateSpaceFormData {
  /** 스페이스명 */
  spaceName: string;
  /** 스페이스 소개 */
  description: string;
  /** 방명록 나만 보기 여부 */
  isGuestBookPrivate: boolean;
}

interface CreateSpaceFormValues {
  spaceName: string;
  description: string;
}

const spaceNameRules = {
  validate: {
    required: validateSpaceNameRequired,
    maxLength: validateSpaceNameMaxLength,
  },
};

const descriptionRules = {
  validate: validateSpaceDescriptionMaxLength,
};

export const useCreateSpaceForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
  } = useForm<CreateSpaceFormValues>({
    mode: "onChange",
    defaultValues: { spaceName: "", description: "" },
  });

  const [isGuestBookPrivate, setIsGuestBookPrivate] = useState(false);

  const spaceNameError =
    errors.spaceName?.type === "required" && !touchedFields.spaceName
      ? undefined
      : errors.spaceName?.message;
  const descriptionError = errors.description?.message;

  const getSubmitHandler = (onNext: (data: CreateSpaceFormData) => void) =>
    handleSubmit((values) => {
      onNext({ ...values, isGuestBookPrivate });
    });

  return {
    control,
    spaceNameRules,
    descriptionRules,
    spaceNameError,
    descriptionError,
    isValid,
    isGuestBookPrivate,
    setIsGuestBookPrivate,
    getSubmitHandler,
  };
};
