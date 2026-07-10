import { useNavigate } from "@tanstack/react-router";

const buttonStyle = {
  display: "block",
  marginTop: 16,
  padding: "8px 16px",
  border: "1px solid white",
  color: "white",
  borderRadius: 8,
} as const;

const PAGE_LINKS = [
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
    label: "방명록 페이지 이동 (임시)",
    to: "/spaces/$spaceId/guestbook",
    params: { spaceId: "1" },
  },
] as const;

function MainPage() {
  const navigate = useNavigate();

  // TODO: 실제 페이지 구현 시 변경 필요
  return (
    <div style={{ border: "1px solid white", flex: 1, color: "white" }}>
      메인페이지
      {PAGE_LINKS.map((link) => (
        <button
          key={link.to}
          type="button"
          onClick={() => navigate(link)}
          style={buttonStyle}
        >
          {link.label}
        </button>
      ))}
    </div>
  );
}

export default MainPage;
