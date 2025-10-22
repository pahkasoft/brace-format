import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const variants = [
    ["brace-format", "@tspro/brace-format", "BraceFormat"],
    ["std-format", "@sbrockma/std-format", "StdFormat"]
];

const filesToCopy = ["README.md", "CHANGELOG.md", "LICENSE"];

// Delete dist
execSync("npx rimraf ./dist", { stdio: "inherit" });


const rootPkgPath = path.resolve("./package.json");

// Load root package.json (template)
const templateContent = fs.readFileSync(rootPkgPath, "utf8");

for (const variant of variants) {
    const [dirName, pkgName, libName] = variant;

    const distPath = path.resolve("./dist/" + dirName);
    const distPkgPath = path.join(distPath, "package.json");

    console.log(`\n📦 Publishing ${pkgName} ...`);

    try {
        // Replace placeholder with actual package name
        const pkgContent = templateContent.replace(/replace_package_name/g, pkgName);

        // Run tsup build with env var
        execSync(`npx cross-env LIB_NAME=${libName} DIST_PATH=${distPath} npx tsup`, {
            stdio: "inherit",
            shell: true
        });

        // Copy static files into dist
        filesToCopy.forEach(file => {
            const src = path.join(process.cwd(), file);
            const dest = path.join(distPath, file);
            if (fs.existsSync(src)) fs.copyFileSync(src, dest);
        });

        // Write temporary package.json to dist
        fs.writeFileSync(distPkgPath, pkgContent);

        // Run npm pack
        execSync(`npm pack`, { cwd: distPath, stdio: "inherit", shell: true });

        // Publish from dist
        execSync("npm publish --access public --dry-run", {
            cwd: distPath,
            stdio: "inherit"
        });

        console.log(`✅ Successfully published ${pkgName}`);
    } catch (err) {
        console.error(`❌ Failed to publish ${pkgName}`);
        if (err.stderr) console.error(err.stderr.toString());
        if (err.stdout) console.log(err.stdout.toString());
    }
}

console.log("\n✨ Done.");
