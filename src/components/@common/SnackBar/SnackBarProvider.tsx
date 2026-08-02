import styled from "@emotion/styled";
import { useState } from "react";
import { createPortal } from "react-dom";
import SnackBar from "./SnackBar/SnackBar";
import { SnackBarContext } from "./SnackBarContext";

const FixedContainer = styled.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 30;
`;

interface SnackBarState {
  message: string;
  iconType?: "alert" | "error";
}

const SnackBarProvider = ({ children }: { children: React.ReactNode }) => {
  const [snackBar, setSnackBar] = useState<SnackBarState | null>(null);

  const showSnackBar = (message: string, iconType?: "alert" | "error") => {
    setSnackBar({ message, iconType });
  };

  return (
    <SnackBarContext.Provider value={{ showSnackBar }}>
      {children}
      {snackBar &&
        createPortal(
          <FixedContainer>
            <SnackBar
              message={snackBar.message}
              iconType={snackBar.iconType}
              onClose={() => setSnackBar(null)}
            />
          </FixedContainer>,
          document.body,
        )}
    </SnackBarContext.Provider>
  );
};

export default SnackBarProvider;
