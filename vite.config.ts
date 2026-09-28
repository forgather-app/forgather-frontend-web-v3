/// <reference types="vitest/config" />

// https://vite.dev/config/
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig(({ mode }) => {
  // NOTE: VITE_ENVIRONMENT는 .env.production 파일에 있지만, vite.config.ts는 Node
  // 컨텍스트라 import.meta.env가 아닌 loadEnv로 직접 읽어야 한다.
  const env = loadEnv(mode, process.cwd(), "");
  const isProduction = env.VITE_ENVIRONMENT === "production";

  return {
    plugins: [
      tanstackRouter({
        target: "react",
        autoCodeSplitting: true,
        routesDirectory: "./src/routes",
        generatedRouteTree: "./src/routeTree.gen.ts",
      }),
      react(),
      svgr(),
      // NOTE: 소스맵 업로드용 플러그인. org/project slug는 시크릿이 아니라 직접 명시한다.
      // authToken은 SENTRY_AUTH_TOKEN(VITE_ 접두사 없음 — 붙이면 클라이언트 번들에
      // 노출됨)으로 .env.production 또는 CI 환경변수에 넣고, loadEnv로 읽어 전달한다.
      // 커밋되는 건 변수 "이름"뿐이고 값은 gitignore된 .env.production/CI 시크릿에만 있다.
      isProduction &&
        sentryVitePlugin({
          org: "forgather-wh",
          project: "forgather",
          authToken: env.SENTRY_AUTH_TOKEN,
        }),
    ],
    build: {
      sourcemap: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(dirname, "./src"),
      },
    },
    test: {
      projects: [
        {
          extends: true,
          test: {
            name: "unit",
            environment: "jsdom",
            include: ["src/**/*.{test,spec}.{ts,tsx}"],
            setupFiles: ["./vitest.setup.ts"],
          },
        },
        {
          extends: true,
          plugins: [
            storybookTest({
              configDir: path.join(dirname, ".storybook"),
            }),
          ],
          test: {
            name: "storybook",
            browser: {
              enabled: true,
              headless: true,
              provider: playwright({}),
              instances: [{ browser: "chromium" }],
            },
          },
        },
      ],
    },
  };
});
