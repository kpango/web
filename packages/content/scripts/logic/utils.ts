import fs from "node:fs";
import path from "node:path";

export function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

export function writeIfChanged(filePath: string, newContent: string) {
  if (fs.existsSync(filePath)) {
    const currentContent = fs.readFileSync(filePath, "utf8");
    if (currentContent === newContent) {
      return;
    }
  }

  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filePath, newContent);
  console.log(`Updated ${path.basename(filePath)}`);
}

export const stripMarkdown = (md: string) =>
  md
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Links
    .replace(/[#*`_~]/g, "") // Special chars
    .replace(/\n+/g, " ") // Newlines
    .trim();

export const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .split(/\s+/)
    .filter((w, i, a) => w.length > 1 && a.indexOf(w) === i)
    .join(" ");
