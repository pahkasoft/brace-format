import Benchmark from "benchmark";
import * as StdFormat from "../dist/sbrockma-std-format/dist/index.mjs";
import * as BraceFormat from "../dist/tspro-brace-format/dist/index.mjs";

const tasks = [
    {
        name: "Format small string",
        template: "Hello, {name}!",
        data: { name: "World" }
    },
    {
        name: "Format large string",
        template: "{greeting}, {name}! Today is {day}.".repeat(50),
        data: { greeting: "Hi", name: "Alice", day: "Monday" }
    },
    {
        name: "Format fraction with fill and align",
        template: "{num:*^20.5f}",
        data: { num: Math.PI }
    },
];

function runTest(libName, lib) {
    const suite = new Benchmark.Suite();

    tasks.forEach(d => {
        suite.add(libName + ": " + d.name, () => lib.format(d.template, d.data));
    });

    suite
        .on("cycle", (event) => {
            console.log(String(event.target));
        })
        .on("complete", function () {
            console.log("Fastest is " + this.filter("fastest").map("name"));
        })
        .run({ async: true });
}

runTest("StdFormat", StdFormat);
runTest("BraceFormat", BraceFormat);