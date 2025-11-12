import React from "react";
import BraceFormat from "@tspro/brace-format";
import StdFormat from "@sbrockma/std-format";
import { FormatTestComp } from "./format-test";

const JsImportTestComp = ({ }) => {
    return <>
        <FormatTestComp name="JS BraceFormat (import)" lib={BraceFormat} />
        <FormatTestComp name="JS StdFormat (import)" lib={StdFormat} />
    </>;
}

export default JsImportTestComp;