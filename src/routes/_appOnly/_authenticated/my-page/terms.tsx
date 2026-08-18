import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import MyPageTermsPage from "@/pages/myPageTerms/MyPageTermsPage";

export const Route = createFileRoute("/_appOnly/_authenticated/my-page/terms")({
  component: () => (
    <Suspense fallback={null}>
      <MyPageTermsPage />
    </Suspense>
  ),
});
