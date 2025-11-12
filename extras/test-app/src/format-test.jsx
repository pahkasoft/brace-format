import React from "react";
import formatTest from "@tspro/format-test-script"

export const FormatTestComp = (props) => {
    let result = [];

    formatTest(props.lib, str => result.push(str));

    return (
        <div>
            <h1>{props.name}</h1>
            <p>{result.map(r => <>{r}<br /></>)}</p>
        </div>
    );
};
