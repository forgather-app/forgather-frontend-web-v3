import { createFileRoute } from "@tanstack/react-router";
import SignUpCompletePage from "@/pages/signUp/SignUpCompletePage";

export const Route = createFileRoute("/sign-up/complete")({
  component: SignUpCompletePage,
});
