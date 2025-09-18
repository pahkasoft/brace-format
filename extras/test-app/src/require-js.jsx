const React = require("react");
const Fmt = require("@tspro/brace-format");

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
        </div>
    );
};

export default RequireJsFormatTest;