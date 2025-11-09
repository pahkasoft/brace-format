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

const ConfigEntries: { entry: Record<string, string>, format: Format }[] = [
    // esm bundle
    { entry: { 'index': 'src/index.ts' }, format: 'esm' },
    // cjs bundle
    { entry: { 'index': 'src/index.ts' }, format: 'cjs' },
    // global bundle (kept for legacy support, renamed to iife).
    { entry: { 'index.global': 'src/index.ts' }, format: 'iife' },
    // iife bundle
    { entry: { 'index.iife': 'src/index.ts' }, format: 'iife' },
    // polyfilled iife bundle
    { entry: { 'index.polyfilled.iife': 'src/index.polyfilled.ts' }, format: 'iife' }
];

const TsupConfig: Options[] = ConfigEntries.map((cfg, cfgId) => {
    const isIIFE = cfg.format === 'iife';
    return {
        entry: cfg.entry,
        outDir: DIST_PATH,
        target: cfg.format === 'esm' ? 'es2015' : 'es5', // Let'skeep it how it was.
        format: [cfg.format],
        dts: cfg.format === 'cjs',
        globalName: isIIFE ? LIB_NAME : undefined,
        sourcemap: !isIIFE,
        minify: isIIFE,
        clean: cfgId === 0,
        external: isIIFE ? undefined : ['jsbi'],
        noExternal: isIIFE ? ['jsbi'] : undefined,
        banner: {
            js: `/* ${LIB_NAME} v${pkg.version} (${cfg.format}) | (c) 2025 PahkaSoft | MIT License | Includes JSBI (Apache License 2.0) */`
        },
        define: {
            __LIB_INFO__: JSON.stringify(`${LIB_NAME} v${pkg.version} (${cfg.format})`)
        },
        outExtension: isIIFE ? (() => ({ js: '.js' })) : undefined,
    }
});

export default defineConfig(TsupConfig);
