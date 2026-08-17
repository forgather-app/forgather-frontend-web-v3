import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import useErrorModal from "@/hooks/@common/useErrorModal";

const RootErrorBoundary = () => {
  const router = useRouter();
  const { openErrorModal } = useErrorModal();

  // biome-ignore lint/correctness/useExhaustiveDependencies: 마운트 시 1회만 실행
  useEffect(() => {
    router.navigate({ to: "..", replace: true });
    openErrorModal();
  }, []);

  return null;
};

export default RootErrorBoundary;
