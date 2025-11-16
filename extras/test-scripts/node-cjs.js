const BraceFormat = require("@tspro/brace-format");
const StdFormat = require("@sbrockma/std-format");
const testFormatLib = require("@tspro/test-format-lib");

console.log("---- Node CJS Test ----");
testFormatLib(BraceFormat, console.log);
console.log("");
testFormatLib(StdFormat, console.log);
console.log("");
