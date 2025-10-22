// tsup.config.ts
import { defineConfig } from 'tsup'
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

console.log("tsup: LIB_NAME  =" + LIB_NAME);
console.log("tsup: DIST_PATH =" + DIST_PATH);

const bannerText = `/* ${LIB_NAME} v${pkg.version} | (c) 2025 PahkaSoft | Licensed under the MIT License | Includes JSBI (Apache License 2.0) */`;

export default defineConfig([
    // ESM bundle (no JSBI bundled)
    {
        entry: ['src/index.ts'],
        outDir: DIST_PATH,
        target: 'es2015',
        format: ['esm'],
        dts: true,
        sourcemap: true,
        clean: true,
        external: ['jsbi'],
        banner: {
            js: bannerText
        },
        define: {
            __LIB_INFO__: JSON.stringify(`${LIB_NAME} v${pkg.version} (esm)`)
        },
    },

    // CJS bundle (no JSBI bundled)
    {
        entry: ['src/index.ts'],
        outDir: DIST_PATH,
        target: 'es5',
        format: ['cjs'],
        dts: true,
        sourcemap: true,
        clean: false, // Don't wipe dist from the previous build
        external: ['jsbi'],
        banner: {
            js: bannerText
        },
        define: {
            __LIB_INFO__: JSON.stringify(`${LIB_NAME}t v${pkg.version} (cjs)`)
        },
    },

    // IIFE bundle (includes JSBI)
    {
        entry: ['src/index.ts'],
        outDir: DIST_PATH,
        target: 'es5',
        format: ['iife'],
        globalName: LIB_NAME,
        sourcemap: true,
        minify: true,
        clean: false, // Don't wipe dist from the previous build
        banner: {
            js: bannerText
        },
        define: {
            __LIB_INFO__: JSON.stringify(`${LIB_NAME} v${pkg.version} (iife)`),
        },
        noExternal: ['jsbi'], // Bundle jsbi
    }
]);
