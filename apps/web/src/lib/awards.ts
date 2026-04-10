/** Award title → emoji mapping used on both the Home and CV pages. */
export const awardEmojis: Record<string, string> = {
  "HackDay 2019 Technology Award": "🏆",
  "IPSJ Industrial Achievement Award 2019": "🎖️",
  "PwC Technology Hackathon 2017 Winner": "🏆",
  "SB Cloud Hackathon 2016 Winner": "🏆",
  "AngelHack JP 2016 — 2nd Place": "🥈",
  "HackU (Yahoo! Japan) 2014 Technology Award": "🏆",
};

/** Look up the emoji for an award title, defaulting to 🏆. */
export function awardEmoji(title: string): string {
  return awardEmojis[title] ?? "🏆";
}
