import { createFileRoute } from "@tanstack/react-router";
import KakaoCallbackPage from "@/pages/login/callback/KakaoCallbackPage";

export const Route = createFileRoute("/login/callback")({
  component: KakaoCallbackPage,
  validateSearch: (search: Record<string, unknown>) => ({
    code: search.code as string | undefined,
  }),
});
