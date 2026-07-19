import { createFileRoute } from "@tanstack/react-router";
import SignUpCompletePage from "@/pages/signUp/SignUpCompletePage";

export const Route = createFileRoute("/_authenticated/sign-up/complete")({
  component: SignUpCompletePage,
});
