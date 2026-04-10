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
      "Distributed Systems, Search, Cloud, and Security specialist at LY Corporation. Expert in Go, Kubernetes, and distributed systems.",
    keywords:
      "cv resume work experience education yusuke kato kpango line yahoo japan vector search kubernetes go distributed systems security athenz awards",
  },
  {
    id: "oss-athenz-authorizer",
    title: "Athenz Authorizer - Policy Caching Library",
    url: "/oss/athenz-authorizer",
    excerpt:
      "Go library that caches Athenz policies and certificates for authentication and authorization of service requests",
    keywords: "go athenz authorization security oss open source athenz-authorizer",
  },
  {
    id: "oss-athenz-client-sidecar",
    title: "Athenz Client Sidecar - Credential Retrieval Sidecar",
    url: "/oss/athenz-client-sidecar",
    excerpt:
      "Kubernetes sidecar container providing a common interface to retrieve authentication and authorization credentials from Athenz server",
    keywords: "go kubernetes athenz sidecar security oss open source athenz-client-sidecar",
  },
  {
    id: "oss-authorization-proxy",
    title: "Authorization Proxy - Athenz Sidecar Reverse Proxy",
    url: "/oss/authorization-proxy",
    excerpt:
      "Kubernetes sidecar reverse proxy for API endpoint authentication and authorization using Athenz",
    keywords: "go kubernetes athenz sidecar reverse proxy oss open source authorization-proxy",
  },
  {
    id: "oss-fastime",
    title: "Fastime - Ultra-Fast Time Library",
    url: "/oss/fastime",
    excerpt:
      "Super fast time library for Go with zero memory allocation, returning approximate current time via background goroutine",
    keywords: "go performance time zero-alloc oss open source fastime",
  },
  {
    id: "oss-gache",
    title: "Gache - Ultra-Fast Lock-Free Cache",
    url: "/oss/gache",
    excerpt: "Ultra-fast lock-free in-memory cache library using concurrent map and xxhash",
    keywords: "go cache performance lock-free xxhash oss open source gache",
  },
  {
    id: "oss-garm",
    title: "Garm - Kubernetes Authorization Webhook for Athenz",
    url: "/oss/garm",
    excerpt:
      "Kubernetes authorization webhook integrating with Athenz for fine-grained RBAC access control on K8s resources",
    keywords: "go kubernetes authorization athenz oss open source garm",
  },
  {
    id: "oss-glg",
    title: "Glg - High-Speed Logging Library",
    url: "/oss/glg",
    excerpt:
      "High-speed logging library for Go with leveled logging and colorized output, designed for high-volume log output",
    keywords: "go logging performance oss open source glg",
  },
  {
    id: "oss-vald",
    title: "Vald - Distributed Vector Search Engine",
    url: "/oss/vald",
    excerpt:
      "A highly scalable distributed approximate nearest neighbor dense vector search engine",
    keywords: "go kubernetes vector search distributed systems cloud native oss open source vald",
  },
  {
    id: "blog-hello-world",
    title: "Hello World — kpango.com is live",
    url: "/blog/hello-world",
    excerpt:
      "Introducing the new kpango.com personal portal built with Hono, HTMX, and Tailwind CSS",
    keywords: "meta hono htmx typescript cloudflare blog",
  },
];
