import React from "react";
import BraceFormat from "@tspro/brace-format";
import StdFormat from "@sbrockma/std-format";
import { FormatTestComp } from "./format-test";

const TsImportTestComp: React.FC<{}> = ({ }) => {
    return <>
        <FormatTestComp name="TS BraceFormat (import)" lib={BraceFormat} />
        <FormatTestComp name="TS StdFormat (import)" lib={StdFormat} />
    </>;
}

export default TsImportTestComp;