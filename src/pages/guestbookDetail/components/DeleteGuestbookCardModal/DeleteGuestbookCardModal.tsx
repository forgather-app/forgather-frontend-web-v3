import { useQueryClient } from "@tanstack/react-query";
import {
  getReadCardQueryKey,
  useDeleteCard,
} from "@/api/generated/spaceguestbook-스페이스-방명록";
import Button from "@/components/@common/Button/Button";
import Modal from "@/components/UI/Modal/Modal";
import useSnackBar from "@/hooks/@common/useSnackBar";
import * as S from "./DeleteGuestbookCardModal.styles";

export interface DeleteGuestbookCardModalProps {
  /** 모달 열림 여부 */
  isOpen: boolean;
  /** 모달을 닫을 때 호출되는 콜백 */
  onClose: () => void;
  /** 스페이스 ID */
  spaceId: string;
  /** 삭제할 방명록 카드 ID */
  cardId: number;
  /** 삭제 성공 후 호출되는 콜백 (예: 목록으로 이동) */
  onDeleted: () => void;
}

const DeleteGuestbookCardModal = ({
  isOpen,
  onClose,
  spaceId,
  cardId,
  onDeleted,
}: DeleteGuestbookCardModalProps) => {
  const queryClient = useQueryClient();
  const { showSnackBar } = useSnackBar();
  const { mutate: deleteCard, isPending } = useDeleteCard();

  const handleConfirm = () => {
    deleteCard(
      { spaceCode: spaceId, guestBookCardId: cardId },
      {
        onSuccess: () => {
          onClose();
          showSnackBar("방명록을 삭제했어요", "alert");
          // 목록/상세 캐시를 무효화해 뒤로가기 등으로 재접근해도 삭제된 상태가 바로 반영되게 한다
          queryClient.invalidateQueries({
            queryKey: ["guestbook", spaceId, "list"],
          });
          queryClient.invalidateQueries({
            queryKey: getReadCardQueryKey(spaceId, cardId),
          });
          onDeleted();
        },
        onError: () => {
          onClose();
          showSnackBar("방명록 삭제에 실패했어요", "error");
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnEsc={!isPending}>
      <Modal.Overlay disableClose={isPending} />
      <Modal.Content>
        <S.ConfirmBody>
          <S.ConfirmTextGroup>
            <S.ConfirmTitle>방명록을 삭제할까요?</S.ConfirmTitle>
            <S.ConfirmSubtitle>삭제하면 되돌릴 수 없어요</S.ConfirmSubtitle>
          </S.ConfirmTextGroup>
          <S.ConfirmActions>
            <Button
              variant="tertiary"
              text="취소"
              onClick={onClose}
              disabled={isPending}
              style={{ flex: 1 }}
            />
            <Button
              variant="danger"
              text="삭제하기"
              onClick={handleConfirm}
              disabled={isPending}
              style={{ flex: 1 }}
            />
          </S.ConfirmActions>
        </S.ConfirmBody>
      </Modal.Content>
    </Modal>
  );
};

export default DeleteGuestbookCardModal;
