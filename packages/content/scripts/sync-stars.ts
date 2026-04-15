import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const CV_JSON_PATH = path.resolve(ROOT_DIR, "cv.json");

interface OSSProject {
  name: string;
  slug: string;
  description: string;
  url: string;
  stars: number | null;
  tags: string[];
  highlight: string;
}

interface CV {
  oss: OSSProject[];
}

async function fetchGitHubStars(repoUrl: string): Promise<number | null> {
  try {
    const match = repoUrl.match(/github\.com\/([^/]+\/[^/]+)/);
    if (!match) return null;

    const repo = match[1];
    console.log(`Fetching stars for ${repo}...`);

    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "kpango-web-sync",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.error(`Repository not found: ${repo}. Keeping existing stars.`);
      } else if (response.status === 403) {
        console.warn(`GitHub API rate limit exceeded while fetching ${repo}.`);
      } else {
        console.error(
          `Failed to fetch stars for ${repo}: ${response.status} ${response.statusText}`
        );
      }
      return null;
    }

    const data = (await response.json()) as { stargazers_count: number };
    return data.stargazers_count;
  } catch (error) {
    console.error(`Error fetching stars for ${repoUrl}:`, error);
    return null;
  }
}

async function syncStars() {
  if (!fs.existsSync(CV_JSON_PATH)) {
    console.error(`CV file not found at ${CV_JSON_PATH}`);
    return;
  }

  const cv = JSON.parse(fs.readFileSync(CV_JSON_PATH, "utf8")) as CV;

  const results = await Promise.all(
    cv.oss.map(async (project) => {
      const stars = await fetchGitHubStars(project.url);
      if (stars !== null) {
        project.stars = stars;
        return true;
      }
      return false;
    })
  );

  const updatedCount = results.filter(Boolean).length;

  if (updatedCount > 0) {
    fs.writeFileSync(CV_JSON_PATH, `${JSON.stringify(cv, null, 2)}\n`);
    console.log(`Successfully updated stars for ${updatedCount} projects.`);

    // Format with Biome to ensure consistency (since it's JSON, standard biome format works)
    const { execFileSync } = await import("node:child_process");
    try {
      execFileSync("bun", ["x", "@biomejs/biome", "format", "--write", CV_JSON_PATH]);
      console.log("Formatted cv.json with Biome");
    } catch (e) {
      console.error("Failed to format cv.json with Biome:", e);
    }
  } else {
    console.log("No star counts were updated.");
  }
}

syncStars().catch(console.error);
