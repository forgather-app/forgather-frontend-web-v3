import Button from "@/components/@common/Button/Button";
import * as S from "./CreateSpaceCompletePage.styles";

interface CreateSpaceCompletePageProps {
  /** 스페이스로 이동 버튼 클릭 핸들러 */
  onNavigateToSpace: () => void;
}

const CreateSpaceCompletePage = ({
  onNavigateToSpace,
}: CreateSpaceCompletePageProps) => {
  return (
    <S.Container>
      <S.Content>
        <S.Title>스페이스 생성이 완료되었어요!</S.Title>
        {/* TODO: [그래픽] - 디자인 확정 후 구현 */}
      </S.Content>
      <S.Footer>
        <Button
          variant="tertiary"
          text="스페이스로 이동"
          onClick={onNavigateToSpace}
        />
      </S.Footer>
    </S.Container>
  );
};

export default CreateSpaceCompletePage;
