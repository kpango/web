import type { Child, FC } from "hono/jsx";

interface IconProps {
  class?: string;
}

const SvgIcon: FC<IconProps & { children: Child | Child[]; fill?: string; stroke?: string }> = ({
  class: className,
  children,
  fill,
  stroke,
}) => (
  <svg
    class={className}
    fill={fill || "none"}
    stroke={stroke || "none"}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {children}
  </svg>
);

/** Create a filled SVG icon component. */
function filledIcon(path: string, defaultSize = "w-5 h-5"): FC<IconProps> {
  return ({ class: className = defaultSize }) => (
    <SvgIcon class={className} fill="currentColor">
      <path d={path} />
    </SvgIcon>
  );
}

/** Create a stroked SVG icon component. */
function strokedIcon(path: string, defaultSize = "w-5 h-5"): FC<IconProps> {
  return ({ class: className = defaultSize }) => (
    <SvgIcon class={className} stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={path} />
    </SvgIcon>
  );
}

export const GitHubIcon = filledIcon(
  "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
);

export const TwitterIcon = filledIcon(
  "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
);

export const FacebookIcon = filledIcon(
  "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
);

export const LinkedInIcon = filledIcon(
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
);

export const ChevronRightIcon = strokedIcon("M9 5l7 7-7 7", "w-4 h-4");
export const ChevronLeftIcon = strokedIcon("M15 19l-7-7 7-7", "w-4 h-4");
export const MailIcon = strokedIcon(
  "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  "w-4 h-4"
);
export const SearchIcon = strokedIcon("M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", "w-3.5 h-3.5");
export const SunIcon = strokedIcon(
  "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
);
export const MoonIcon = strokedIcon(
  "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
);
export const MenuIcon = strokedIcon("M4 6h16M4 12h16M4 18h16");
export const PrintIcon = strokedIcon(
  "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z",
  "w-4 h-4"
);
