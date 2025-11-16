import React from "react";
import BraceFormat from "@tspro/brace-format";
import StdFormat from "@sbrockma/std-format";
import testFormatLib from "@tspro/test-format-lib";

const ImportTsFormatTest = ({ }) => {
    const brace = [];
    testFormatLib(BraceFormat, str => brace.push(<>{str}<br /></>))
    const std = [];
    testFormatLib(StdFormat, str => std.push(<>{str}<br /></>))

    return (
        <div>
            <h1>JS Import</h1>
            <p>{brace}</p>
            <p>{std}</p>
        </div>
    );
};

export default ImportTsFormatTest;