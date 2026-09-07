import { type NavigateOptions, useRouter } from "@tanstack/react-router";
import { useCallback } from "react";

const useFlowBack = () => {
  const router = useRouter();

  return useCallback(
    (fallback: NavigateOptions) => {
      if (router.history.canGoBack()) {
        router.history.back();
        return;
      }
      router.navigate({ ...fallback, replace: true });
    },
    [router],
  );
};

export default useFlowBack;
