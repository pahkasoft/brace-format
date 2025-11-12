const formatTest = require("@tspro/format-test-script");

console.log("---- Node CJS Test ----");
console.log("");

formatTest(require("@tspro/brace-format"), console.log);
console.log("");

formatTest(require("@sbrockma/std-format"), console.log);
console.log("");
