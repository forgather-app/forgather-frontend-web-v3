import { createFileRoute } from "@tanstack/react-router";
import CreateExhibitionFunnel from "@/pages/createExhibition/CreateExhibitoinFunnel";

export const Route = createFileRoute("/create-exhibition/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CreateExhibitionFunnel />;
}
