# BraceFormat TS/JS String Formatter
BraceFormat is a TS/JS string formatter using brace notation, inspired by
[C++20 format](https://en.cppreference.com/w/cpp/utility/format/spec) and
[Python format](https://docs.python.org/3/library/string.html#formatspec).

## Disclaimer!

This is a hobby project—I'm building it for fun and to learn, but I'm putting
real effort into making it solid! That said, there might still be some bugs or
unexpected behavior. Please keep that in mind when using it!

## Note!
Legacy JavaScript has only a single *number* type, not separate *int* and *float*.
```js
// By default format number as float.
format("{}", 5);   // "5.0"

// To format number as integer, use type "d".
format("{:d}", 5); // "5"

// Now you can also use int() and float() wrappers. See more below.
format("{}", int(5));   // "5"
format("{}", float(5)); // "5.0"
```

## Install
```sh
npm i @tspro/brace-format
```

## Compatibility
This library is written in TypeScript and includes type declarations.
It is bundled with Webpack into ESM, CJS, and UMD formats.

* Only ES5-compatible JavaScript functions are used.
* No polyfills are included.
* CJS and UMD bundles are transpiled with Babel for ES5/IE11 compatibility.
* ESM bundle targets modern environments (ES6+).

While designed for compatibility in mind, the library has not been explicitly
tested against specific Node.js or browser versions.

## Usage

### ESM
```js
// Import default export
import StrFmt from "@tspro/brace-format";

StrFmt.format("...");

// Or import named exports
import { format, int, float, setLocale, FormatError } from "@tspro/brace-format";

format("...");
```

### CJS
```js
const StrFmt = require("@tspro/brace-format");

StrFmt.format("...");
```

### UMD (browser)
This version is bundled with dependencies so it can be used standalone in browser.

Available via the unpkg CDN. Use with version @3.
```html
<script src="https://unpkg.com/@tspro/brace-format@3"></script>

<script>
    var format = window.BraceFormat.format;
    format("...");
</script>
```

## Declarations

### Function ```format(str, ...args)```
This is the main formatting function.
```js
format("{} {}!", "Hello", "World");
```

### Functions ```int()``` and ```float()```

```int()``` and ```float()``` are wrapper functions that can be used to force *number* to int or float.

```js
format("{}", int(5));   // "5"
format("{}", float(5)); // "5.0"
```

Note: Formatting rules are strict.

```js
format("{:.2e}", int(5)); // Throws, cannot format int as float.
format("{:d}", float(5)); // Throws, cannot format float as int.
```
```float()``` simply wraps a *number*, while ```int()``` wraps a ```JSBI.BigInt```, enabling support for large integers.

```js
format("{:d}", int("111111111111111111111111111111"));
```

You can also pass ```BigInt``` to ```format()```, it will be safely wrapped to int().

```js
format("{:d}", BigInt("111111111111111111111111111111"));
```

### Function ```setLocale(locale)```

Default locale is automatically detected.
Locale affects decimal and grouping separators when using the ```"n"``` or ```"L"``` specifiers.

```js
setLocale("en-UK");
setLocale(); // Reset to default
```

### Class ```FormatError```
```js
try {
    format("{:s}", 42);
} 
catch(e) {
    if(e instanceof FormatError) {
        console.error(e);
    }
}
```

## String Formatting
Replacement field is enclosed in braces ```{}``` and consists of parts separated by colon ```:```.

    {field_id:arr_1:arr_2:arr_N:elem}

- First part (field_id) is field number/id.
- Last part (elem) is **element presentation**.
- Parts between (arr_1...arr_N) are **array presentations**.

Any part can be empty string/omitted. Following are valid:

    {}
    {field_id}
    {:elem}
    {::}
    {field_id:elem}

### Element presentation
Format specification for element:

    [[fill]align][sign]["z"]["#"]["0"][width][grouping]["." precision]["L"][type]

#### fill
Fill can be any single codepoint character.

#### align
* ```"<"``` Forces the field to be left-aligned within field width.
* ```"^"``` Forces the field to be centered within field width.
* ```">"``` Forces the field to be right-aligned within field width.
* ```"="``` Forces the padding to be placed after the sign (if any) but before the digits.

#### sign
* ```"+"``` Use sign for both positive and negative numbers.
* ```"-"``` Use sign only for negative numbers.
* ```" "``` Use leading space for positive numbers, and minus sign for negative numbers.

#### "z"
Force negative zero to positive zero for floating point types.

#### "#"
Use alternate form. For integers add "0b", "0B", "0o", "0x", "0X" prefix to the result. For floats always include decimal point character. For "g" and "G" types trailing zeroes are not removed.

#### "0"
Preceding the width field by "0" character enables sign-aware zero-padding for numeric types. This is same as using a fill character of "0" with an alignment type of "=".

#### width
Positive integer or nested field ```{field_id}``` specifying width of field.

#### grouping
Specifies digit group separator for numeric types.
* ```","``` Insert comma every 3 digits for decimal and floating points types.
* ```"_"``` Insert underscore every 3 digits for decimal and floating point types. For binary, octal and hex types, insert underscore every 4 digits.

#### precision
Positive integer or nested field {field_id}. For floating point types specifies the precision. For string types specifies how many characters will be used from the field content.

#### "L"
The ```"L"``` option causes the locale-specific form to be used.

#### type
* ```""``` (omitted) Default format.
* ```"s"``` String format.
* ```"c"``` Character format. Convert integer to unicode character.
* ```"d"``` Decimal integer format.
* ```"n"``` Same as "d" but use digit group separators from to locale settings.
* ```"b" | "B"``` Binary format.
* ```"o"``` Octal format.
* ```"x" | "X"``` Hexadecimal format.
* ```"e" | "E"``` Scientific floating point format.
* ```"f" | "F"``` Fixed floating point format.
* ```"%"``` Percent format. Same as fixed floating point format but multiplied by 100.
* ```"g" | "G"``` General floating point format.
* ```"a" | "A"``` Normalised hexadecimal exponential format.

### Array presentation
Format specification for array, set, map and object:

    [[fill]align][width][type]

#### fill
Fill can be any single codepoint character.

#### align
* ```"<"``` Forces the field to be left aligned within field width.
* ```"^"``` Forces the field to be centered within field width.
* ```">"``` Forces the field to be right aligned within field width.

#### width
Positive integer or nested field ```{field_id}``` specifying width of field.

#### type
* ```"" | "d"``` Default format.  
    For array/set this is ```"[a, b, c]"```.  
    For map/object this is ```"[[a, 1], [b, 2], [c, 3]]"```.
* ```"n"``` No brackets [ ] around data.  
    For array/set this is ```"a, b, c"```.  
    For map/object this is ```"a: 1, b: 2, c: 3"```.
* ```"b"``` Use curly braces { } instead of brackets [ ].  
    For array/set this is ```"{a, b, c}"```.  
    For map/object this is ```"{{a, 1}, {b, 2}, {c, 3}}"```.
* ```"m"``` Use map format.  
    For map/object this is ```"[a: 1, b: 2, c: 3]"```.
* ```"s"``` Output content without any brackets/braces and separators.  
    For array/set this is ```"abc"```.  
    For map/object this is ```"a1b2c3"```.

## Examples
```js
// Using auto field numbering
format("{}{}", "A", "B"); // "AB"

// Using manual field numbering
format("{1}{0}", "A", "B"); // "BA"

// Using named fields
format("{name} {age:d}", { name: "Tim", age: 95 }); // "Tim 95"

// Fill, align and width
format("{:0<8d}", 777);  // "77700000"
format("{:0^8d}", 777);  // "00777000"
format("{:0>8d}", -777); // "0000-777"
format("{:0=8d}", -777); // "-0000777"

// Precision
format("{:.2f}", 1); // "1.00"

// String width
format("{:10.4s}", "Alligator"); // "Alli      "

// With nested arguments
format("{:{}.{}s}", "Alligator", 10, 4); // "Alli      "

// Array
format("{:d}", [1, 2, 3]); // "[1, 2, 3]"

// Set
format("{:d}", new Set([1, 2, 3, 2])); // "[1, 2, 3]"

// Map
format("{:m:}", new Map([["x", 1], ["y", -1]])); // "[x: 1.0, y: -1.0]"

// Object
format("{{{:n:}}}", { x: 1, y: -1}); // "{x: 1.0, y: -1.0}"

// Floating point types
format("{0:.3e} {0:.3f} {0:.3%} {0:.3g} {0:.3a}", Math.PI); // "3.142e+00 3.142 314.159% 3.14 1.922p+1"

// Integer types
format("{0:#b} {0:#o} {0:#d} {0:#x} {0:c}", 65); // "0b1000001 0o101 65 0x41 A"
```

## License
This project is licensed under the [zlib License](./LICENSE).

It also bundles the [JSBI](https://github.com/GoogleChromeLabs/jsbi) library,
which is licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).

Please see the [LICENSE](./LICENSE) file for full details.
