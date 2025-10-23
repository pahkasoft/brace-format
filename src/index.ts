import { FloatWrapper, IntWrapper } from "./number-wrapper";
import { FormatStringParser } from "./format-string-parser";
import { GroupingInfo } from "./grouping-info";

/**
 * The main formatting function.
 * 
 * ```js
 * format("{}, {}!", "Hello", "world"); // Returns "Hello, world!"
 * ```
 * 
 * @public
 * @param formatString - Format String, e.g. "{}, {}!".
 * @param formatArgs - Format arguments, e.g. "Hello" and "world".
 * @returns - Formatted string, e.g. "Hello, world!".
 **/
export function format(formatString: string, ...formatArgs: unknown[]): string {
    return FormatStringParser.exec(formatString, formatArgs);
}

/**
 * Because JavaScript has no separate `int` or `float` types, with this
 * number wrapper you can force number to be treated as integer.
 * 
 * ```js
 * format("{}", 5);          // "5.0"
 * format("{}", int(5));     // "5"
 * format("{:.2e}", int(5)); // Throws, cannot format int as float.
 * ```
 * 
 * @public
 * @param value - Integer number value.
 * @returns - Integer number wrapper.
 */
export function int(value?: unknown): unknown {
    return value === undefined || value === null ? value : new IntWrapper(value);
}

/**
 * Because JavaScript has no separate `int` or `float` types, with this
 * number wrapper you can force number to be treated as float.
 * 
 * ```js
 * format("{}", 5);          // "5.0"
 * format("{}", float(5));   // "5.0"
 * format("{:d}", float(5)); // Throws, cannot format float as int.
 * ```
 * 
 * @public
 * @param value - Float number value.
 * @returns - Float number wrapper.
 */
export function float(value?: unknown): unknown {
    return value === undefined || value === null ? value : new FloatWrapper(value);
}

/** 
 * Set locale to use when formatting with `"n"` and `"L"` specifiers:
 *
 * ```js
 * setLocale("en-GB"); // Use en-GB locale.
 * setLocale();        // Use default locale.
 * ```
 * 
 * @public
 * @param locale - Locale string, e.g. "en-GB".
 */
export function setLocale(locale?: string) {
    GroupingInfo.setLocale(locale);
}

/**
 * Exceoption class, thrown on format and value errors.
 * @public
 */
export class FormatError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "FormatError";
        // console.log(this.message);
    }
}

/**
 * Create default export.
 * @public 
 */
const DefaultExport = { format, int, float, setLocale, FormatError }
export default DefaultExport;
