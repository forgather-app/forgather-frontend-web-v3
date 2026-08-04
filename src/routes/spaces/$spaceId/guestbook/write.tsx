import { createFileRoute, useNavigate } from "@tanstack/react-router";
import useSnackBar from "@/hooks/@common/useSnackBar";
import GuestBookWritePage from "@/pages/guestBookWrite/GuestBookWritePage";

export const Route = createFileRoute("/spaces/$spaceId/guestbook/write")({
  component: RouteComponent,
});

function RouteComponent() {
  const { spaceId } = Route.useParams();
  const navigate = useNavigate();
  const { showSnackBar } = useSnackBar();

  return (
    <GuestBookWritePage
      spaceCode={spaceId}
      onBack={() => navigate({ to: ".." })}
      onSuccess={() => {
        showSnackBar("방명록을 남겼어요", "alert");
        navigate({ to: ".." });
      }}
    />
  );
}
