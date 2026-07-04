import { createFileRoute, useNavigate } from "@tanstack/react-router";
import CreateSpacePage from "@/pages/createSpace/CreateSpacePage";

export const Route = createFileRoute("/create-space/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <CreateSpacePage
      onBack={() => navigate({ to: ".." })}
      onComplete={() => navigate({ to: "/create-space/complete" })}
    />
  );
}
