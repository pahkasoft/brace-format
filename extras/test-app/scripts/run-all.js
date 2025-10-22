const { exec } = require("child_process");
const { open } = require("open");

exec("node test-node-cjs.js", (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
    }
    console.log(`Output:\n${stdout}`);
});

exec("node test-node-esm.mjs", (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
    }
    console.log(`Output:\n${stdout}`);
});

(async () => {
    const open = (await import("open")).default;
    open("test-browser.html");
})();
