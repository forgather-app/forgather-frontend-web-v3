import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import ArtworkPage from "@/pages/artwork/ArtworkPage";

export const Route = createFileRoute("/_authenticated/spaces/$spaceId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Suspense fallback={null}>
      <ArtworkPage />
    </Suspense>
  );
}
