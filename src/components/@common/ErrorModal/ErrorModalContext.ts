import { createContext } from "react";

export interface ErrorModalContextValue {
  openErrorModal: (title?: string, description?: string) => void;
}

export const ErrorModalContext = createContext<ErrorModalContextValue>({
  openErrorModal: () => {},
});
