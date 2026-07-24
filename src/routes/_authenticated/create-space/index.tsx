import { createFileRoute } from "@tanstack/react-router";
import CreateSpacePage from "@/pages/createSpace/CreateSpacePage";

export const Route = createFileRoute("/_authenticated/create-space/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CreateSpacePage />;
}
