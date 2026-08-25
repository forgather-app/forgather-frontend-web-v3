import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Suspense } from "react";
import {
  getReadGuestBookV2QueryKey,
  getReadUnreadGuestBookQueryKey,
} from "@/api/generated/spaceguestbook-스페이스-방명록";
import GuestbookDetailPage from "@/pages/guestbookDetail/GuestbookDetailPage";

export const Route = createFileRoute(
  "/_appOnly/_authenticated/spaces/$spaceId/guestbook/$guestbookId",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { spaceId, guestbookId } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return (
    <Suspense fallback={null}>
      <GuestbookDetailPage
        spaceId={spaceId}
        currentId={Number(guestbookId)}
        onBack={() => {
          queryClient.invalidateQueries({
            queryKey: getReadGuestBookV2QueryKey(spaceId),
          });
          queryClient.invalidateQueries({
            queryKey: getReadUnreadGuestBookQueryKey(spaceId),
          });
          queryClient.invalidateQueries({
            queryKey: ["guestbook", spaceId, "list"],
          });
          navigate({ to: "/spaces/$spaceId/guestbook", params: { spaceId } });
        }}
        onNavigate={(id) =>
          navigate({
            to: "/spaces/$spaceId/guestbook/$guestbookId",
            params: { spaceId, guestbookId: String(id) },
            replace: true,
          })
        }
      />
    </Suspense>
  );
}
