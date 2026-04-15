import { getAllOss, siteData } from "@kpango/content";
import cvData from "@kpango/content/cv.json";
import type { AuthorCardProps } from "@kpango/ui";
import type { CV } from "../types";

/**
 * Data Service: The Logic layer responsible for retrieving and
 * transforming content for the Implementation layer (Pages/Components).
 */

const cv = cvData as CV;
const profileLookup = Object.fromEntries(
  cv.basics.profiles.map((p) => [p.network, p]),
);

export const ContentService = {
  getCV(): CV {
    return cv;
  },

  getSiteData() {
    return siteData;
  },

  getAuthor(): AuthorCardProps {
    const githubProfile = profileLookup.GitHub;

    return {
      name: cv.basics.name,
      title: `${cv.basics.label} @ ${siteData.home.hero.company}`,
      githubUrl: githubProfile?.url ?? "",
      githubHandle: cv.basics.nickname,
    };
  },

  getFeaturedOss(limit = 4) {
    return getAllOss().slice(0, limit);
  },

  getProfileUrl(network: string): string {
    return profileLookup[network]?.url ?? "";
  },

  getAwardEmoji(title: string): string {
    const awards = siteData.awards as Record<string, string>;
    return awards[title] ?? awards.default ?? "🏆";
  },
};
