import { createFileRoute, useNavigate } from "@tanstack/react-router";
import CreateProductPage, {
  type CreateProductFormData,
} from "@/pages/createProduct/CreateProductPage";

export const Route = createFileRoute(
  "/_appOnly/_authenticated/create-product/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  // TODO: 작품 사진/카테고리/작가명 등 후속 단계 및 작품 등록 API 연동
  const handleNext = (_data: CreateProductFormData) => {
    navigate({ to: "/home" });
  };

  return (
    <CreateProductPage
      onBack={() => navigate({ to: "/home" })}
      onNext={handleNext}
    />
  );
}
