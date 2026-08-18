import Button from "@/components/@common/Button/Button";
import Modal from "@/components/UI/Modal/Modal";
import * as S from "./ErrorModal.styles";

interface ErrorModalProps {
  /** 모달 열림 여부 */
  isOpen: boolean;
  /** 모달을 닫을 때 호출되는 콜백 */
  onClose: () => void;
  /** 모달 제목. 기본값은 "나중에 다시 시도해주세요" */
  title?: string;
  /** 모달 설명 문구. 기본값은 "정보를 불러오지 못했어요." */
  description?: string;
}

const ErrorModal = ({
  isOpen,
  onClose,
  title = "나중에 다시 시도해주세요",
  description = "정보를 불러오지 못했어요.",
}: ErrorModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Overlay />
      <Modal.Content>
        <S.Body>
          <S.TextGroup>
            <S.Title>{title}</S.Title>
            <S.Subtitle>{description}</S.Subtitle>
          </S.TextGroup>
          <Button
            variant="primary"
            text="확인"
            onClick={onClose}
            style={{ width: "100%" }}
          />
        </S.Body>
      </Modal.Content>
    </Modal>
  );
};

export default ErrorModal;
