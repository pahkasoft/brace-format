const React = require("react");
const Fmt = require("@tspro/brace-format");
const Fmt2 = require("@sbrockma/std-format");

const RequireJsFormatTest = ({ }) => {
    return (
        <div>
            <h1>Require in JavaScript</h1>
            <p>
                {Fmt.format("{__LIB_INFO__}")}
            </p>
            <p>
                {Fmt.format("Format Test: {} {}, {:d}", "Hello", "World", 5)}
            </p>
            <hr />
            <p>
                {Fmt2.format("{__LIB_INFO__}")}
            </p>
            <p>
                {Fmt2.format("Format Test: {} {}, {:d}", "Hello", "World", 5)}
            </p>
            <hr />
        </div>
    );
};

export default RequireJsFormatTest;