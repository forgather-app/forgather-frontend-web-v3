import { createFileRoute, useNavigate } from "@tanstack/react-router";
import CreateProductPage from "@/pages/createProduct/CreateProductPage";

export const Route = createFileRoute(
  "/_appOnly/_authenticated/spaces/$spaceId/create-product/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { spaceId } = Route.useParams();
  const navigate = useNavigate();

  return (
    <CreateProductPage
      spaceCode={spaceId}
      onBack={() => navigate({ to: "/spaces/$spaceId", params: { spaceId } })}
      onSuccess={() =>
        navigate({ to: "/spaces/$spaceId", params: { spaceId } })
      }
    />
  );
}
