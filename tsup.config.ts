// tsup.config.ts
import { defineConfig } from 'tsup'
import pkg from './package.json' assert { type: 'json' }

const bannerText = `/* BraceFormat v${pkg.version} | (c) 2025 PahkaSoft | Licensed under the MIT License | Includes JSBI (Apache License 2.0) */`;

export default defineConfig([
    // ESM bundle (no JSBI bundled)
    {
        entry: ['src/index.ts'],
        outDir: 'dist',
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
            __LIB_INFO__: JSON.stringify(`BraceFormat v${pkg.version} (esm)`)
        },
    },

    // CJS bundle (no JSBI bundled)
    {
        entry: ['src/index.ts'],
        outDir: 'dist',
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
            __LIB_INFO__: JSON.stringify(`BraceFormat v${pkg.version} (cjs)`)
        },
    },

    // IIFE bundle (includes JSBI)
    {
        entry: ['src/index.ts'],
        outDir: 'dist',
        target: 'es5',
        format: ['iife'],
        globalName: 'BraceFormat',
        sourcemap: true,
        minify: true,
        clean: false, // Don't wipe dist from the previous build
        banner: {
            js: bannerText
        },
        define: {
            __LIB_INFO__: JSON.stringify(`BraceFormat v${pkg.version} (iife)`),
        },
        noExternal: ['jsbi'], // Bundle jsbi
    }
]);
