import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const variants = [
    ["tspro-brace-format", "@tspro/brace-format", "BraceFormat"],
    ["sbrockma-std-format", "@sbrockma/std-format", "StdFormat"]
];

const filesToCopy = ["README.md", "CHANGELOG.md", "LICENSE"];
const rootPkgPath = path.resolve("./package.json");
const packedDir = path.resolve("./packed");

// Clean dist and packed folders
execSync("npx rimraf ./dist", { stdio: "inherit" });
execSync("npx rimraf ./packed", { stdio: "inherit" });
fs.mkdirSync(packedDir, { recursive: true });

for (const [dirName, pkgName, libName] of variants) {
    const bundlePath = path.resolve("./dist", dirName);
    const bundleDistPath = path.resolve("./dist", dirName, "dist");
    const bundlePkgPath = path.join(bundlePath, "package.json");

    console.log(`\n📦 Building ${pkgName} ...`);

    try {
        // Build variant
        execSync(`npx cross-env LIB_NAME=${libName} DIST_PATH=${bundleDistPath} npx tsup`, {
            stdio: "inherit",
            shell: true
        });

        // Copy static files
        for (const file of filesToCopy) {
            const src = path.join(process.cwd(), file);
            const dest = path.join(bundlePath, file);
            if (fs.existsSync(src)) fs.copyFileSync(src, dest);
        }

        // Write variant package.json
        const pkg = JSON.parse(fs.readFileSync(rootPkgPath, "utf8"));
        pkg.name = pkgName;
        delete pkg.devDependencies;
        delete pkg.scripts;
        delete pkg.watch;
        delete pkg.browserslist;
        fs.writeFileSync(bundlePkgPath, JSON.stringify(pkg, null, 2));

        // Create npm pack tarball
        const tarballName = execSync("npm pack --quiet", {
            cwd: bundlePath,
            encoding: "utf8",
            shell: true
        }).trim();

        // Move tarball to ./packed
        const tarballPath = path.join(bundlePath, tarballName);
        const packedPath = path.join(packedDir, tarballName);
        fs.renameSync(tarballPath, packedPath);

        console.log(`✅ Packed: ${packedPath}`);
    }
    catch (err) {
        console.error(`❌ Failed for ${pkgName}`);
        if (err.stderr) console.error(err.stderr.toString());
    }
}

console.log("\n✨ Done. All .tgz files are in ./packed/");
