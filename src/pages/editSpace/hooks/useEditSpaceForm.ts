import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  getGetSpaceInformationQueryKey,
  useUpdate,
} from "@/api/generated/space-스페이스";
import type { GuestBookWritingPolicy, SpaceResponse } from "@/api/model";
import {
  type ExhibitionLocationValue,
  toExhibitionLocationPayload,
  validateExhibitionLocation,
} from "@/components/@common/ExhibitionLocationField/exhibitionLocation";
import type { ExhibitionPeriodValue } from "@/components/@common/ExhibitionPeriodField/ExhibitionPeriodField";
import { ERROR_MESSAGES } from "@/constants/error";
import useSnackBar from "@/hooks/@common/useSnackBar";
import {
  validateSpaceDescriptionMaxLength,
  validateSpaceLinkNameMaxLength,
  validateSpaceLinkUrlFormat,
  validateSpaceNameMaxLength,
  validateSpaceNameRequired,
} from "@/pages/createSpace/utils/createSpaceValidation";
import { parseDateOnlyString, toDateOnlyString } from "@/utils/date";

import { validateGuestBookWritingPeriod } from "@/utils/guestBookWritingPolicy";

interface EditSpaceFormValues {
  spaceName: string;
  description: string;
  linkUrl: string;
  linkName: string;
  exhibitionPeriod: ExhibitionPeriodValue;
  guestBookWritingPolicy: GuestBookWritingPolicy;
  exhibitionLocation: ExhibitionLocationValue;
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
  validate: {
    maxLength: validateSpaceLinkNameMaxLength,
  },
};

export const useEditSpaceForm = (spaceId: string, space: SpaceResponse) => {
  const { showSnackBar } = useSnackBar();
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors, touchedFields, isValid },
  } = useForm<EditSpaceFormValues>({
    mode: "onChange",
    defaultValues: {
      guestBookWritingPolicy: space.guestBookWritingPolicy ?? "ALWAYS",
      spaceName: space.name ?? "",
      description: space.description ?? "",
      linkUrl: space.linkUrl ?? "",
      linkName: space.linkName ?? "",
      exhibitionLocation: {
        placeName: space.placeName ?? "",
        placeId: space.placeId ?? "",
        placeUrl: space.placeUrl ?? "",
      },
      exhibitionPeriod: {
        startDate: space.exhibitionStartDate
          ? parseDateOnlyString(space.exhibitionStartDate)
          : null,
        endDate: space.exhibitionEndDate
          ? parseDateOnlyString(space.exhibitionEndDate)
          : null,
      },
    },
  });

  // 기존 값이 이미 유효해도 RHF는 마운트 시 isValid를 자동 계산하지 않으므로 직접 트리거함
  useEffect(() => {
    trigger();
  }, [trigger]);

  const policy = useWatch({ control, name: "guestBookWritingPolicy" });
  const period = useWatch({ control, name: "exhibitionPeriod" });
  const periodValidation = validateGuestBookWritingPeriod(policy, period);

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
  const linkUrlError = linkUrlFormatError;
  const linkNameError = errors.linkName?.message;

  // linkUrl은 onChange마다 형식을 검증하지 않고, blur 시점에만 검증해 에러를 노출함
  const handleLinkUrlBlur = (value: string) => {
    const result = validateSpaceLinkUrlFormat(value);
    setLinkUrlFormatError(result === true ? undefined : result);
  };

  const getSubmitHandler = (onSuccess: () => void) =>
    handleSubmit((values) => {
      const linkUrlValidation = validateSpaceLinkUrlFormat(values.linkUrl);
      if (linkUrlValidation !== true) {
        setLinkUrlFormatError(linkUrlValidation);
        return;
      }

      const { startDate, endDate } = values.exhibitionPeriod;

      updateSpace(
        {
          spaceCode: spaceId,
          data: {
            ...toExhibitionLocationPayload(values.exhibitionLocation),
            ...(values.guestBookWritingPolicy !==
            (space.guestBookWritingPolicy ?? "ALWAYS")
              ? { guestBookWritingPolicy: values.guestBookWritingPolicy }
              : {}),
            name: values.spaceName,
            description: values.description,
            isPublic: !isGuestBookPrivate,
            linkUrl: values.linkUrl.trim(),
            linkName: values.linkName.trim(),
            ...(startDate && endDate
              ? {
                  exhibitionStartDate: toDateOnlyString(startDate),
                  exhibitionEndDate: toDateOnlyString(endDate),
                }
              : space.exhibitionStartDate || space.exhibitionEndDate
                ? { isDeleteExhibitionPeriod: true }
                : {}),
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
    exhibitionPeriodRules: {
      validate: (value: ExhibitionPeriodValue) =>
        validateGuestBookWritingPeriod(
          getValues("guestBookWritingPolicy"),
          value,
        ),
      deps: "guestBookWritingPolicy" as const,
    },
    guestBookWritingPolicyRules: {
      validate: (value: GuestBookWritingPolicy) =>
        validateGuestBookWritingPeriod(value, getValues("exhibitionPeriod")),
      deps: "exhibitionPeriod" as const,
    },
    isExhibitionPeriodComplete: !!period.startDate && !!period.endDate,
    exhibitionPeriodError:
      periodValidation === true ? undefined : periodValidation,
    exhibitionLocationRules: { validate: validateExhibitionLocation },
    exhibitionLocationError: errors.exhibitionLocation?.message,
    spaceNameError,
    descriptionError,
    linkNameError,
    linkUrlError,
    handleLinkUrlBlur,
    isValid: isValid && periodValidation === true,
    isGuestBookPrivate,
    setIsGuestBookPrivate,
    isSubmitting: isPending,
    getSubmitHandler,
  };
};
