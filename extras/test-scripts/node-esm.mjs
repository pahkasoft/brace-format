import formatTest from "@tspro/format-test-script";

console.log("---- Node ESM Test ----");
console.log("");

formatTest(await import("@tspro/brace-format"), console.log);
console.log("");

formatTest(await import("@sbrockma/std-format"), console.log);
console.log("");
