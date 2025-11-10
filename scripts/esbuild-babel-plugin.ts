import type { Plugin } from "esbuild";
import { transformAsync } from "@babel/core";

export function babelEsbuildPlugin(options: {
  babelOptions?: Record<string, any>;
} = {}): Plugin {
  return {
    name: "babel-esbuild-plugin",
    setup(build) {
      build.onLoad({ filter: /\.[jt]sx?$/ }, async (args) => {
        const fs = await import("fs/promises");
        const source = await fs.readFile(args.path, "utf8");

        const result = await transformAsync(source, {
          filename: args.path,
          babelrc: true,
          configFile: true,
          ...options.babelOptions,
        });

        return {
          contents: result?.code ?? source,
          loader: "js",
        };
      });
    },
  };
}
