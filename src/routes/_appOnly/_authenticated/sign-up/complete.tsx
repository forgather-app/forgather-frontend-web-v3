import { createFileRoute } from "@tanstack/react-router";
import SignUpCompletePage from "@/pages/signUp/SignUpCompletePage";

export const Route = createFileRoute(
  "/_appOnly/_authenticated/sign-up/complete",
)({
  component: SignUpCompletePage,
});
