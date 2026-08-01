import { useNavigate } from "@tanstack/react-router";
import { useGetSpacesInformation } from "@/api/generated/space-스페이스";
import type { ApiResponseHostSpaceResponse } from "@/api/model";

const buttonStyle = {
  display: "block",
  marginTop: 16,
  padding: "8px 16px",
  border: "1px solid white",
  color: "white",
  borderRadius: 8,
} as const;

const PAGE_LINKS = [
  { label: "홈 페이지 이동 (임시)", to: "/home" },
  { label: "마이 페이지 이동 (임시)", to: "/my-page" },
  { label: "로그인 페이지 이동 (임시)", to: "/login" },
  { label: "회원가입 페이지 이동 (임시)", to: "/sign-up" },
  { label: "전시 생성 페이지 이동 (임시)", to: "/create-exhibition" },
  { label: "방명록 목록 페이지 이동 (임시)", to: "/new-guestbooks" },
  {
    label: "방명록 개별 페이지 이동 (임시)",
    to: "/new-guestbook/$guestbookId",
    params: { guestbookId: "1" },
  },
  {
    label: "스페이스 메인(작품) 페이지 이동 (임시, spaceCode 하드코딩)",
    to: "/spaces/$spaceId",
    // TODO: 현재 로그인 계정에 연결된 실제 스페이스가 없어 테스트용으로 하드코딩. 계정에 스페이스가 생기면 firstSpaceCode 방식으로 교체
    params: { spaceId: "fqvtn394y0" },
  },
] as const;

function MainPage() {
  const navigate = useNavigate();

  const { data: spaces } = useGetSpacesInformation({
    query: {
      select: (response) =>
        // TODO: 응답 content-type이 `*/*`로 내려와 orval이 실제 스키마 대신 Blob으로 추론함 — 백엔드가 application/json으로 명시하면 캐스팅 제거 가능
        (response as unknown as ApiResponseHostSpaceResponse).data?.spaces ??
        [],
    },
  });
  const firstSpaceCode = spaces?.[0]?.spaceCode;

  // TODO: 실제 페이지 구현 시 변경 필요
  return (
    <div style={{ border: "1px solid white", flex: 1, color: "white" }}>
      메인페이지
      {PAGE_LINKS.map(({ label, ...navigateOptions }) => (
        <button
          key={navigateOptions.to}
          type="button"
          onClick={() => navigate(navigateOptions)}
          style={buttonStyle}
        >
          {label}
        </button>
      ))}
      {firstSpaceCode && (
        <button
          type="button"
          onClick={() =>
            navigate({
              to: "/spaces/$spaceId/guestbook",
              params: { spaceId: firstSpaceCode },
            })
          }
          style={buttonStyle}
        >
          방명록 페이지 이동 (임시)
        </button>
      )}
      {firstSpaceCode && (
        <button
          type="button"
          onClick={() =>
            navigate({
              to: "/spaces/$spaceId",
              params: { spaceId: firstSpaceCode },
            })
          }
          style={buttonStyle}
        >
          스페이스 메인(작품) 페이지 이동 (임시)
        </button>
      )}
    </div>
  );
}

export default MainPage;
