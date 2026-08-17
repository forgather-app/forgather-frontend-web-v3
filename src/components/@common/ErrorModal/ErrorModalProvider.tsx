import { useState } from "react";
import ErrorModal from "./ErrorModal";
import { ErrorModalContext } from "./ErrorModalContext";

interface ErrorModalState {
  title?: string;
  description?: string;
}

const ErrorModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [errorModal, setErrorModal] = useState<ErrorModalState | null>(null);

  const openErrorModal = (title?: string, description?: string) => {
    setErrorModal({ title, description });
  };

  const closeErrorModal = () => setErrorModal(null);

  return (
    <ErrorModalContext.Provider value={{ openErrorModal }}>
      {children}
      <ErrorModal
        isOpen={errorModal !== null}
        onClose={closeErrorModal}
        title={errorModal?.title}
        description={errorModal?.description}
      />
    </ErrorModalContext.Provider>
  );
};

export default ErrorModalProvider;
