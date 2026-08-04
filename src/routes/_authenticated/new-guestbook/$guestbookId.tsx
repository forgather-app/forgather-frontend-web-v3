import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { GuestbookCardDetail } from "@/pages/guestbookDetail/GuestbookDetailPage";
import GuestbookDetailPage from "@/pages/guestbookDetail/GuestbookDetailPage";

export const Route = createFileRoute(
  "/_authenticated/new-guestbook/$guestbookId",
)({
  component: RouteComponent,
});

// TODO: 방명록 단건 조회 API(useReadCardSuspense) 연동 후 더미 데이터 제거
const DUMMY_CARDS: GuestbookCardDetail[] = [
  {
    id: 1,
    nickname: "김게더",
    createdAt: new Date(2026, 1, 3, 16, 42),
    message:
      "그동안 고생 많았어!  작업 멋지다. 언제든 연락해 밥 한 번 살게~! 그동안 고생 많았어!  작업 멋지다. 언제든 연락해 밥 한 번 살게~!",
  },
  {
    id: 2,
    nickname: "김게더",
    createdAt: new Date(2026, 1, 3, 16, 42),
    message:
      "그동안 고생 많았어!  작업 멋지다. 언제든 연락해 밥 한 번 살게~! 그동안 고생 많았어!  작업 멋지다. 언제든 연락해 밥 한 번 살게~!그동안 고생 많았어!  작업 멋지다. 언제든 연락해 밥 한 번 살게~! 그동안 고생 많았어!  작업 멋지다. 언제든 연락해 밥 한 번 살게~!그동안 고생 많았어!  작업 멋지다. 언제든 연락해 밥 한 번 살게~! 그동안 고생 많았어!  작업 멋지다. 언제든 연락해 밥 한 번 살게~!그동안 고생 많았어!  작업 멋지다. 언제든 연락해 밥 한 번 살게~! 그동안 고생 많았어!  작업 멋지다. 언제든 연락해 밥 한 번 살게~!그동안 고생 많았어!  작업 멋지다. 언제든 연락해 밥 한 번 살게~! 그동안 고생 많았어!  작업 멋지다. 언제든 연락해 밥 한 번 살게~!그동안 고생 많았어!  작업 멋지다. 언제든 연락해 밥 한 번 살게~! 그동안 고생 많았어!  작업 멋지다. 언제든 연락해 밥 한 번 살게~!그동안 고생 많았어!  작업 멋지다. 언제든 연락해 밥 한 번 살게~! 그동안 고생 많았어!  작업 멋지다. 언제든 연락해 밥 한 번 살게~!그동안 고생 많았어!  작업 멋지다. 언제든 연락해 밥 한 번 살게~! 그동안 고생 많았어!  작업 멋지다. 언제든 연락해 밥 한 번 살게~!그동안 고생 많았어!  작업 멋지다. 언제든 연락해 밥 한 번 살게~! 그동안 고생 많았어!  작업 멋지다. 언제든 연락해 밥 한 번 살게~! 그동안 고생 많았어!  작업 멋지다. 언제든 연락해 밥 한 번 살게~! 그동안 고생 많았어!  작업 멋지다. 언제든 연락해 밥 한 번 살게~!그동안 고생 많았어!  작업 멋지다. 언제든 연락해 밥 한 번 살게~! 그동안 고생 많았어!  작업 멋지다. 언제든 연락해 밥 한 번 살게~!그동안 고생 많았어!  작업 멋지다. 언제든 연락해 밥 한 번 살게~! 그동안 고생 많았어!  작업 멋지다. 언제든 연락해 밥 한 번 살게~!",
    photo: { currentIndex: 1, totalCount: 2 },
  },
  {
    id: 3,
    nickname: "박아트",
    createdAt: new Date(2026, 1, 5, 11, 20),
    // 스크롤 영역 확인용 — 화면 높이를 넘기는 긴 메시지
    message: Array(8)
      .fill("그동안 고생 많았어!  작업 멋지다. 언제든 연락해 밥 한 번 살게~!")
      .join(" "),
  },
];

function RouteComponent() {
  const { guestbookId } = Route.useParams();
  const navigate = useNavigate();

  return (
    <GuestbookDetailPage
      cards={DUMMY_CARDS}
      currentId={Number(guestbookId)}
      onBack={() => navigate({ to: ".." })}
      onNavigate={(id) =>
        navigate({
          to: "/new-guestbook/$guestbookId",
          params: { guestbookId: String(id) },
        })
      }
    />
  );
}
