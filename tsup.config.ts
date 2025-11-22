// tsup.config.ts
import { defineConfig, Format, Options } from 'tsup'
import pkg from './package.json' assert { type: 'json' }

const LIB_NAME = process.env.LIB_NAME;

if (!LIB_NAME) {
    console.error("❌ LIB_NAME is undefined!");
    process.exit(1);
}

const DIST_PATH = process.env.DIST_PATH;

if (!DIST_PATH) {
    console.error("❌ DIST_PATH is undefined!");
    process.exit(1);
}

console.log("tsup: LIB_NAME  = " + LIB_NAME);
console.log("tsup: DIST_PATH = " + DIST_PATH);

const configEntries: { entry: Record<string, string>, format: Format }[] = [
    { entry: { 'index': 'src/index.ts' }, format: 'esm' },
    { entry: { 'index': 'src/index.ts' }, format: 'cjs' },
    { entry: { 'index.global': 'src/index.ts' }, format: 'iife' }
];

const tsupConfig: Options[] = configEntries.map((cfg, cfgId) => {
    return {
        clean: cfgId === 0,
        entry: cfg.entry,
        outDir: DIST_PATH,
        target: cfg.format === 'esm' ? 'es2015' : 'es5',
        format: cfg.format,
        globalName: cfg.format === 'iife' ? "StdFormat" : undefined,
        dts: cfg.format === 'cjs',
        minify: cfg.format === 'iife',
        sourcemap: cfg.format !== 'iife',
        external: cfg.format === 'iife' ? [] : ['jsbi'],
        noExternal: cfg.format === 'iife' ? ['jsbi'] : [],
        banner: {
            js: `/* StdFormat v${pkg.version} | (c) 2025 PahkaSoft | MIT License | Includes JSBI (Apache License 2.0) */`
        },
        footer: LIB_NAME === "BraceFormat" ? {
            js: `
(function () {
  // The primary IIFE gives you:
  //   window.StdFormat
  //   StdFormat   (because globalName is used)

  // Extra window alias:
  if (typeof window !== "undefined") {
    window.BraceFormat = window.StdFormat;
  }

  // Extra bare global alias:
  try {
    // Non-window global (works in browsers and workers)
    globalThis.BraceFormat = globalThis.StdFormat;
  } catch {}
})();
`,
        } : undefined,
        define: {
            __LIB_INFO__: JSON.stringify(`StdFormat v${pkg.version} (${cfg.format})`)
        },
        outExtension({ format }) {
            if (format === 'esm') return { js: ".mjs" };
            if (format === 'cjs') return { js: ".js" };
            if (format === 'iife') return { js: ".js" };
            return { js: '.js' }
        },
    }
});

export default defineConfig(tsupConfig);
