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
  validateSpaceLinkPair,
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

const linkUrlRules = {
  validate: { pair: validateSpaceLinkPair },
};

const linkNameRules = {
  validate: {
    maxLength: validateSpaceLinkNameMaxLength,
    pair: validateSpaceLinkPair,
  },
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
  const [linkUrlFormatError, setLinkUrlFormatError] = useState<
    string | undefined
  >(undefined);
  const { mutate: updateSpace, isPending } = useUpdate();

  const spaceNameError =
    errors.spaceName?.type === "required" && !touchedFields.spaceName
      ? undefined
      : errors.spaceName?.message;
  const descriptionError = errors.description?.message;
  // 형식 에러(blur 시점)를 우선 노출하고, 없으면 짝 검증(RHF) 에러를 노출함
  const linkUrlError = linkUrlFormatError ?? errors.linkUrl?.message;
  const linkNameError = errors.linkName?.message;

  // linkUrl은 onChange마다 형식을 검증하지 않고, blur 시점에만 검증해 에러를 노출함
  const handleLinkUrlBlur = (value: string) => {
    const result = validateSpaceLinkUrlFormat(value);
    setLinkUrlFormatError(result === true ? undefined : result);
  };

  // linkUrl/linkName은 서로 짝을 이뤄야 하므로, 한쪽이 바뀌면 둘 다 재검증한다
  const triggerLinkPair = () => {
    trigger(["linkUrl", "linkName"]);
  };

  const getSubmitHandler = (onSuccess: () => void) =>
    handleSubmit((values) => {
      const linkUrlValidation = validateSpaceLinkUrlFormat(values.linkUrl);
      if (linkUrlValidation !== true) {
        setLinkUrlFormatError(linkUrlValidation);
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
    linkUrlRules,
    linkNameRules,
    spaceNameError,
    descriptionError,
    linkNameError,
    linkUrlError,
    handleLinkUrlBlur,
    triggerLinkPair,
    isValid,
    isGuestBookPrivate,
    setIsGuestBookPrivate,
    isSubmitting: isPending,
    getSubmitHandler,
  };
};
