(function (root, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        // CommonJS / Node
        module.exports = factory();
    } else if (typeof define === "function" && define.amd) {
        // AMD (rare, but safe to include)
        define([], factory);
    } else {
        // Browser global
        root.testFormatLib = factory();
    }
})(typeof self !== "undefined" ? self : this, function () {
    "use strict";

    // Your function(s)
    function testFormatLib(lib, out) {
        out(lib.format("{__LIB_INFO__}"));
        out(lib.format("String Test: {:*^10.5s}", "Hello World!"));
        out(lib.format("Integer Test: {:*<10d}", 256));
        out(lib.format("General Test: {:*>10.02g}", 256.256));
        out(lib.format("Locale Test: {:n}", 9999999999));
        out(lib.format("int() Test: {}", lib.int(99)));
        out(lib.format("float() Test: {}", lib.float(99)));
    }

    // Return what you want to export
    return testFormatLib;
});
