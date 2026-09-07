import { createFileRoute } from "@tanstack/react-router";
import useFlowBack from "@/hooks/@common/useFlowBack";
import EditSpacePage from "@/pages/editSpace/EditSpacePage";

export const Route = createFileRoute(
  "/_appOnly/_authenticated/spaces/$spaceId/edit/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { spaceId } = Route.useParams();
  const flowBack = useFlowBack();

  return (
    <EditSpacePage
      spaceId={spaceId}
      onSuccess={() =>
        flowBack({ to: "/spaces/$spaceId", params: { spaceId } })
      }
    />
  );
}
