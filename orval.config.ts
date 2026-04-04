import { defineConfig } from "orval";

export default defineConfig({
  forgather: {
    input: {
      target: "https://api.dev.forgather.app/v3/api-docs",
      override: {
        transformer: (spec) => {
          const paths = spec.paths ?? {};

          for (const path of Object.values(paths)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            for (const method of Object.values(path as Record<string, any>)) {
              if (!method?.parameters) continue;

              for (const param of method.parameters) {
                if (param.in && !param.schema && !param.$ref && !param.content) {
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
      target: "./src/api/generated.ts",
      schemas: "./src/api/model",
      mock: true,
      client: "react-query",
      mode: "single",
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
