import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getGetSpaceInformationQueryKey,
  useUpdate,
} from "@/api/generated/space-스페이스";
import type { SpaceResponse } from "@/api/model";
import { ERROR_MESSAGES } from "@/constants/error";
import useSnackBar from "@/hooks/@common/useSnackBar";
import {
  validateSpaceDescriptionMaxLength,
  validateSpaceLinkNameMaxLength,
  validateSpaceLinkUrlFormat,
  validateSpaceNameMaxLength,
  validateSpaceNameRequired,
} from "@/pages/createSpace/utils/createSpaceValidation";

interface EditSpaceFormValues {
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

export const useEditSpaceForm = (spaceId: string, space: SpaceResponse) => {
  const { showSnackBar } = useSnackBar();
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, touchedFields, isValid },
  } = useForm<EditSpaceFormValues>({
    mode: "onChange",
    defaultValues: {
      spaceName: space.name ?? "",
      description: space.description ?? "",
      linkUrl: space.linkUrl ?? "",
      linkName: space.linkName ?? "",
    },
  });

  // 기존 값이 이미 유효해도 RHF는 마운트 시 isValid를 자동 계산하지 않으므로 직접 트리거함
  useEffect(() => {
    trigger();
  }, [trigger]);

  const [isGuestBookPrivate, setIsGuestBookPrivate] = useState(
    !(space.isPublic ?? true),
  );
  const [linkUrlError, setLinkUrlError] = useState<string | undefined>(
    undefined,
  );
  const { mutate: updateSpace, isPending } = useUpdate();

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

  const getSubmitHandler = (onSuccess: () => void) =>
    handleSubmit((values) => {
      const linkUrlValidation = validateSpaceLinkUrlFormat(values.linkUrl);
      if (linkUrlValidation !== true) {
        setLinkUrlError(linkUrlValidation);
        return;
      }

      updateSpace(
        {
          spaceCode: spaceId,
          data: {
            name: values.spaceName,
            description: values.description,
            isPublic: !isGuestBookPrivate,
            linkUrl: values.linkUrl.trim(),
            linkName: values.linkName.trim(),
          },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: getGetSpaceInformationQueryKey(spaceId),
            });
            onSuccess();
          },
          onError: () =>
            showSnackBar(ERROR_MESSAGES.SPACE_UPDATE_FAILED, "error"),
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
