# BraceFormat - A Powerfull TS/JS String Formatter

[Homepage](https://pahkasoft.github.io/brace-format) |
[Repository](https://github.com/pahkasoft/brace-format) | 
[Package](https://www.npmjs.com/package/@tspro/brace-format)

## About
BraceFormat is a TS/JS library for powerful string formatting, inspired by
[C++20 format](https://en.cppreference.com/w/cpp/utility/format/spec) and
[Python format](https://docs.python.org/3/library/string.html#formatspec).

Note! Version 4 made `BraceFormat` and it's previous deprecated version 
`StdFormat` the same package, only difference being global name when using
iife browser bundle (`window.BraceFormat` vs. `window.StdFormat`).

## Project Status
This project is now in maintenance. I will fix bugs and add features on request.

## Install
- Install BraceFormat: `npm i @tspro/brace-format`

## Usage

### Import (ESM)

```js
// Import default export
import StrFmt from "@tspro/brace-format";

StrFmt.format("{}, {}!", "Hello", "world");

// Or import named exports
import { format, int, float, setLocale, FormatError } from "@tspro/brace-format";

format("{}, {}!", "Hello", "world");
```

### Require (CommonJS)

```js
const StrFmt = require("@tspro/brace-format");

StrFmt.format("...");
```

### Browser Script
Use the standalone IIFE bundle via unpkg CDN.

Work with BraceFormat:
```html
<script src="https://unpkg.com/@tspro/brace-format@4.0.1/dist/index.global.js"></script>

<script>
    const { format } = window.BraceFormat;
    var str = format("{}, {}!", "Hello", "world");
</script>
```

## API

### `format(str, ...args)`
The main formatting function.
```js
format("{}, {}!", "Hello", "world");
```

### `int()` and `float()`

`int()` and `float()` are wrapper functions that can be used to force *number* to int or float.

```js
format("{}", int(5));   // "5"
format("{}", float(5)); // "5.0"
```

Note: Formatting rules are strict.

```js
format("{:.2e}", int(5)); // Throws, cannot format int as float.
format("{:d}", float(5)); // Throws, cannot format float as int.
```
`float()` simply wraps a *number*, while `int()` wraps a `JSBI.BigInt`, enabling support for large integers.

```js
format("{:d}", int("111111111111111111111111111111"));
```

You can also pass `BigInt` to `format()`, it will be safely wrapped to int().

```js
format("{:d}", BigInt("111111111111111111111111111111"));
```

### `setLocale(locale?)`
Sets the locale for `"n"` and `"L"` specifiers:

```js
setLocale("en-GB");
setLocale(); // Reset to default
```

### `FormatError`
Thrown for formatting violations:

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

## Format Specification
BraceFormat/StdFromat uses replacement fields like {}, {0}, {name}, with support for detailed format specs.

### Replacement Field Structure

    {field_id:arr_1:arr_2:arr_N:elem}

- `field_id`: field id/name
- `arr_*`: array/object presentations
- `elem`: element presentation

Any part can be empty string/omitted.

### Element Presentation
Format specification for element:

    [[fill]align][sign]["z"]["#"]["0"][width][grouping]["." precision]["L"][type]


| Part        | Description          |
| ----------- | -------------------- |
| `fill`      | Any char             |
| `align`     | `<`, `^`, `>`, `=`   |
| `sign`      | `+`, `-`, space      |
| `z`         | Force -0 to +0       |
| `#`         | Alternate form       |
| `0`         | Zero padding         |
| `width`     | Width or nested `{}` |
| `grouping`  | `,` or `_`           |
| `precision` | For floats/strings   |
| `L`         | Locale-aware         |
| `type`      | See type table below |

Types:

| Type      | Description         |
| --------- | ------------------- |
| Omitted   | Default             |
| `s`       | String              |
| `c`       | Char (from int)     |
| `d`       | Decimal int         |
| `n`       | Decimal with locale |
| `b` / `B` | Binary              |
| `o`       | Octal               |
| `x` / `X` | Hex                 |
| `e` / `E` | Scientific float    |
| `f` / `F` | Fixed float         |
| `%`       | Percent             |
| `g` / `G` | General float       |
| `a` / `A` | Hex float           |

### Array/Object Presentation
Format specification for array, set, map and object:

    [[fill]align][width][type]

| Part        | Description          |
| ----------- | -------------------- |
| `fill`      | Any char             |
| `align`     | `<`, `^`, `>`        |
| `width`     | Width or nested `{}` |
| `type`      | See type table below |

Types:

| Type          | Output For Array/Set | Output For Map/Object      |
| ------------- | -------------------- | -------------------------- |
| `d` / Omitted | `[1, 2, 3]`          | `[[a, 1], [b, 2], [c, 3]]` |
| `n`           | `1, 2, 3`            | `a: 1, b: 2, c: 3`         |
| `b`           | `{1, 2, 3}`          | `{{a, 1}, {b, 2}, {c, 3}}` |
| `m`           |                      | `[a: 1, b: 2, c: 3]`       |
| `s`           | `123`                | `a1b2c3`                   |

### More Info

* More information about format specs: 
[C++20 format](https://en.cppreference.com/w/cpp/utility/format/spec) and 
[Python format](https://docs.python.org/3/library/string.html#formatspec).
* Formatting elements is quite standard as in the links above.
* Formatting arrays is less standard so array presentation used here is partly improvised.

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
format("{:10.4s}", "Alligator");         // "Alli      "

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

### Note!
Legacy JavaScript has only a single *number* type, not separate *int* and *float*.

```js
// By default format number as float.
format("{}", 5);   // "5.0"

// To format number as integer, use type "d".
format("{:d}", 5); // "5"

// Or use int() and float() to force type.
format("{}", int(5));   // "5"
format("{}", float(5)); // "5.0"
```

## Compatibility
This library is written in TypeScript and includes type declarations.
Since v3.1.0, it is bundled into ESM, CJS, and IIFE formats using tsup
(previously webpack). No changes should be required in the documented usage.

* Only ES5-compatible JavaScript functions are used.
* CJS and IIFE bundles are transpiled to ES5 for broad compatibility.
* The ESM bundle targets modern environments (ES6+).

While designed with compatibility in mind, the library has not been explicitly
tested against specific Node.js or browser versions.

## Report a Bug
Found a bug or unexpected behavior?

[Please open a new issue.](https://github.com/pahkasoft/brace-format/issues)

You can also suggest a feature or impovement.

Thanks for helping improve the project!

## License
This project is licensed under the [MIT License](https://mit-license.org/).

It also bundles the [JSBI](https://github.com/GoogleChromeLabs/jsbi) library,
which is licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).
