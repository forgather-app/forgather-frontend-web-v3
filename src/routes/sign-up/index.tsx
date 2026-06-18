import { createFileRoute } from "@tanstack/react-router";
import SignUpFunnel from "@/pages/signUp/SignUpFunnel";

export const Route = createFileRoute("/sign-up/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SignUpFunnel />;
}
