import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import LoginPage from "../pages/login/LoginPage";

const createStoryRouter = () => {
  const rootRoute = createRootRoute({ component: LoginPage });
  return createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });
};

const meta: Meta = {
  title: "Pages/LoginPage",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "로그인 온보딩 페이지입니다.\n\n두 개의 슬라이드를 좌우 스와이프로 전환할 수 있으며, 하단 버튼 클릭 시 회원가입 퍼널로 진입합니다.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ margin: "-16px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "기본 로그인 화면. 좌우 스와이프로 슬라이드 전환.",
      },
    },
  },
  render: () => <RouterProvider router={createStoryRouter()} />,
};
