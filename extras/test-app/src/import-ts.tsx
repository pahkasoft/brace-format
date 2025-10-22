import React from "react";
import Fmt from "@tspro/brace-format";
import Fmt2 from "@sbrockma/std-format";

const ImportTsFormatTest: React.FC<{}> = ({ }) => {
    return (
        <div>
            <h1>Import in TypeScript</h1>
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

export default ImportTsFormatTest;