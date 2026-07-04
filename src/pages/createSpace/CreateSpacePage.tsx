import { useState } from "react";
import LockIcon from "@/assets/icons/ic_lock.svg?react";
import Button from "@/components/@common/Button/Button";
import NavigationBar from "@/components/@common/NavigationBar/NavigationBar";
import TextArea from "@/components/@common/TextArea/TextArea";
import TextField from "@/components/@common/TextField/TextField";
import Toggle from "@/components/@common/Toggle/Toggle";
import { CONSTRAINTS } from "@/constants/constraints";
import * as S from "./CreateSpacePage.styles";

interface CreateSpacePageProps {
  /** 뒤로가기 핸들러 */
  onBack: () => void;
  /** 스페이스 생성 완료 핸들러 */
  onComplete: () => void;
}

const CreateSpacePage = ({ onBack, onComplete }: CreateSpacePageProps) => {
  const [spaceName, setSpaceName] = useState("");
  const [spaceDescription, setSpaceDescription] = useState("");
  const [isGuestBookPrivate, setIsGuestBookPrivate] = useState(false);

  const isValid = spaceName.trim().length > 0;

  const handleSubmit = () => {
    // TODO: API 연동 시 스페이스 생성 요청 성공 후 이동하도록 교체
    onComplete();
  };

  return (
    <S.Container>
      <NavigationBar title="스페이스 생성" onBackClick={onBack} />
      <S.ScrollArea>
        <S.Title>{"스페이스에 대한 정보를\n입력해 주세요!"}</S.Title>
        <S.FieldGroup>
          <S.Label>스페이스 명</S.Label>
          <TextField
            variant="count"
            value={spaceName}
            maxCount={CONSTRAINTS.CREATE_SPACE.NAME_MAX_LENGTH}
            placeholder="스페이스 명을 작성해주세요"
            onChange={(e) => setSpaceName(e.target.value)}
            aria-label="스페이스 명"
          />
        </S.FieldGroup>
        <S.FieldGroup>
          <S.Label>스페이스 소개</S.Label>
          <TextArea
            size="large"
            value={spaceDescription}
            maxLength={CONSTRAINTS.CREATE_SPACE.DESCRIPTION_MAX_LENGTH}
            placeholder="스페이스에 대한 설명을 작성해주세요."
            onChange={(e) => setSpaceDescription(e.target.value)}
            aria-label="스페이스 소개"
          />
        </S.FieldGroup>
        <S.PrivacyRow>
          <S.PrivacyLabel>
            <LockIcon aria-hidden width={20} height={20} />
            방명록 나만 보기
          </S.PrivacyLabel>
          <Toggle
            checked={isGuestBookPrivate}
            onChange={setIsGuestBookPrivate}
            ariaLabel="방명록 나만 보기"
          />
        </S.PrivacyRow>
      </S.ScrollArea>
      <S.Footer>
        <Button
          variant="tertiary"
          text="완료"
          disabled={!isValid}
          onClick={handleSubmit}
        />
      </S.Footer>
    </S.Container>
  );
};

export default CreateSpacePage;
