const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const out = path.join(root, "www");
const files = [
  "index.html",
  "styles.css",
  "app.js",
  "manifest.webmanifest",
  "sw.js"
];

function copyFile(relativePath) {
  const source = path.join(root, relativePath);
  const target = path.join(out, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

function copyDir(relativePath) {
  const sourceDir = path.join(root, relativePath);
  const targetDir = path.join(out, relativePath);
  fs.mkdirSync(targetDir, { recursive: true });
  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const source = path.join(sourceDir, entry.name);
    const target = path.join(targetDir, entry.name);
    if (entry.isDirectory()) {
      copyDir(path.join(relativePath, entry.name));
    } else {
      fs.copyFileSync(source, target);
    }
  }
}

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
files.forEach(copyFile);
copyDir("assets");
console.log(`Built mobile web assets in ${out}`);