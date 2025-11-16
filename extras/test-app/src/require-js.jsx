const React = require("react");
const BraceFormat = require("@tspro/brace-format");
const StdFormat = require("@sbrockma/std-format");
const testFormatLib = require("@tspro/test-format-lib");

const RequireJsFormatTest = ({ }) => {
    const brace = [];
    testFormatLib(BraceFormat, str => brace.push(<>{str}<br /></>))
    const std = [];
    testFormatLib(StdFormat, str => std.push(<>{str}<br /></>))

    return (
        <div>
            <h1>JS Require</h1>
            <p>{brace}</p>
            <p>{std}</p>
        </div>
    );
};

export default RequireJsFormatTest;