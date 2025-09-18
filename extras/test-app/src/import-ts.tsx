import React from "react";
import Fmt from "@tspro/brace-format";
import { format } from "@tspro/brace-format";

const ImportTsFormatTest: React.FC<{}> = ({ }) => {
    return (
        <div>
            <h1>Import in TypeScript</h1>
            <p>
                {Fmt.format("{__LIB_INFO__}")}
            </p>
            <p>
                {format("Format Test: {} {}, {:d}", "Hello", "World", 5)}
            </p>
        </div>
    );
};

export default ImportTsFormatTest;