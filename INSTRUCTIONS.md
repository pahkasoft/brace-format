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
### Update Changelog
    git log --pretty="- %s"

### Update Version Numbers
    // Change version in package.json: "x.y.z"
    // Create git commit
    git commit -a -m "vx.y.z"
    // Create git tag
    git tag vx.y.z

### Build
    npm run build

### Test Package
    // Build command creates and copies packages to packed/.

### Publish
    npm login
    npm publish --access public ./packed/tspro-brace-format-x.y.z.tgz
    npm publish --access public ./packed/sbrockma-std-format-x.y.z.tgz
