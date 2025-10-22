
function runTest(pkg) {
    const Fmt = require(pkg);
    const { format, int } = require(pkg);

    console.log("---- Node CJS Test ----");
    console.log(Fmt.format("{__LIB_INFO__}"));
    console.log(Fmt.format("Test 1: {} {}, {}!", "Hello", "World", Fmt.int(99)));
    console.log(format("Test 2: {} {}, {}!", "Hello", "World", int(99)));
    console.log(format("Test 'n': {:n}", 9999999999));
    console.log("");
}

runTest("@tspro/brace-format");
runTest("@sbrockma/std-format");