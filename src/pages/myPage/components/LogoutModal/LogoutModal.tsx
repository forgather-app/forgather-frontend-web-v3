import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useLogout } from "@/api/generated/auth-인증";
import Button from "@/components/@common/Button/Button";
import Modal from "@/components/UI/Modal/Modal";
import { ERROR_MESSAGES } from "@/constants/error";
import useLogoutBridge from "@/hooks/@common/useLogoutBridge";
import useSnackBar from "@/hooks/@common/useSnackBar";
import * as S from "./LogoutModal.styles";

interface LogoutModalProps {
  /** 모달 열림 여부 */
  isOpen: boolean;
  /** 모달을 닫을 때 호출되는 콜백 */
  onClose: () => void;
}

const LogoutModal = ({ isOpen, onClose }: LogoutModalProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showSnackBar } = useSnackBar();
  const { notifyLogout } = useLogoutBridge();
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        notifyLogout();
        queryClient.clear();
        navigate({ to: "/login" });
      },
      onError: () => {
        showSnackBar(ERROR_MESSAGES.LOGOUT_FAILED, "error");
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnEsc={!isPending}>
      <Modal.Overlay disableClose={isPending} />
      <Modal.Content>
        <S.ModalInner>
          <S.TextGroup>
            <S.Title>로그아웃할까요?</S.Title>
          </S.TextGroup>
          <S.ButtonRow>
            <S.CloseButton type="button" onClick={onClose} disabled={isPending}>
              닫기
            </S.CloseButton>
            <Button
              variant="tertiary"
              text="로그아웃"
              onClick={handleLogout}
              disabled={isPending}
              style={{ width: "auto", flex: 1 }}
            />
          </S.ButtonRow>
        </S.ModalInner>
      </Modal.Content>
    </Modal>
  );
};

export default LogoutModal;
