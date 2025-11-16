import * as BraceFormat from "@tspro/brace-format";
import * as StdFormat from "@sbrockma/std-format";

function runTest(Fmt) {
    const { format, int } = Fmt;

    console.log("---- Node ESM Test ----");
    console.log(Fmt.format("{__LIB_INFO__}"));
    console.log(Fmt.format("Test 1: {} {}, {}!", "Hello", "World", Fmt.int(99)));
    console.log(format("Test 2: {} {}, {}!", "Hello", "World", int(99)));
    console.log(format("Test 'n': {:n}", 9999999999));
    console.log("");
}

runTest(BraceFormat);
runTest(StdFormat);