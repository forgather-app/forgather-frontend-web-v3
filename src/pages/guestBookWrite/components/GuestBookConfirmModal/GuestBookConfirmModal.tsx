import Button from "@/components/@common/Button/Button";
import Modal from "@/components/UI/Modal/Modal";
import * as S from "./GuestBookConfirmModal.styles";

interface GuestBookConfirmModalProps {
  /** 모달 열림 여부 */
  isOpen: boolean;
  /** 모달을 닫을 때 호출되는 콜백 */
  onClose: () => void;
  /** "남기기" 버튼 클릭 시 호출되는 콜백 */
  onConfirm: () => void;
  /** 제출 진행 중 여부. true이면 닫기·확인 동작이 비활성화됩니다. */
  isSubmitting?: boolean;
}

const GuestBookConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting = false,
}: GuestBookConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnEsc={!isSubmitting}>
      <Modal.Overlay disableClose={isSubmitting} />
      <Modal.Content>
        <S.ModalInner>
          <S.TextGroup>
            <S.Title>내용을 확인해주세요</S.Title>
            <S.Description>
              한 번 남긴 방명록은
              <br />
              수정 및 삭제가 불가해요.
            </S.Description>
          </S.TextGroup>
          <S.ButtonRow>
            <S.CancelButton
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
            >
              취소
            </S.CancelButton>
            <Button
              variant="primary"
              text="남기기"
              onClick={onConfirm}
              disabled={isSubmitting}
              style={{ width: "auto", flex: 1 }}
            />
          </S.ButtonRow>
        </S.ModalInner>
      </Modal.Content>
    </Modal>
  );
};

export default GuestBookConfirmModal;
