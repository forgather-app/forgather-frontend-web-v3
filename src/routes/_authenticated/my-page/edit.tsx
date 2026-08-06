import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import ProfileEditPage from "@/pages/profileEdit/ProfileEditPage";

export const Route = createFileRoute("/_authenticated/my-page/edit")({
  component: () => (
    <Suspense fallback={null}>
      <ProfileEditPage />
    </Suspense>
  ),
});
