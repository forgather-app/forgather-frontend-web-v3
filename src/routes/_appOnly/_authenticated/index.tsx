import { createFileRoute, redirect } from "@tanstack/react-router";
import { isAppWebview } from "@/utils/isAppWebview";

export const Route = createFileRoute("/_appOnly/_authenticated/")({
  beforeLoad: () => {
    if (!isAppWebview(navigator.userAgent)) {
      throw redirect({ to: "/landing" });
    }
    throw redirect({ to: "/home" });
  },
});
