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

    // Build and create packages only
    node ./scripts/publish-variants.mjs

    // Build and publish
    npm login
    node ./scripts/publish-variants.mjs --publish

