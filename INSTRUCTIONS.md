# Instructions for BraceFormat

## Tasks

### Run Test
    npm run test

### Build
    npm run build

## Profiling
    cd benchmarks
    node --prof ./benchmark.mjs
    node --prof-process ./isolate-*.log > processed.txt

## Publish
    // Update changelog
    git log --pretty="- %s"

    // Update version number
    npm version major|minor|patch

    // Build packages
    node ./scripts/build-variants.mjs

    // Publish packages
    npm login
    npm publish --access public ./packed/tspro-brace-format-x.y.z.tgz
    npm publish --access public ./packed/sbrockma-std-format-x.y.z.tgz

