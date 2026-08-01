import { createFileRoute, useNavigate } from "@tanstack/react-router";
import ProfileEditPage, {
  type ProfileEditFormData,
} from "@/pages/profileEdit/ProfileEditPage";

export const Route = createFileRoute("/_authenticated/my-page/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const handleSave = async (_data: ProfileEditFormData) => {
    await navigate({ to: "/my-page" });
  };

  return (
    <ProfileEditPage
      onBack={() => navigate({ to: "/my-page" })}
      onSave={handleSave}
    />
  );
}
