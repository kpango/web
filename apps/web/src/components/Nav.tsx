import {
  cn,
  FacebookIcon,
  GitHubIcon,
  LinkedInIcon,
  MenuIcon,
  MoonIcon,
  SearchIcon,
  Spinner,
  SunIcon,
  TwitterIcon,
} from "@kpango/ui";
import type { FC } from "hono/jsx";
import { containerClass } from "../lib/styles";

interface NavProps {
  currentPath?: string;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/cv", label: "CV" },
  { href: "/oss", label: "OSS" },
  { href: "/blog", label: "Blog" },
];

const navLinkActive = "bg-accent text-accent-foreground";
const navLinkDefault = "text-muted-foreground hover:text-foreground hover:bg-secondary";

function isLinkActive(href: string, currentPath: string): boolean {
  return href === "/" ? currentPath === "/" : currentPath.startsWith(href);
}

export const Nav: FC<NavProps> = ({ currentPath = "/" }) => (
  <nav class="sticky top-0 z-50 bg-card/80 backdrop-blur border-b border-border">
    <div class={containerClass}>
      <div class="flex items-center justify-between h-16">
        {/* Logo / Name */}
        <a
          href="/"
          class="flex items-center gap-2 font-bold text-foreground hover:text-primary transition-colors"
          aria-label="kpango.com home"
        >
          <span class="text-xl tracking-tight">kpango.com</span>
        </a>

        {/* Desktop nav + search */}
        <div class="hidden sm:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              class={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isLinkActive(link.href, currentPath) ? navLinkActive : navLinkDefault
              )}
            >
              {link.label}
            </a>
          ))}
          <div class="relative ml-2">
            <input
              type="search"
              name="q"
              placeholder="Search…"
              class="w-40 pl-8 pr-3 py-1.5 text-sm bg-secondary border border-input rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
              hx-get="/api/search"
              hx-trigger="keyup changed delay:300ms"
              hx-target="#search-results"
              hx-indicator="#search-spinner"
            />
            <SearchIcon class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <div
              id="search-spinner"
              class="htmx-indicator absolute right-2.5 top-1/2 -translate-y-1/2"
            >
              <Spinner size="sm" />
            </div>
            <div
              id="search-results"
              class="absolute top-full right-0 mt-2 w-80 z-50 bg-card rounded-xl border border-border shadow-xl empty:hidden max-h-96 overflow-y-auto"
            />
          </div>
        </div>

        {/* Dark mode toggle + mobile menu */}
        <div class="flex items-center gap-2">
          <button
            type="button"
            data-toggle-theme
            class="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Toggle dark mode"
          >
            <SunIcon class="w-5 h-5 hidden dark:block" />
            <MoonIcon class="w-5 h-5 block dark:hidden" />
          </button>

          {/* Mobile nav toggle */}
          <button
            type="button"
            class="sm:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Open menu"
            data-toggle-menu
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" class="hidden sm:hidden pb-3 pt-1">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            class={cn(
              "block px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-1",
              isLinkActive(link.href, currentPath) ? navLinkActive : navLinkDefault
            )}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  </nav>
);

const socialLinks = [
  { href: "https://github.com/kpango", label: "GitHub", Icon: GitHubIcon },
  { href: "https://x.com/kpang0", label: "X", Icon: TwitterIcon },
  { href: "https://linkedin.com/in/kpango", label: "LinkedIn", Icon: LinkedInIcon },
  { href: "https://www.facebook.com/kpango0114/", label: "Facebook", Icon: FacebookIcon },
];

export const Footer: FC = () => (
  <footer class="border-t border-border mt-20">
    <div class={`${containerClass} py-8`}>
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Yusuke Kato (kpango). Built with Hono + HTMX.
        </p>
        <div class="flex items-center gap-4">
          {socialLinks.map(({ href, label, Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              class="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={label}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);
