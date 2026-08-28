import { createFileRoute, useNavigate } from "@tanstack/react-router";
import EditSpacePage from "@/pages/editSpace/EditSpacePage";

export const Route = createFileRoute(
  "/_appOnly/_authenticated/spaces/$spaceId/edit/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { spaceId } = Route.useParams();
  const navigate = useNavigate();

  return (
    <EditSpacePage
      spaceId={spaceId}
      onSuccess={() =>
        navigate({ to: "/spaces/$spaceId", params: { spaceId } })
      }
    />
  );
}
