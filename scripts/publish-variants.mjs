import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const variants = [
    ["tspro-brace-format", "@tspro/brace-format", "BraceFormat"],
    ["sbrockma-std-format", "@sbrockma/std-format", "StdFormat"]
];

const filesToCopy = ["README.md", "CHANGELOG.md", "LICENSE"];

// Delete dist
execSync("npx rimraf ./dist", { stdio: "inherit" });


const rootPkgPath = path.resolve("./package.json");

// Load root package.json (template)
const templateContent = fs.readFileSync(rootPkgPath, "utf8");

for (const variant of variants) {
    const [dirName, pkgName, libName] = variant;

    const bundlePath = path.resolve("./dist/" + dirName);
    const bundlePkgPath = path.join(bundlePath, "package.json");
    const bundleDistPath = bundlePath + "/dist";

    console.log(`\n📦 Publishing ${pkgName} ...`);

    try {
        // Replace placeholder with actual package name
        const pkgContent = templateContent.replace(/replace_package_name/g, pkgName);

        // Run tsup build with env var
        execSync(`npx cross-env LIB_NAME=${libName} DIST_PATH=${bundleDistPath} npx tsup`, {
            stdio: "inherit",
            shell: true
        });

        // Copy static files into dist
        filesToCopy.forEach(file => {
            const src = path.join(process.cwd(), file);
            const dest = path.join(bundlePath, file);
            if (fs.existsSync(src)) fs.copyFileSync(src, dest);
        });

        // Write temporary package.json to dist
        fs.writeFileSync(bundlePkgPath, pkgContent);

        // Create npm pack
        execSync(`npm pack --quiet`, {
            cwd: bundlePath,
            stdio: "inherit",
            shell: true
        });

        // Publish from dist
        execSync("npm publish --access public --dry-run", {
            cwd: bundlePath,
            stdio: "inherit"
        });

        console.log(`✅ Successfully published ${pkgName}`);
    }
    catch(err) {
        console.error(`❌ Failed to publish ${pkgName}`);
        if (err.stderr) console.error(err.stderr.toString());
        if (err.stdout) console.log(err.stdout.toString());
    }
}

console.log("\n✨ Done.");
