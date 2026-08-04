import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import MyPage from "@/pages/myPage/MyPage";

export const Route = createFileRoute("/_authenticated/my-page/")({
  component: () => (
    <Suspense fallback={null}>
      <MyPage />
    </Suspense>
  ),
});
