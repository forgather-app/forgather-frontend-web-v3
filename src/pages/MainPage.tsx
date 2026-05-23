import { useNavigate } from "@tanstack/react-router";

function MainPage() {
  const navigate = useNavigate();

  // TODO: 실제 페이지 구현 시 변경 필요
  return (
    <div style={{ border: "1px solid white", flex: 1, color: "white" }}>
      메인페이지
      <button
        type="button"
        onClick={() =>
          navigate({
            to: "/spaces/$spaceId/guestbook",
            params: { spaceId: "1" },
          })
        }
        style={{
          display: "block",
          marginTop: 16,
          padding: "8px 16px",
          border: "1px solid white",
          color: "white",
          borderRadius: 8,
        }}
      >
        방명록 페이지 이동 (임시)
      </button>
    </div>
  );
}

export default MainPage;
