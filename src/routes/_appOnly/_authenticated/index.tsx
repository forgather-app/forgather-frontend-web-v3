import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_appOnly/_authenticated/")({
  beforeLoad: () => {
    throw redirect({ to: "/home" });
  },
});
