import { createFileRoute } from "@tanstack/react-router";
import useFlowBack from "@/hooks/@common/useFlowBack";
import useSnackBar from "@/hooks/@common/useSnackBar";
import GuestBookWritePage from "@/pages/guestBookWrite/GuestBookWritePage";

export const Route = createFileRoute("/spaces/$spaceId/guest/guestbook/write")({
  component: RouteComponent,
});

function RouteComponent() {
  const { spaceId } = Route.useParams();
  const flowBack = useFlowBack();
  const { showSnackBar } = useSnackBar();

  const backToGuestbook = () =>
    flowBack({ to: "/spaces/$spaceId/guest/guestbook", params: { spaceId } });

  return (
    <GuestBookWritePage
      spaceCode={spaceId}
      onBack={backToGuestbook}
      onSuccess={() => {
        showSnackBar("방명록을 남겼어요", "alert");
        backToGuestbook();
      }}
    />
  );
}
