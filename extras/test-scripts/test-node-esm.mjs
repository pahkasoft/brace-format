import * as Fmt from '@tspro/brace-format';
import { format, int } from '@tspro/brace-format';

console.log("Node ESM Test");
console.log(Fmt.format("{__LIB_INFO__}"));
console.log(Fmt.format("Test 1: {} {}, {}!", "Hello", "World", Fmt.int(99)));
console.log(format("Test 2: {} {}, {}!", "Hello", "World", int(99)));
console.log(format("Test 'n': {:n}", 9999999999));
