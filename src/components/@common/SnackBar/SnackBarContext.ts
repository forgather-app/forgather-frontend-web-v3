import { createContext } from "react";

export interface SnackBarContextValue {
  showSnackBar: (
    message: string,
    iconType?: "alert" | "error" | "default",
  ) => void;
}

export const SnackBarContext = createContext<SnackBarContextValue>({
  showSnackBar: () => {},
});
