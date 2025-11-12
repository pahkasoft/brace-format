(function (root, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        // CommonJS / Node
        module.exports = factory();
    } else if (typeof define === "function" && define.amd) {
        // AMD (rare, but safe to include)
        define([], factory);
    } else {
        // Browser global
        root.formatTest = factory();
    }
})(typeof self !== "undefined" ? self : this, function () {
    "use strict";

    // Your function(s)
    function formatTest(lib, log) {
        log(lib.format("Lib Info: {__LIB_INFO__}"));
        log(lib.format("String Test: {:*^20s}", "Hello World"));
        log(lib.format("Int Test: {}", lib.int(99)));
        log(lib.format("Float Test: {}", lib.float(99)));
        log(lib.format("Locale Test: {:n}", 9999999999));
    }

    // Return what you want to export
    return formatTest;
});
