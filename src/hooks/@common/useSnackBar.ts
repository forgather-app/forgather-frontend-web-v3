import { useContext } from "react";
import { SnackBarContext } from "@/components/@common/SnackBar/SnackBarContext";

const useSnackBar = () => useContext(SnackBarContext);

export default useSnackBar;
