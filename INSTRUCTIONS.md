# Instructions for BraceFormat

## Tasks

### Build
    npm run build

### Run Test
    npm run test

### Profiling
    cd benchmarks
    node --prof ./benchmark.mjs
    node --prof-process ./isolate-*.log > processed.txt

### Run Test App
    npm run start:test-app

### Run Test Scripts
    npm run test-script:cjs
    npm run test-script:esm
    npm run test-script:browser
    npm run test-script:all

## Publish
    // Update changelog
    git log --pretty="- %s"

    // Update version in package.json to "x.y.z".
    // Then
    git commit -a -m "vx.y.z"
    git tag vx.y.z

    // Build packages
    npm run build

    // Publish packages
    npm login
    npm publish --access public ./packed/tspro-brace-format-x.y.z.tgz
    npm publish --access public ./packed/sbrockma-std-format-x.y.z.tgz

