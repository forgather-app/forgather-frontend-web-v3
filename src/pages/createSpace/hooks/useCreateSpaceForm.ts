import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreate } from "@/api/generated/space-스페이스";
import type { ApiResponseCreateSpaceResponse } from "@/api/model";
import { ERROR_MESSAGES } from "@/constants/error";
import useSnackBar from "@/hooks/@common/useSnackBar";
import {
  SPACE_LINK_URL_PREFIX,
  validateSpaceDescriptionMaxLength,
  validateSpaceLinkNameMaxLength,
  validateSpaceLinkUrlFormat,
  validateSpaceNameMaxLength,
  validateSpaceNameRequired,
} from "@/pages/createSpace/utils/createSpaceValidation";

interface CreateSpaceFormValues {
  spaceName: string;
  description: string;
  linkUrl: string;
  linkName: string;
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

const linkNameRules = {
  validate: validateSpaceLinkNameMaxLength,
};

export const useCreateSpaceForm = () => {
  const { showSnackBar } = useSnackBar();
  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
  } = useForm<CreateSpaceFormValues>({
    mode: "onChange",
    defaultValues: {
      spaceName: "",
      description: "",
      linkUrl: "",
      linkName: "",
    },
  });

  const [isGuestBookPrivate, setIsGuestBookPrivate] = useState(false);
  const [linkUrlError, setLinkUrlError] = useState<string | undefined>(
    undefined,
  );
  const { mutate: createSpace, isPending } = useCreate();

  const spaceNameError =
    errors.spaceName?.type === "required" && !touchedFields.spaceName
      ? undefined
      : errors.spaceName?.message;
  const descriptionError = errors.description?.message;
  const linkNameError = errors.linkName?.message;

  // linkUrl은 onChange마다 검증하지 않고, blur 시점에만 검증해 에러를 노출함
  const handleLinkUrlBlur = (value: string) => {
    const result = validateSpaceLinkUrlFormat(value);
    setLinkUrlError(result === true ? undefined : result);
  };

  const getSubmitHandler = (onSuccess: (spaceCode: string) => void) =>
    handleSubmit((values) => {
      const linkUrlValidation = validateSpaceLinkUrlFormat(values.linkUrl);
      if (linkUrlValidation !== true) {
        setLinkUrlError(linkUrlValidation);
        return;
      }

      const trimmedLinkUrl = values.linkUrl.trim();

      createSpace(
        {
          data: {
            name: values.spaceName,
            description: values.description,
            isPublic: !isGuestBookPrivate,
            linkUrl: trimmedLinkUrl
              ? `${SPACE_LINK_URL_PREFIX}${trimmedLinkUrl}`
              : "",
            linkName: values.linkName.trim(),
          },
        },
        {
          onSuccess: (response) => {
            // NOTE: BE 스펙상 응답 content-type이 `*/*`라 orval이 Blob으로 잘못 추론함.
            // 실제 응답 바디는 ApiResponseCreateSpaceResponse (JSON)이므로 캐스팅해서 사용
            const spaceCode = (
              response as unknown as ApiResponseCreateSpaceResponse
            ).data?.spaceCode;

            if (!spaceCode) {
              showSnackBar(ERROR_MESSAGES.SPACE_CREATE_FAILED, "error");
              return;
            }

            onSuccess(spaceCode);
          },
          onError: () =>
            showSnackBar(ERROR_MESSAGES.SPACE_CREATE_FAILED, "error"),
        },
      );
    });

  return {
    control,
    spaceNameRules,
    descriptionRules,
    linkNameRules,
    spaceNameError,
    descriptionError,
    linkNameError,
    linkUrlError,
    handleLinkUrlBlur,
    isValid,
    isGuestBookPrivate,
    setIsGuestBookPrivate,
    isSubmitting: isPending,
    getSubmitHandler,
  };
};
