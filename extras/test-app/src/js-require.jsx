const React = require("react");
const BraceFormat = require("@tspro/brace-format");
const StdFormat = require("@sbrockma/std-format");
const { FormatTestComp } = require("./format-test");

const JsRequireTestComp = ({ }) => {
    return <>
        <FormatTestComp name="JS BraceFormat (require)" lib={BraceFormat} />
        <FormatTestComp name="JS StdFormat (require)" lib={StdFormat} />
    </>;
}

export default JsRequireTestComp;