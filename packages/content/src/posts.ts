export interface PostEntry {
  slug: string;
  frontmatter: {
    title: string;
    description: string;
    date: string;
    lastUpdated?: string;
    tags: string[];
  };
  html: string;
  search: {
    titleLow: string;
    excerptLow: string;
    keywordsLow: string;
  };
}

const posts: Record<string, PostEntry> = {
  "hello-world": {
    slug: "hello-world",
    frontmatter: {
      title: "Hello World — kpango.com is live",
      description:
        "Introducing the new kpango.com personal portal built with Hono, HTMX, and Tailwind CSS",
      date: "2026-04-08",
      tags: ["Meta", "Hono", "HTMX", "TypeScript", "Cloudflare"],
      lastUpdated: "2026-04-15",
    },
    html: `<h1>Hello World</h1>
<p>Welcome to the new <strong>kpango.com</strong> — my personal portal, rebuilt from scratch.</p>
<h2>Why a rebuild?</h2>
<p>The old site was a static GitHub Pages export. It served its purpose, but I wanted something that felt more like a living document: a place where my CV, OSS projects, and occasional blog posts all live together in a fast, maintainable codebase.</p>
<h2>Tech stack</h2>
<ul>
<li><strong><a href="https://hono.dev">Hono</a></strong> — lightweight edge-ready web framework for <a href="https://www.typescriptlang.org">TypeScript</a></li>
<li><strong><a href="https://htmx.org">HTMX</a></strong> — hypermedia-driven interactivity without a heavy JS framework</li>
<li><strong><a href="https://tailwindcss.com">Tailwind CSS</a></strong> — utility-first CSS for rapid, consistent styling</li>
<li><strong><a href="https://workers.cloudflare.com">Cloudflare Workers</a></strong> — globally distributed, near-zero cold starts</li>
<li><strong><a href="https://www.typescriptlang.org">TypeScript</a></strong> — strict mode throughout; no <code>any</code></li>
</ul>
<p>The entire UI is rendered server-side with <code>hono/jsx</code>. HTMX handles partial page updates and <code>hx-boost</code> gives SPA-like navigation without a client-side router.</p>
<h2>What&#39;s here</h2>
<ul>
<li><strong>/cv</strong> — my full résumé with work history, education, and skills</li>
<li><strong>/oss</strong> — deep dives into the open-source projects I maintain (Vald, Gache, Glg, Garm…)</li>
<li><strong>/blog</strong> — occasional posts on distributed systems, Go, and whatever I&#39;m hacking on</li>
</ul>
<h2>What&#39;s next</h2>
<p>I plan to add vector search powered by Cloudflare Vectorize so you can semantically search across all content on the site. Stay tuned.</p>
<hr>
<p><em>kpango — Tokyo, 2026</em></p>`,
    search: {
      titleLow: "hello world — kpango.com is live",
      excerptLow:
        "introducing the new kpango.com personal portal built with hono, htmx, and tailwind css",
      keywordsLow:
        "hello world kpangocom is live introducing the new personal portal built with hono htmx and tailwind css meta typescript cloudflare welcome to my rebuilt from scratch why rebuild old site was static github pages export it served its purpose but wanted something that felt more like living document place where cv oss projects occasional blog posts all together in fast maintainable codebase tech stack lightweight edge-ready web framework for hypermedia-driven interactivity without heavy js utility-first rapid consistent styling workers globally distributed near-zero cold starts strict mode throughout no any entire ui rendered server-side honojsx handles partial page updates hx-boost gives spa-like navigation client-side router whats here full rsum work history education skills deep dives into open-source maintain vald gache glg garm on systems go whatever im hacking next plan add vector search powered by vectorize so you can semantically across content stay tuned --- kpango tokyo 2026",
    },
  },
};

export function getPost(slug: string): PostEntry | undefined {
  return posts[slug];
}

let cachedPosts: PostEntry[] | null = null;

export function getAllPosts(): PostEntry[] {
  if (cachedPosts) return cachedPosts;
  cachedPosts = Object.values(posts).sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
  return cachedPosts;
}
