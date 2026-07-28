import { Controller } from "react-hook-form";
import Button from "@/components/@common/Button/Button";
import NavigationBar from "@/components/@common/NavigationBar/NavigationBar";
import TextArea from "@/components/@common/TextArea/TextArea";
import TextField from "@/components/@common/TextField/TextField";
import { CONSTRAINTS } from "@/constants/constraints";
import * as S from "./CreateProductPage.styles";
import PhotoInput from "./components/photoInput/PhotoInput";
import {
  type CreateProductFormData,
  useCreateProductForm,
} from "./hooks/useCreateProductForm";

export type { CreateProductFormData } from "./hooks/useCreateProductForm";

interface CreateProductPageProps {
  /** 뒤로가기 핸들러 */
  onBack: () => void;
  /** 다음 버튼 클릭(폼 제출) 핸들러 */
  onNext: (data: CreateProductFormData) => void;
}

const CreateProductPage = ({ onBack, onNext }: CreateProductPageProps) => {
  const {
    control,
    titleRules,
    descriptionRules,
    titleError,
    descriptionError,
    isValid,
    photos,
    setPhotos,
    getSubmitHandler,
  } = useCreateProductForm();

  return (
    <S.PageWrapper onSubmit={getSubmitHandler(onNext)} noValidate>
      <NavigationBar title="작품 등록하기" onBackClick={onBack} />
      <S.ScrollArea>
        <S.Title>{"작품 정보를\n입력해 주세요!"}</S.Title>
        <S.FieldGroup>
          <S.LabelRow>
            <S.Label>작품 제목</S.Label>
            <S.RequiredDot aria-hidden="true" />
          </S.LabelRow>
          <Controller
            control={control}
            name="title"
            rules={titleRules}
            render={({ field }) => (
              <TextField
                variant="count"
                value={field.value}
                maxCount={CONSTRAINTS.PRODUCT.TITLE_MAX_LENGTH}
                placeholder="작품 제목을 작성해주세요."
                errorMessage={titleError}
                onChange={field.onChange}
                onBlur={field.onBlur}
                aria-label="작품 제목"
              />
            )}
          />
        </S.FieldGroup>

        <S.FieldGroup>
          <S.Label>작품 소개</S.Label>
          <Controller
            control={control}
            name="description"
            rules={descriptionRules}
            render={({ field }) => (
              <TextArea
                value={field.value}
                maxLength={CONSTRAINTS.PRODUCT.DESCRIPTION_MAX_LENGTH}
                placeholder="작품에 대한 설명을 작성해주세요."
                errorMessage={descriptionError}
                onChange={field.onChange}
                onBlur={field.onBlur}
                aria-label="작품 소개"
              />
            )}
          />
        </S.FieldGroup>

        <S.FieldGroup>
          <S.Label>{`사진(최대 ${CONSTRAINTS.PRODUCT.MAX_PHOTO_COUNT}장)`}</S.Label>
          <PhotoInput
            photos={photos}
            maxCount={CONSTRAINTS.PRODUCT.MAX_PHOTO_COUNT}
            onChange={setPhotos}
          />
        </S.FieldGroup>

        <S.FieldGroup>
          <S.Label>영상</S.Label>
          <Controller
            control={control}
            name="videoUrl"
            render={({ field }) => (
              <TextField
                variant="link"
                value={field.value}
                placeholder="유튜브 링크를 입력해주세요"
                onChange={field.onChange}
                onBlur={field.onBlur}
                aria-label="영상 링크"
              />
            )}
          />
        </S.FieldGroup>
      </S.ScrollArea>
      <S.Footer>
        <Button text="다음" type="submit" disabled={!isValid} />
      </S.Footer>
    </S.PageWrapper>
  );
};

export default CreateProductPage;
