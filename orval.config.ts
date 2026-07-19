import { defineConfig } from "orval";

export default defineConfig({
  forgather: {
    input: {
      target: "https://api.dev.forgather.app/v3/api-docs",
      override: {
        transformer: (spec) => {
          const paths = spec.paths ?? {};

          for (const path of Object.values(paths)) {
            // biome-ignore lint/suspicious/noExplicitAny: OpenAPI path spec has no strict type
            for (const method of Object.values(path as Record<string, any>)) {
              if (!method?.parameters) continue;

              for (const param of method.parameters) {
                if (
                  param.in &&
                  !param.schema &&
                  !param.$ref &&
                  !param.content
                ) {
                  param.schema = { type: "string" };
                }
              }
            }
          }

          return spec;
        },
      },
    },
    output: {
      target: "./src/api/generated/index.ts",
      schemas: "./src/api/model",
      mock: false,
      client: "react-query",
      mode: "tags",
      override: {
        mutator: {
          path: "./src/api/customFetcher.ts",
          name: "customFetcher",
        },
        query: {
          useSuspenseQuery: true,
        },
      },
    },
  },
});
