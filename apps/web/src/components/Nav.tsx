import { siteData } from "@kpango/content";
import {
  cn,
  containerClass,
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

interface NavProps {
  currentPath?: string;
}

const navLinks = siteData.nav;

const navLinkActive = "bg-accent text-accent-foreground";
const navLinkDefault = "text-muted-foreground hover:text-foreground hover:bg-secondary";

const isLinkActive = (href: string, currentPath: string) =>
  href === "/" ? currentPath === "/" : currentPath.startsWith(href);

const NavLogo: FC = () => (
  <a
    href="/"
    class="flex items-center gap-2 font-bold text-foreground hover:text-primary transition-colors"
    aria-label={`${siteData.siteName} home`}
  >
    <span class="text-xl tracking-tight">{siteData.siteName}</span>
  </a>
);

const NavLink: FC<{ href: string; label: string; currentPath: string; mobile?: boolean }> = ({
  href,
  label,
  currentPath,
  mobile,
}) => (
  <a
    href={href}
    class={cn(
      "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
      mobile ? "block mb-1" : "",
      isLinkActive(href, currentPath) ? navLinkActive : navLinkDefault
    )}
  >
    {label}
  </a>
);

const SearchBar: FC = () => (
  <div class="relative ml-2">
    <input
      type="search"
      name="q"
      placeholder={siteData.search.placeholder}
      class="w-40 pl-8 pr-3 py-1.5 text-sm bg-secondary border border-input rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
      hx-get="/api/search"
      hx-trigger="keyup changed delay:300ms"
      hx-target="#search-results"
      hx-indicator="#search-spinner"
    />
    <SearchIcon class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
    <div id="search-spinner" class="htmx-indicator absolute right-2.5 top-1/2 -translate-y-1/2">
      <Spinner size="sm" />
    </div>
    <div
      id="search-results"
      class="absolute top-full right-0 mt-2 w-80 z-50 bg-card rounded-xl border border-border shadow-xl empty:hidden max-h-96 overflow-y-auto"
    />
  </div>
);

export const Nav: FC<NavProps> = ({ currentPath = "/" }) => (
  <nav class="sticky top-0 z-50 bg-card/80 backdrop-blur border-b border-border">
    <div class={containerClass}>
      <div class="flex items-center justify-between h-16">
        <NavLogo />

        <div class="hidden sm:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} currentPath={currentPath} />
          ))}
          <SearchBar />
        </div>

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

      <div id="mobile-menu" class="hidden sm:hidden pb-3 pt-1">
        {navLinks.map((link) => (
          <NavLink key={link.href} {...link} currentPath={currentPath} mobile />
        ))}
      </div>
    </div>
  </nav>
);

const SocialIcons: Record<string, FC> = {
  GitHubIcon,
  TwitterIcon,
  LinkedInIcon,
  FacebookIcon,
};

export const Footer: FC = () => {
  const year = new Date().getFullYear();
  const copyright = siteData.footer.copyright.replace("{year}", year.toString());

  return (
    <footer class="border-t border-border mt-20">
      <div class={`${containerClass} py-8`}>
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-sm text-muted-foreground">{copyright}</p>
          <div class="flex items-center gap-4">
            {siteData.socialLinks.map(({ href, label, icon }) => {
              const Icon = SocialIcons[icon];
              return (
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
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};
