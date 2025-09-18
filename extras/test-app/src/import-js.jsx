import React from "react";
import Fmt from "@tspro/brace-format";
import { format } from "@tspro/brace-format";

const ImportTsFormatTest = ({ }) => {
    return (
        <div>
            <h1>Import in JavaScript</h1>
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