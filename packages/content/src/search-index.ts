export interface SearchIndexEntry {
  id: string;
  title: string;
  url: string;
  excerpt: string;
  keywords: string;
}

export const searchIndex: SearchIndexEntry[] = [
  {
    id: "cv",
    title: "CV — Yusuke Kato",
    url: "/cv",
    excerpt:
      "Distributed Systems, Search, Cloud, and Security specialist at LINE Yahoo! Japan. Expert in Go, Kubernetes, and distributed systems.",
    keywords:
      "cv resume work experience education yusuke kato kpango line yahoo japan vector search kubernetes go distributed systems security athenz awards",
  },
  {
    id: "vald",
    title: "Vald — Distributed Vector Search Engine",
    url: "/oss",
    excerpt:
      "Highly scalable distributed ANN vector search engine. Cloud-native, Kubernetes-native.",
    keywords:
      "vald vector search ann approximate nearest neighbor distributed kubernetes go",
  },
  {
    id: "gache",
    title: "Gache — Ultra-Fast Lock-Free Cache",
    url: "/oss",
    excerpt:
      "Ultra-fast lock-free in-memory cache. 8.5× faster than go-cache, zero allocations.",
    keywords: "gache cache lock-free performance go xxhash",
  },
  {
    id: "glg",
    title: "Glg — Fast Go Logger",
    url: "/oss",
    excerpt:
      "Faster than Go standard logger with leveled logging and colorized output.",
    keywords: "glg logger logging go performance leveled color",
  },
  {
    id: "fastime",
    title: "Fastime — Zero-Alloc Time Library",
    url: "/oss",
    excerpt:
      "Super fast time library for Go with zero memory allocation.",
    keywords: "fastime time go performance zero allocation fast",
  },
  {
    id: "garm",
    title: "Garm — Kubernetes Authorization Webhook",
    url: "/oss",
    excerpt:
      "Kubernetes authorization webhook integrating Athenz for fine-grained access control.",
    keywords:
      "garm kubernetes authorization webhook athenz rbac access control go",
  },
  {
    id: "athenz-authorizer",
    title: "Athenz Authorizer — Policy & Certificate Manager",
    url: "/oss",
    excerpt:
      "Go library that caches Athenz policies and certificates for authentication and authorization.",
    keywords:
      "athenz authorizer policy certificate authorization authentication go security",
  },
  {
    id: "authorization-proxy",
    title: "Authorization Proxy — Athenz Sidecar Proxy",
    url: "/oss",
    excerpt:
      "Kubernetes sidecar reverse proxy for API endpoint authentication and authorization using Athenz.",
    keywords:
      "authorization proxy sidecar kubernetes athenz reverse proxy oauth2 role token mtls go",
  },
  {
    id: "athenz-client-sidecar",
    title: "Athenz Client Sidecar — Credential Retrieval",
    url: "/oss",
    excerpt:
      "Kubernetes sidecar to retrieve authentication and authorization credentials from Athenz.",
    keywords:
      "athenz client sidecar kubernetes credential token ntoken access token role token go",
  },
  {
    id: "blog-hello-world",
    title: "Hello World — kpango.com is live",
    url: "/blog/hello-world",
    excerpt:
      "Introducing the new kpango.com personal portal built with Hono, HTMX, and Tailwind CSS.",
    keywords: "hono htmx tailwind typescript vercel edge blog meta",
  },
];
