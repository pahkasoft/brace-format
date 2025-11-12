import "core-js/stable";
import "regenerator-runtime/runtime";
import "bootstrap/dist/css/bootstrap.min.css"
import React from "react";
import { createRoot } from "react-dom/client";
import JsRequireTestComp from "./js-require";
import JsImportTestComp from "./js-import";
import TsImportTestComp from "./ts-import";

class TestApp extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);

        this.state = {}
    }

    render() {
        return <div className="container">
            <JsRequireTestComp />
            <JsImportTestComp />
            <TsImportTestComp />
        </div>
    }
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
    <React.StrictMode>
        <TestApp />
    </React.StrictMode>
);
