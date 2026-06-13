import { useState } from "react";
import TextArea from "@/components/@common/textArea/TextArea";
import { DOMAIN_CONSTRAINTS } from "@/constants/constraints";
import { ERROR_MESSAGES } from "@/constants/messages";
import ItemLayout from "@/shared/funnel/ItemLayout";
import * as S from "./DescriptionStep.styles";

interface DescriptionStepProps {
  onNext: (data: { title: string; description: string }) => void;
}

const DescriptionStep = ({ onNext }: DescriptionStepProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { TITLE_MAX, DESCRIPTION_MAX } = DOMAIN_CONSTRAINTS.CREATE_EXHIBITION;

  const titleError =
    title.length > TITLE_MAX ? ERROR_MESSAGES.MAX_LENGTH(TITLE_MAX) : "";
  const descriptionError =
    description.length > DESCRIPTION_MAX
      ? ERROR_MESSAGES.MAX_LENGTH(DESCRIPTION_MAX)
      : "";
  const isValid = !!title && !!description && !titleError && !descriptionError;

  return (
    <ItemLayout
      text="다음"
      disabled={!isValid}
      onClick={() => onNext({ title, description })}
    >
      <S.FieldsWrapper>
        <S.FieldGroup>
          <S.Label htmlFor="exhibition-title">전시 제목</S.Label>
          <TextArea
            id="exhibition-title"
            maxLength={TITLE_MAX}
            size="medium"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="전시 제목을 입력해주세요"
            errorMessage={titleError}
          />
        </S.FieldGroup>
        <S.FieldGroup>
          <S.Label htmlFor="exhibition-description">전시 소개</S.Label>
          <TextArea
            id="exhibition-description"
            size="large"
            maxLength={DESCRIPTION_MAX}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="전시에 대한 설명을 작성해주세요."
            errorMessage={descriptionError}
          />
        </S.FieldGroup>
      </S.FieldsWrapper>
    </ItemLayout>
  );
};

export default DescriptionStep;
