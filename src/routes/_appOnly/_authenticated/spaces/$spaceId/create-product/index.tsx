import { createFileRoute } from "@tanstack/react-router";
import useFlowBack from "@/hooks/@common/useFlowBack";
import CreateProductPage from "@/pages/createProduct/CreateProductPage";

export const Route = createFileRoute(
  "/_appOnly/_authenticated/spaces/$spaceId/create-product/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { spaceId } = Route.useParams();
  const flowBack = useFlowBack();

  const backToSpace = () =>
    flowBack({ to: "/spaces/$spaceId", params: { spaceId } });

  return (
    <CreateProductPage
      spaceCode={spaceId}
      onBack={backToSpace}
      onSuccess={backToSpace}
    />
  );
}
