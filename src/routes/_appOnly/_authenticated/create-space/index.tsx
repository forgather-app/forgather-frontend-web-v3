import { createFileRoute, useNavigate } from "@tanstack/react-router";
import CreateSpacePage from "@/pages/createSpace/CreateSpacePage";

export const Route = createFileRoute("/_appOnly/_authenticated/create-space/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <CreateSpacePage
      onSuccess={(spaceCode) =>
        navigate({
          to: "/spaces/$spaceId",
          params: { spaceId: spaceCode },
        })
      }
    />
  );
}
