import { useNavigate } from "@tanstack/react-router";
import { useWithdraw } from "@/api/generated/auth-인증";
import Button from "@/components/@common/Button/Button";
import Modal from "@/components/UI/Modal/Modal";
import { ERROR_MESSAGES } from "@/constants/error";
import useSnackBar from "@/hooks/@common/useSnackBar";
import * as S from "./WithdrawModal.styles";

interface WithdrawModalProps {
  /** 모달 열림 여부 */
  isOpen: boolean;
  /** 모달을 닫을 때 호출되는 콜백 */
  onClose: () => void;
}

const WithdrawModal = ({ isOpen, onClose }: WithdrawModalProps) => {
  const navigate = useNavigate();
  const { showSnackBar } = useSnackBar();
  const { mutate: withdraw, isPending } = useWithdraw();

  const handleWithdraw = () => {
    withdraw(undefined, {
      onSuccess: () => {
        showSnackBar("회원 탈퇴가 완료되었어요", "alert");
        navigate({ to: "/login" });
      },
      onError: () => {
        showSnackBar(ERROR_MESSAGES.WITHDRAW_FAILED, "error");
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnEsc={!isPending}>
      <Modal.Overlay disableClose={isPending} />
      <Modal.Content>
        <S.ModalInner>
          <S.TextGroup>
            <S.Title>회원 탈퇴할까요?</S.Title>
            <S.Description>스페이스와 방명록이 모두 사라져요</S.Description>
          </S.TextGroup>
          <S.ButtonRow>
            <S.CloseButton type="button" onClick={onClose} disabled={isPending}>
              닫기
            </S.CloseButton>
            <Button
              variant="danger"
              text="탈퇴하기"
              onClick={handleWithdraw}
              disabled={isPending}
              style={{ width: "auto", flex: 1 }}
            />
          </S.ButtonRow>
        </S.ModalInner>
      </Modal.Content>
    </Modal>
  );
};

export default WithdrawModal;
