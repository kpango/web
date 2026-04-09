export interface PostEntry {
  slug: string;
  frontmatter: {
    title: string;
    description: string;
    date: string;
    tags: string[];
  };
  html: string;
}

const posts: Record<string, PostEntry> = {
  "hello-world": {
    slug: "hello-world",
    frontmatter: {
      title: "Hello World — kpango.com is live",
      description:
        "Introducing the new kpango.com personal portal built with Hono, HTMX, and Tailwind CSS.",
      date: "2024-03-30",
      tags: ["Meta", "Hono", "HTMX", "TypeScript"],
    },
    html: `<h1>Hello World</h1>
<p>Welcome to the new <strong>kpango.com</strong> — my personal portal, rebuilt from scratch.</p>
<h2>Why a rebuild?</h2>
<p>The old site was a static GitHub Pages export. I wanted something that felt more like a living document: a place where my CV, OSS projects, and occasional blog posts all live together in a fast, maintainable codebase.</p>
<h2>Tech stack</h2>
<ul>
<li><a href="https://hono.dev">Hono</a> — lightweight edge-ready web framework for TypeScript</li>
<li><a href="https://htmx.org">HTMX</a> — hypermedia-driven interactivity without a heavy JS framework</li>
<li><a href="https://tailwindcss.com">Tailwind CSS</a> — utility-first CSS for rapid, consistent styling</li>
<li><a href="https://vercel.com/docs/functions/edge-functions">Vercel Edge Functions</a> — globally distributed, near-zero cold starts</li>
<li>TypeScript — strict mode throughout</li>
</ul>
<h2>What's here</h2>
<ul>
<li><strong>/cv</strong> — my full résumé with work history, education, and skills</li>
<li><strong>/oss</strong> — deep dives into the open-source projects I maintain</li>
<li><strong>/blog</strong> — occasional posts on distributed systems, Go, and whatever I'm hacking on</li>
</ul>
<hr>
<p><em>kpango — Tokyo, 2024</em></p>`,
  },
};

export function getPost(slug: string): PostEntry | undefined {
  return posts[slug];
}

export function getAllPosts(): PostEntry[] {
  return Object.values(posts).sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}
