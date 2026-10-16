import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Suspense } from "react";
import GuestHostProfilePage from "@/pages/guestHostProfile/GuestHostProfilePage";
import NotFoundPage from "@/pages/notFound/NotFoundPage";

export const Route = createFileRoute("/hosts/$hostCode")({
  component: RouteComponent,
  notFoundComponent: NotFoundPage,
});

function RouteComponent() {
  const { hostCode } = Route.useParams();
  const navigate = useNavigate();

  return (
    <Suspense fallback={null}>
      <GuestHostProfilePage
        hostCode={hostCode}
        onBack={() => window.history.back()}
        onSpaceClick={(spaceCode) =>
          navigate({
            to: "/spaces/$spaceId/guest",
            params: { spaceId: spaceCode },
          })
        }
      />
    </Suspense>
  );
}
