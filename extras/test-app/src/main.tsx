import "core-js/stable";
import "regenerator-runtime/runtime";
import "bootstrap/dist/css/bootstrap.min.css"
import React from "react";
import { createRoot } from "react-dom/client";
import RequireJsFormatTest from "./require-js";
import ImportJsFormatTest from "./import-js";
import ImportTsFormatTest from "./import-ts";

class Test extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);

        this.state = {}
    }

    render() {
        return <>
            <RequireJsFormatTest />
            <ImportJsFormatTest />
            <ImportTsFormatTest />
        </>
    }
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
    <React.StrictMode>
        <Test />
    </React.StrictMode>
);
