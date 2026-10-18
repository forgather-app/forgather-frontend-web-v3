import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import LandingPage from "@/pages/landing/LandingPage";

export const Route = createFileRoute("/landing")({
  component: () => (
    <Suspense fallback={null}>
      <LandingPage />
    </Suspense>
  ),
});
