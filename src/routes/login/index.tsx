import { createFileRoute } from "@tanstack/react-router";
import LoginPage from "@/pages/login/LoginPage";

interface LoginSearch {
  /** 로그인 성공 후 돌아갈 경로 (오픈 리다이렉트 방지를 위해 내부 경로만 허용) */
  redirectTo?: string;
}

export const Route = createFileRoute("/login/")({
  validateSearch: (search: Record<string, unknown>): LoginSearch => {
    const { redirectTo } = search;
    if (
      typeof redirectTo === "string" &&
      redirectTo.startsWith("/") &&
      !redirectTo.startsWith("//")
    ) {
      return { redirectTo };
    }
    return {};
  },
  component: LoginPage,
});
