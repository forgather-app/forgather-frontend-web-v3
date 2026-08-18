import { createFileRoute } from "@tanstack/react-router";
import CreateExhibitionFunnel from "@/pages/createExhibition/CreateExhibitionFunnel";

export const Route = createFileRoute(
  "/_appOnly/_authenticated/create-exhibition/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <CreateExhibitionFunnel />;
}
