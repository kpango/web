import fs from "node:fs";
import path from "node:path";

const cssPath = path.join(process.cwd(), "dist/assets/main.css");
const proseCssPath = path.join(process.cwd(), "dist/assets/prose.css");
const outPath = path.join(process.cwd(), "src/styles/inline-css.js");

function escapeCss(css) {
  return css.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

let content = "";

if (fs.existsSync(cssPath)) {
  const css = fs.readFileSync(cssPath, "utf8").trim();
  content += `export const inlineStyles = \`${escapeCss(css)}\`;\n`;
} else {
  content += "export const inlineStyles = '';\n";
}

if (fs.existsSync(proseCssPath)) {
  const proseCss = fs.readFileSync(proseCssPath, "utf8").trim();
  content += `export const proseStyles = \`${escapeCss(proseCss)}\`;\n`;
} else {
  content += "export const proseStyles = '';\n";
}

fs.writeFileSync(outPath, content);
console.log("Inlined CSS successfully");
