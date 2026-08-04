import {
  createFileRoute,
  Outlet,
  useMatches,
  useNavigate,
} from "@tanstack/react-router";
import SpaceLayout from "@/pages/space/SpaceLayout";

export const Route = createFileRoute("/_authenticated/spaces/$spaceId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { spaceId } = Route.useParams();
  const navigate = useNavigate();
  const isGuestBookTab = useMatches().some(
    (match) => match.routeId === "/_authenticated/spaces/$spaceId/guestbook",
  );

  return (
    <SpaceLayout
      activeTab={isGuestBookTab ? "right" : "left"}
      onBack={() =>
        isGuestBookTab
          ? navigate({ to: "/spaces/$spaceId", params: { spaceId } })
          : navigate({ to: "/home" })
      }
      onArtworkTabClick={() =>
        navigate({ to: "/spaces/$spaceId", params: { spaceId } })
      }
      onGuestBookTabClick={() =>
        navigate({ to: "/spaces/$spaceId/guestbook", params: { spaceId } })
      }
    >
      <Outlet />
    </SpaceLayout>
  );
}
