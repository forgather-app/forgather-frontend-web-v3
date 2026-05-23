import { createContext, type ReactNode, useContext, useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { Backdrop } from "../../../styles/@common/Overlay/Backdrop.styles";
import * as S from "./Modal.styles";

interface ModalContextValue {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("Modal subcomponents must be used within <Modal>");
  return context;
};

interface ModalProps {
  /** 모달 열림 여부. true이면 표시, false이면 숨김 애니메이션이 적용됩니다. */
  isOpen: boolean;
  /** 모달을 닫을 때 호출되는 콜백. 부모에서 isOpen을 false로 전환하면 됩니다. */
  onClose: () => void;
  /** ESC 키로 모달을 닫을 수 있는지 여부. 기본값 true. */
  closeOnEsc?: boolean;
  children: ReactNode;
}

const modalStack: string[] = [];

type ModalComponent = React.FC<ModalProps> & {
  Overlay: React.FC<ModalOverlayProps>;
  Content: React.FC<ModalContentProps>;
};

const Modal: ModalComponent = ({
  isOpen,
  onClose,
  closeOnEsc = true,
  children,
}) => {
  const modalId = useId();

  useEffect(() => {
    if (!isOpen) return;
    modalStack.push(modalId);
    if (modalStack.length === 1) document.body.style.overflow = "hidden";
    return () => {
      const idx = modalStack.lastIndexOf(modalId);
      if (idx >= 0) modalStack.splice(idx, 1);
      if (modalStack.length === 0) document.body.style.overflow = "";
    };
  }, [isOpen, modalId]);

  useEffect(() => {
    if (!closeOnEsc || !isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (modalStack.at(-1) !== modalId) return;
      onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeOnEsc, isOpen, onClose, modalId]);

  return createPortal(
    <ModalContext.Provider value={{ isOpen, onClose }}>
      <S.ModalRoot $isVisible={isOpen} aria-modal={isOpen || undefined}>
        {children}
      </S.ModalRoot>
    </ModalContext.Provider>,
    document.body,
  );
};

interface ModalOverlayProps {
  /** 클릭 시 모달을 닫는 기본 동작을 막습니다. */
  disableClose?: boolean;
}

const Overlay = ({ disableClose = false }: ModalOverlayProps) => {
  const { onClose } = useModalContext();
  return <Backdrop onClick={disableClose ? undefined : onClose} />;
};

interface ModalContentProps {
  children: ReactNode;
}

const Content = ({ children }: ModalContentProps) => {
  const { isOpen } = useModalContext();

  return (
    <S.Content $isVisible={isOpen} role="dialog">
      {children}
    </S.Content>
  );
};

Modal.Overlay = Overlay;
Modal.Content = Content;

export default Modal;
