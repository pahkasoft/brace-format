import React from "react";
import BraceFormat from "@tspro/brace-format";
import StdFormat from "@sbrockma/std-format";
import testFormatLib from "@tspro/test-format-lib";

const ImportTsFormatTest: React.FC<{}> = ({ }) => {
    const brace: any[] = [];
    testFormatLib(BraceFormat, (str: string) => brace.push(<>{str}<br /></>))
    const std: any[] = [];
    testFormatLib(StdFormat, (str: string) => std.push(<>{str}<br /></>))

    return (
        <div>
            <h1>TS Import</h1>
            <p>{brace}</p>
            <p>{std}</p>
        </div>
    );
};

export default ImportTsFormatTest;