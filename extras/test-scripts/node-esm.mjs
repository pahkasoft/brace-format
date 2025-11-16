import * as BraceFormat from "@tspro/brace-format";
import * as StdFormat from "@sbrockma/std-format";
import testFormatLib from "@tspro/test-format-lib";

console.log("---- Node ESM Test ----");
testFormatLib(BraceFormat, console.log);
console.log("");
testFormatLib(StdFormat, console.log);
console.log("");
