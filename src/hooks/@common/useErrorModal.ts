import { useContext } from "react";
import { ErrorModalContext } from "@/components/@common/ErrorModal/ErrorModalContext";

const useErrorModal = () => useContext(ErrorModalContext);

export default useErrorModal;
