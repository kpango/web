export interface OssEntry {
  slug: string;
  frontmatter: {
    title: string;
    description: string;
    github: string;
    stars: number;
    tags: string[];
    highlight?: string;
  };
  html: string;
}

const oss: Record<string, OssEntry> = {
  "athenz-authorizer": {
    slug: "athenz-authorizer",
    frontmatter: {
      title: "Athenz Authorizer - Policy Caching Library",
      description:
        "Go library that caches Athenz policies and certificates for authentication and authorization of service requests",
      github: "https://github.com/AthenZ/athenz-authorizer",
      stars: 9,
      highlight:
        "Core component of the transparent auth proxy that keeps policy cache within the sidecar, dramatically reducing communication overhead.",
      tags: ["Go", "Athenz", "Authorization", "Security"],
    },
    html: `<h1>Athenz Authorizer</h1>
<p>Athenz Authorizer is a Go library that provides efficient caching and verification of <a href="https://www.athenz.io/">Athenz</a> policies and certificates for authentication and authorization of service requests.</p>
<h2>Overview</h2>
<p>When integrating Athenz into microservices, querying the Athenz server on every request introduces unacceptable latency. Athenz Authorizer solves this by maintaining a local cache of policies, role certificates, and public keys — enabling authorization decisions to be made locally in microseconds rather than milliseconds.</p>
<h2>Key Features</h2>
<ul>
<li><strong>Policy caching</strong> — periodically fetches and caches Athenz policies, enabling local authorization decisions</li>
<li><strong>Certificate verification</strong> — validates role certificates and access tokens against cached public keys</li>
<li><strong>Automatic refresh</strong> — background goroutines keep the cache fresh without blocking request processing</li>
<li><strong>Pluggable architecture</strong> — supports custom policy updaters, certificate refreshers, and token verifiers</li>
<li><strong>Thread-safe</strong> — designed for high-concurrency environments with zero contention on reads</li>
</ul>
<h2>Usage</h2>
<pre class="shiki shiki-themes catppuccin-latte tokyo-night" style="background-color:#eff1f5;--shiki-dark-bg:#1a1b26;color:#4c4f69;--shiki-dark:#a9b1d6" tabindex="0"><code><span class="line"><span style="color:#8839EF;--shiki-dark:#7DCFFF">import</span><span style="color:#40A02B;--shiki-dark:#89DDFF"> "</span><span style="color:#40A02B;--shiki-dark:#C0CAF5">github.com/AthenZ/athenz-authorizer/v5</span><span style="color:#40A02B;--shiki-dark:#89DDFF">"</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7C7F93;--shiki-light-font-style:italic;--shiki-dark:#51597D;--shiki-dark-font-style:italic">// Create authorizer with Athenz configuration</span></span>
<span class="line"><span style="color:#4C4F69;--shiki-dark:#C0CAF5">authz</span><span style="color:#7C7F93;--shiki-dark:#89DDFF">,</span><span style="color:#4C4F69;--shiki-dark:#C0CAF5"> err</span><span style="color:#179299;--shiki-dark:#89DDFF"> :=</span><span style="color:#4C4F69;--shiki-dark:#C0CAF5"> authorizerd</span><span style="color:#7C7F93;--shiki-dark:#89DDFF">.</span><span style="color:#1E66F5;--shiki-light-font-style:italic;--shiki-dark:#7AA2F7;--shiki-dark-font-style:inherit">New</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">(</span></span>
<span class="line"><span style="color:#4C4F69;--shiki-dark:#C0CAF5">    authorizerd</span><span style="color:#7C7F93;--shiki-dark:#89DDFF">.</span><span style="color:#1E66F5;--shiki-light-font-style:italic;--shiki-dark:#7AA2F7;--shiki-dark-font-style:inherit">WithAthenzURL</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">(</span><span style="color:#40A02B;--shiki-dark:#89DDFF">"</span><span style="color:#40A02B;--shiki-dark:#9ECE6A">https://athenz.example.com/zts/v1</span><span style="color:#40A02B;--shiki-dark:#89DDFF">"</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">)</span><span style="color:#7C7F93;--shiki-dark:#89DDFF">,</span></span>
<span class="line"><span style="color:#4C4F69;--shiki-dark:#C0CAF5">    authorizerd</span><span style="color:#7C7F93;--shiki-dark:#89DDFF">.</span><span style="color:#1E66F5;--shiki-light-font-style:italic;--shiki-dark:#7AA2F7;--shiki-dark-font-style:inherit">WithAthenzDomains</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">(</span><span style="color:#40A02B;--shiki-dark:#89DDFF">"</span><span style="color:#40A02B;--shiki-dark:#9ECE6A">your.domain</span><span style="color:#40A02B;--shiki-dark:#89DDFF">"</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">)</span><span style="color:#7C7F93;--shiki-dark:#89DDFF">,</span></span>
<span class="line"><span style="color:#7C7F93;--shiki-dark:#9ABDF5">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7C7F93;--shiki-light-font-style:italic;--shiki-dark:#51597D;--shiki-dark-font-style:italic">// Start background cache refresh</span></span>
<span class="line"><span style="color:#4C4F69;--shiki-dark:#C0CAF5">ctx</span><span style="color:#179299;--shiki-dark:#89DDFF"> :=</span><span style="color:#4C4F69;--shiki-dark:#C0CAF5"> context</span><span style="color:#7C7F93;--shiki-dark:#89DDFF">.</span><span style="color:#1E66F5;--shiki-light-font-style:italic;--shiki-dark:#7AA2F7;--shiki-dark-font-style:inherit">Background</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">()</span></span>
<span class="line"><span style="color:#8839EF;--shiki-dark:#BB9AF7">if</span><span style="color:#4C4F69;--shiki-dark:#C0CAF5"> err</span><span style="color:#179299;--shiki-dark:#89DDFF"> :=</span><span style="color:#4C4F69;--shiki-dark:#C0CAF5"> authz</span><span style="color:#7C7F93;--shiki-dark:#89DDFF">.</span><span style="color:#1E66F5;--shiki-light-font-style:italic;--shiki-dark:#7AA2F7;--shiki-dark-font-style:inherit">Init</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">(</span><span style="color:#4C4F69;--shiki-dark:#C0CAF5">ctx</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">)</span><span style="color:#7C7F93;--shiki-dark:#89DDFF">;</span><span style="color:#4C4F69;--shiki-dark:#C0CAF5"> err</span><span style="color:#179299;--shiki-dark:#BB9AF7"> !=</span><span style="color:#D20F39;--shiki-dark:#FF9E64"> nil</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5"> {</span></span>
<span class="line"><span style="color:#4C4F69;--shiki-dark:#C0CAF5">    log</span><span style="color:#7C7F93;--shiki-dark:#89DDFF">.</span><span style="color:#1E66F5;--shiki-light-font-style:italic;--shiki-dark:#7AA2F7;--shiki-dark-font-style:inherit">Fatal</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">(</span><span style="color:#4C4F69;--shiki-dark:#C0CAF5">err</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">)</span></span>
<span class="line"><span style="color:#7C7F93;--shiki-dark:#9ABDF5">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7C7F93;--shiki-light-font-style:italic;--shiki-dark:#51597D;--shiki-dark-font-style:italic">// Authorize a request</span></span>
<span class="line"><span style="color:#8839EF;--shiki-dark:#BB9AF7">if</span><span style="color:#4C4F69;--shiki-dark:#C0CAF5"> err</span><span style="color:#179299;--shiki-dark:#89DDFF"> :=</span><span style="color:#4C4F69;--shiki-dark:#C0CAF5"> authz</span><span style="color:#7C7F93;--shiki-dark:#89DDFF">.</span><span style="color:#1E66F5;--shiki-light-font-style:italic;--shiki-dark:#7AA2F7;--shiki-dark-font-style:inherit">Authorize</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">(</span><span style="color:#4C4F69;--shiki-dark:#C0CAF5">r</span><span style="color:#7C7F93;--shiki-dark:#89DDFF">,</span><span style="color:#40A02B;--shiki-dark:#89DDFF"> "</span><span style="color:#40A02B;--shiki-dark:#9ECE6A">action</span><span style="color:#40A02B;--shiki-dark:#89DDFF">"</span><span style="color:#7C7F93;--shiki-dark:#89DDFF">,</span><span style="color:#40A02B;--shiki-dark:#89DDFF"> "</span><span style="color:#40A02B;--shiki-dark:#9ECE6A">resource</span><span style="color:#40A02B;--shiki-dark:#89DDFF">"</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">)</span><span style="color:#7C7F93;--shiki-dark:#89DDFF">;</span><span style="color:#4C4F69;--shiki-dark:#C0CAF5"> err</span><span style="color:#179299;--shiki-dark:#BB9AF7"> !=</span><span style="color:#D20F39;--shiki-dark:#FF9E64"> nil</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5"> {</span></span>
<span class="line"><span style="color:#7C7F93;--shiki-light-font-style:italic;--shiki-dark:#51597D;--shiki-dark-font-style:italic">    // access denied</span></span>
<span class="line"><span style="color:#7C7F93;--shiki-dark:#9ABDF5">}</span></span></code></pre><h2>Design</h2>
<p>Athenz Authorizer maintains three independent caches:</p>
<ol>
<li><strong>Policy cache</strong> — maps (domain, action, resource) tuples to role assertions</li>
<li><strong>Role certificate cache</strong> — stores and refreshes X.509 certificates for role-based mTLS</li>
<li><strong>Public key cache</strong> — caches Athenz public keys for token signature verification</li>
</ol>
<p>Each cache is refreshed by a dedicated background goroutine, ensuring the hot path (authorization check) never blocks on network I/O.</p>
<h2>Part of the Athenz Ecosystem</h2>
<p>Athenz Authorizer is the core library powering the transparent authentication proxy architecture:</p>
<ul>
<li><strong><a href="https://github.com/AthenZ/garm">Garm</a></strong> — Kubernetes authorization webhook</li>
<li><strong><a href="https://github.com/AthenZ/authorization-proxy">Authorization Proxy</a></strong> — sidecar reverse proxy using Athenz Authorizer</li>
<li><strong><a href="https://github.com/AthenZ/athenz-client-sidecar">Athenz Client Sidecar</a></strong> — credential retrieval sidecar</li>
</ul>
<h2>Links</h2>
<ul>
<li><a href="https://github.com/AthenZ/athenz-authorizer">GitHub</a></li>
<li><a href="https://www.athenz.io/">Athenz Official Site</a></li>
</ul>`,
  },
  "athenz-client-sidecar": {
    slug: "athenz-client-sidecar",
    frontmatter: {
      title: "Athenz Client Sidecar - Credential Retrieval Sidecar",
      description:
        "Kubernetes sidecar container providing a common interface to retrieve authentication and authorization credentials from Athenz server",
      github: "https://github.com/AthenZ/athenz-client-sidecar",
      stars: 8,
      highlight:
        "Handles N-token, access token, and role token retrieval with automatic caching and renewal.",
      tags: ["Go", "Kubernetes", "Athenz", "Sidecar", "Security"],
    },
    html: `<h1>Athenz Client Sidecar</h1>
<p>Athenz Client Sidecar is a Kubernetes sidecar container that provides a common interface for applications to retrieve authentication and authorization credentials — including N-tokens, access tokens, and role tokens — from an <a href="https://www.athenz.io/">Athenz</a> server.</p>
<h2>Overview</h2>
<p>Applications running on Kubernetes often need to authenticate themselves to other services using Athenz credentials. Without a sidecar, each application must implement its own Athenz client logic — token acquisition, caching, refresh, and error handling. Athenz Client Sidecar centralizes this into a shared sidecar container, exposing a simple HTTP API for credential retrieval.</p>
<h2>Key Features</h2>
<ul>
<li><strong>Token retrieval</strong> — fetches N-tokens, role tokens, and access tokens from Athenz</li>
<li><strong>Automatic caching</strong> — caches tokens locally and refreshes them before expiration</li>
<li><strong>Automatic renewal</strong> — background goroutines handle token lifecycle management</li>
<li><strong>Simple HTTP API</strong> — applications retrieve tokens via a local HTTP endpoint, no Athenz SDK required</li>
<li><strong>Certificate management</strong> — handles X.509 certificate provisioning and rotation for mTLS</li>
<li><strong>Kubernetes-native</strong> — designed to run as a sidecar container in Kubernetes pods</li>
</ul>
<h2>Architecture</h2>
<pre class="shiki shiki-themes catppuccin-latte tokyo-night" style="background-color:#eff1f5;--shiki-dark-bg:#1a1b26;color:#4c4f69;--shiki-dark:#a9b1d6" tabindex="0"><code><span class="line"><span>Application Container ←→ Athenz Client Sidecar ←→ Athenz Server (ZTS)</span></span>
<span class="line"><span>                              ↓</span></span>
<span class="line"><span>                        Local Token Cache</span></span></code></pre><p>The application container sends a simple HTTP request to the sidecar&#39;s local endpoint. The sidecar returns a cached token or fetches a fresh one from the Athenz ZTS server, handling all the complexity of authentication, caching, and renewal.</p>
<h2>Usage</h2>
<p>From the application container, credentials are retrieved via a local HTTP call:</p>
<pre class="shiki shiki-themes catppuccin-latte tokyo-night" style="background-color:#eff1f5;--shiki-dark-bg:#1a1b26;color:#4c4f69;--shiki-dark:#a9b1d6" tabindex="0"><code><span class="line"><span>GET http://localhost:8080/v1/token?domain=your.domain&#x26;role=your.role</span></span></code></pre><p>The sidecar handles:</p>
<ol>
<li><strong>Token acquisition</strong> — authenticates to Athenz and retrieves the requested token</li>
<li><strong>Caching</strong> — stores the token locally for subsequent requests</li>
<li><strong>Refresh</strong> — automatically renews tokens before they expire</li>
<li><strong>Error recovery</strong> — retries on transient failures</li>
</ol>
<h2>Impact</h2>
<ul>
<li>Deployed as part of the Athenz ecosystem across <strong>1300+ Kubernetes clusters</strong> at LY Corporation</li>
<li>Eliminates boilerplate Athenz client code from every application</li>
<li>Ensures consistent credential management practices across all services</li>
</ul>
<h2>Part of the Athenz Ecosystem</h2>
<ul>
<li><strong><a href="https://github.com/AthenZ/garm">Garm</a></strong> — Kubernetes authorization webhook</li>
<li><strong><a href="https://github.com/AthenZ/athenz-authorizer">Athenz Authorizer</a></strong> — policy and certificate caching library</li>
<li><strong><a href="https://github.com/AthenZ/authorization-proxy">Authorization Proxy</a></strong> — sidecar reverse proxy for API auth</li>
</ul>
<h2>Links</h2>
<ul>
<li><a href="https://github.com/AthenZ/athenz-client-sidecar">GitHub</a></li>
<li><a href="https://www.athenz.io/">Athenz Official Site</a></li>
</ul>`,
  },
  "authorization-proxy": {
    slug: "authorization-proxy",
    frontmatter: {
      title: "Authorization Proxy - Athenz Sidecar Reverse Proxy",
      description:
        "Kubernetes sidecar reverse proxy for API endpoint authentication and authorization using Athenz",
      github: "https://github.com/AthenZ/authorization-proxy",
      stars: 8,
      highlight:
        "Transparent authentication proxy avoiding inline Athenz queries, part of the Athenz OSS ecosystem built from scratch.",
      tags: ["Go", "Kubernetes", "Athenz", "Sidecar", "Reverse Proxy"],
    },
    html: `<h1>Authorization Proxy</h1>
<p>Authorization Proxy is a Kubernetes sidecar reverse proxy that provides transparent authentication and authorization for API endpoints using <a href="https://www.athenz.io/">Athenz</a>. It supports OAuth2 access tokens, Athenz role tokens, and mTLS.</p>
<h2>Overview</h2>
<p>Integrating authentication and authorization into every microservice is repetitive, error-prone, and was costing engineers an average of three days per service at LY Corporation. Authorization Proxy eliminates this burden by acting as a transparent reverse proxy sidecar — all auth logic is handled before the request reaches the application.</p>
<h2>Key Features</h2>
<ul>
<li><strong>Transparent auth proxy</strong> — sits in front of the application as a Kubernetes sidecar; no code changes required</li>
<li><strong>Multiple auth methods</strong> — supports Athenz role tokens, OAuth2 access tokens, and mTLS certificates</li>
<li><strong>Policy-based access control</strong> — maps HTTP methods and URL paths to Athenz actions and resources</li>
<li><strong>Local policy cache</strong> — uses <a href="https://github.com/AthenZ/athenz-authorizer">Athenz Authorizer</a> to cache policies locally, avoiding inline queries to Athenz</li>
<li><strong>gRPC and HTTP support</strong> — works with both gRPC and REST API endpoints</li>
<li><strong>Health check bypass</strong> — configurable paths that skip authorization (e.g., <code>/health</code>, <code>/ready</code>)</li>
</ul>
<h2>Architecture</h2>
<pre class="shiki shiki-themes catppuccin-latte tokyo-night" style="background-color:#eff1f5;--shiki-dark-bg:#1a1b26;color:#4c4f69;--shiki-dark:#a9b1d6" tabindex="0"><code><span class="line"><span>Client → Authorization Proxy (Sidecar) → Application</span></span>
<span class="line"><span>              ↓</span></span>
<span class="line"><span>         Athenz Authorizer</span></span>
<span class="line"><span>         (Local Policy Cache)</span></span></code></pre><p>The proxy intercepts all incoming requests, validates credentials against cached Athenz policies, and forwards authorized requests to the application. Denied requests receive a 403 response before reaching the application code.</p>
<h2>Configuration</h2>
<p>Authorization Proxy is configured via a YAML file that maps URL paths to Athenz resources:</p>
<pre class="shiki shiki-themes catppuccin-latte tokyo-night" style="background-color:#eff1f5;--shiki-dark-bg:#1a1b26;color:#4c4f69;--shiki-dark:#a9b1d6" tabindex="0"><code><span class="line"><span style="color:#1E66F5;--shiki-dark:#F7768E">server</span><span style="color:#179299;--shiki-dark:#89DDFF">:</span></span>
<span class="line"><span style="color:#1E66F5;--shiki-dark:#F7768E">  port</span><span style="color:#179299;--shiki-dark:#89DDFF">:</span><span style="color:#FE640B;--shiki-dark:#FF9E64"> 8080</span></span>
<span class="line"><span style="color:#1E66F5;--shiki-dark:#F7768E">  proxy</span><span style="color:#179299;--shiki-dark:#89DDFF">:</span></span>
<span class="line"><span style="color:#1E66F5;--shiki-dark:#F7768E">    upstream</span><span style="color:#179299;--shiki-dark:#89DDFF">:</span><span style="color:#40A02B;--shiki-dark:#9ECE6A"> http://localhost:8081</span></span>
<span class="line"></span>
<span class="line"><span style="color:#1E66F5;--shiki-dark:#F7768E">authorization</span><span style="color:#179299;--shiki-dark:#89DDFF">:</span></span>
<span class="line"><span style="color:#1E66F5;--shiki-dark:#F7768E">  athenz</span><span style="color:#179299;--shiki-dark:#89DDFF">:</span></span>
<span class="line"><span style="color:#1E66F5;--shiki-dark:#F7768E">    url</span><span style="color:#179299;--shiki-dark:#89DDFF">:</span><span style="color:#40A02B;--shiki-dark:#9ECE6A"> https://athenz.example.com/zts/v1</span></span>
<span class="line"><span style="color:#1E66F5;--shiki-dark:#F7768E">  policy</span><span style="color:#179299;--shiki-dark:#89DDFF">:</span></span>
<span class="line"><span style="color:#1E66F5;--shiki-dark:#F7768E">    mapping</span><span style="color:#179299;--shiki-dark:#89DDFF">:</span></span>
<span class="line"><span style="color:#7C7F93;--shiki-dark:#9ABDF5">      -</span><span style="color:#1E66F5;--shiki-dark:#F7768E"> method</span><span style="color:#179299;--shiki-dark:#89DDFF">:</span><span style="color:#40A02B;--shiki-dark:#9ECE6A"> GET</span></span>
<span class="line"><span style="color:#1E66F5;--shiki-dark:#F7768E">        path</span><span style="color:#179299;--shiki-dark:#89DDFF">:</span><span style="color:#40A02B;--shiki-dark:#9ECE6A"> /api/v1/users</span></span>
<span class="line"><span style="color:#1E66F5;--shiki-dark:#F7768E">        action</span><span style="color:#179299;--shiki-dark:#89DDFF">:</span><span style="color:#40A02B;--shiki-dark:#9ECE6A"> read</span></span>
<span class="line"><span style="color:#1E66F5;--shiki-dark:#F7768E">        resource</span><span style="color:#179299;--shiki-dark:#89DDFF">:</span><span style="color:#40A02B;--shiki-dark:#9ECE6A"> service.users</span></span></code></pre><h2>Impact</h2>
<ul>
<li><strong>Part of the platform deployed to 1300+ Kubernetes clusters</strong> at LY Corporation</li>
<li><strong>Reduced auth implementation time from 3 days to 30 minutes</strong> per engineer</li>
<li>Eliminated reliance on individual expertise for security integration</li>
</ul>
<h2>Part of the Athenz Ecosystem</h2>
<ul>
<li><strong><a href="https://github.com/AthenZ/garm">Garm</a></strong> — Kubernetes authorization webhook</li>
<li><strong><a href="https://github.com/AthenZ/athenz-authorizer">Athenz Authorizer</a></strong> — policy and certificate caching library (used internally by this proxy)</li>
<li><strong><a href="https://github.com/AthenZ/athenz-client-sidecar">Athenz Client Sidecar</a></strong> — credential retrieval sidecar</li>
</ul>
<h2>Links</h2>
<ul>
<li><a href="https://github.com/AthenZ/authorization-proxy">GitHub</a></li>
<li><a href="https://www.athenz.io/">Athenz Official Site</a></li>
</ul>`,
  },
  fastime: {
    slug: "fastime",
    frontmatter: {
      title: "Fastime - Ultra-Fast Time Library",
      description:
        "Super fast time library for Go with zero memory allocation, returning approximate current time via background goroutine",
      github: "https://github.com/kpango/fastime",
      stars: 56,
      highlight:
        "Widely adopted within LY Corporation's Go ecosystem for low-overhead time retrieval in performance-critical paths.",
      tags: ["Go", "Performance", "Time", "Zero-Alloc"],
    },
    html: `<h1>Fastime</h1>
<p>Fastime is an ultra-fast time acquisition library for Go that returns the approximate current time with zero memory allocation, using a background goroutine to periodically update the cached time value.</p>
<h2>Overview</h2>
<p>In high-performance Go applications, calling <code>time.Now()</code> on every request can become a measurable cost — each call involves a system call that incurs kernel overhead. Fastime eliminates this by maintaining a cached time value that is updated by a background goroutine, providing nanosecond-level time retrieval with zero allocations.</p>
<h2>Key Features</h2>
<ul>
<li><strong>Zero allocation</strong> — <code>allocs/op: 0</code> in the hot path</li>
<li><strong>Background update</strong> — a dedicated goroutine refreshes the cached time at a configurable interval</li>
<li><strong>Drop-in replacement</strong> — API-compatible with common <code>time.Now()</code> usage patterns</li>
<li><strong>Configurable precision</strong> — trade off between freshness and performance by adjusting the update interval</li>
<li><strong>Thread-safe</strong> — safe for concurrent access from any number of goroutines</li>
</ul>
<h2>Usage</h2>
<pre class="shiki shiki-themes catppuccin-latte tokyo-night" style="background-color:#eff1f5;--shiki-dark-bg:#1a1b26;color:#4c4f69;--shiki-dark:#a9b1d6" tabindex="0"><code><span class="line"><span style="color:#8839EF;--shiki-dark:#7DCFFF">import</span><span style="color:#40A02B;--shiki-dark:#89DDFF"> "</span><span style="color:#40A02B;--shiki-dark:#C0CAF5">github.com/kpango/fastime</span><span style="color:#40A02B;--shiki-dark:#89DDFF">"</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7C7F93;--shiki-light-font-style:italic;--shiki-dark:#51597D;--shiki-dark-font-style:italic">// Get current time (approximately)</span></span>
<span class="line"><span style="color:#4C4F69;--shiki-dark:#C0CAF5">now</span><span style="color:#179299;--shiki-dark:#89DDFF"> :=</span><span style="color:#4C4F69;--shiki-dark:#C0CAF5"> fastime</span><span style="color:#7C7F93;--shiki-dark:#89DDFF">.</span><span style="color:#1E66F5;--shiki-light-font-style:italic;--shiki-dark:#7AA2F7;--shiki-dark-font-style:inherit">Now</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7C7F93;--shiki-light-font-style:italic;--shiki-dark:#51597D;--shiki-dark-font-style:italic">// Get Unix timestamp</span></span>
<span class="line"><span style="color:#4C4F69;--shiki-dark:#C0CAF5">unix</span><span style="color:#179299;--shiki-dark:#89DDFF"> :=</span><span style="color:#4C4F69;--shiki-dark:#C0CAF5"> fastime</span><span style="color:#7C7F93;--shiki-dark:#89DDFF">.</span><span style="color:#1E66F5;--shiki-light-font-style:italic;--shiki-dark:#7AA2F7;--shiki-dark-font-style:inherit">UnixNanoNow</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7C7F93;--shiki-light-font-style:italic;--shiki-dark:#51597D;--shiki-dark-font-style:italic">// Format time</span></span>
<span class="line"><span style="color:#4C4F69;--shiki-dark:#C0CAF5">formatted</span><span style="color:#179299;--shiki-dark:#89DDFF"> :=</span><span style="color:#4C4F69;--shiki-dark:#C0CAF5"> fastime</span><span style="color:#7C7F93;--shiki-dark:#89DDFF">.</span><span style="color:#1E66F5;--shiki-light-font-style:italic;--shiki-dark:#7AA2F7;--shiki-dark-font-style:inherit">FormattedNow</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">()</span></span></code></pre><h2>Design</h2>
<p>Fastime spawns a single background goroutine that calls <code>time.Now()</code> at regular intervals and stores the result atomically. All reads from <code>fastime.Now()</code> simply load the cached value — no system call, no allocation. This makes it ideal for timestamping high-frequency events where nanosecond precision is not required.</p>
<h2>Production Use</h2>
<p>Fastime is widely adopted within LY Corporation&#39;s Go ecosystem for low-overhead time retrieval in performance-critical paths, including:</p>
<ul>
<li><strong>Vald</strong> — timestamping in the distributed vector search engine</li>
<li><strong>Athenz products</strong> — token and certificate expiration checks</li>
<li><strong>Ad delivery systems</strong> — high-frequency event logging and metrics</li>
</ul>
<h2>Links</h2>
<ul>
<li><a href="https://github.com/kpango/fastime">GitHub</a></li>
</ul>`,
  },
  gache: {
    slug: "gache",
    frontmatter: {
      title: "Gache - Ultra-Fast Lock-Free Cache",
      description: "Ultra-fast lock-free in-memory cache library using concurrent map and xxhash",
      github: "https://github.com/kpango/gache",
      stars: 52,
      highlight:
        "Standard library used across LY Corporation's mission-critical Go services including Vald and Athenz products.",
      tags: ["Go", "Cache", "Performance", "Lock-free", "xxhash"],
    },
    html: `<h1>Gache</h1>
<p>Gache is an ultra-fast, lock-free in-memory cache library for Go. It uses a sharded concurrent map combined with xxhash for O(1) lookups with near-zero contention.</p>
<h2>Performance</h2>
<table>
<thead>
<tr>
<th>Library</th>
<th>ns/op</th>
<th>Allocs/op</th>
<th>Notes</th>
</tr>
</thead>
<tbody><tr>
<td><strong>gache</strong></td>
<td>~378</td>
<td>0</td>
<td>Small data, no GC</td>
</tr>
<tr>
<td>go-cache</td>
<td>~3233</td>
<td>varies</td>
<td>Mutex-based</td>
</tr>
</tbody></table>
<p><strong>8.5× faster</strong> than go-cache for small data, with <strong>zero allocations</strong> in the hot path.</p>
<h2>Key Features</h2>
<ul>
<li><strong>Lock-free reads</strong> — sharded design eliminates global lock contention</li>
<li><strong>xxhash</strong> — extremely fast non-cryptographic hash for key distribution</li>
<li><strong>TTL support</strong> — per-entry expiration with lazy and active eviction</li>
<li><strong>Generic API</strong> — type-safe cache with Go generics</li>
<li><strong>Zero allocation hot path</strong> — designed for high-throughput, low-latency workloads</li>
</ul>
<h2>Usage</h2>
<pre class="shiki shiki-themes catppuccin-latte tokyo-night" style="background-color:#eff1f5;--shiki-dark-bg:#1a1b26;color:#4c4f69;--shiki-dark:#a9b1d6" tabindex="0"><code><span class="line"><span style="color:#8839EF;--shiki-dark:#7DCFFF">import</span><span style="color:#40A02B;--shiki-dark:#89DDFF"> "</span><span style="color:#40A02B;--shiki-dark:#C0CAF5">github.com/kpango/gache/v2</span><span style="color:#40A02B;--shiki-dark:#89DDFF">"</span></span>
<span class="line"></span>
<span class="line"><span style="color:#4C4F69;--shiki-dark:#C0CAF5">cache</span><span style="color:#179299;--shiki-dark:#89DDFF"> :=</span><span style="color:#4C4F69;--shiki-dark:#C0CAF5"> gache</span><span style="color:#7C7F93;--shiki-dark:#89DDFF">.</span><span style="color:#1E66F5;--shiki-light-font-style:italic;--shiki-dark:#7AA2F7;--shiki-dark-font-style:inherit">New</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">[</span><span style="color:#8839EF;--shiki-dark:#BB9AF7">string</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">]()</span></span>
<span class="line"><span style="color:#4C4F69;--shiki-dark:#C0CAF5">cache</span><span style="color:#7C7F93;--shiki-dark:#89DDFF">.</span><span style="color:#1E66F5;--shiki-light-font-style:italic;--shiki-dark:#7AA2F7;--shiki-dark-font-style:inherit">Set</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">(</span><span style="color:#40A02B;--shiki-dark:#89DDFF">"</span><span style="color:#40A02B;--shiki-dark:#9ECE6A">key</span><span style="color:#40A02B;--shiki-dark:#89DDFF">"</span><span style="color:#7C7F93;--shiki-dark:#89DDFF">,</span><span style="color:#40A02B;--shiki-dark:#89DDFF"> "</span><span style="color:#40A02B;--shiki-dark:#9ECE6A">value</span><span style="color:#40A02B;--shiki-dark:#89DDFF">"</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#4C4F69;--shiki-dark:#C0CAF5">val</span><span style="color:#7C7F93;--shiki-dark:#89DDFF">,</span><span style="color:#4C4F69;--shiki-dark:#C0CAF5"> ok</span><span style="color:#179299;--shiki-dark:#89DDFF"> :=</span><span style="color:#4C4F69;--shiki-dark:#C0CAF5"> cache</span><span style="color:#7C7F93;--shiki-dark:#89DDFF">.</span><span style="color:#1E66F5;--shiki-light-font-style:italic;--shiki-dark:#7AA2F7;--shiki-dark-font-style:inherit">Get</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">(</span><span style="color:#40A02B;--shiki-dark:#89DDFF">"</span><span style="color:#40A02B;--shiki-dark:#9ECE6A">key</span><span style="color:#40A02B;--shiki-dark:#89DDFF">"</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">)</span></span></code></pre><h2>Design</h2>
<p>Gache shards the keyspace across N buckets (default: runtime.NumCPU() × 2). Each shard is independently locked, so concurrent reads and writes on different keys never contend. xxhash maps keys to shards in nanoseconds.</p>
<h2>Links</h2>
<ul>
<li><a href="https://github.com/kpango/gache">GitHub</a></li>
</ul>`,
  },
  garm: {
    slug: "garm",
    frontmatter: {
      title: "Garm - Kubernetes Authorization Webhook for Athenz",
      description:
        "Kubernetes authorization webhook integrating with Athenz for fine-grained RBAC access control on K8s resources",
      github: "https://github.com/AthenZ/garm",
      stars: 3,
      highlight:
        "Deployed to 1300+ Kubernetes clusters as company-wide SSoT platform. Reduced per-engineer auth implementation from 3 days to 30 minutes.",
      tags: ["Go", "Kubernetes", "Authorization", "Athenz"],
    },
    html: `<h1>Garm</h1>
<p>Garm is a Kubernetes authorization webhook server that integrates with <a href="https://www.athenz.io/">Athenz</a> to provide fine-grained role-based access control (RBAC) on Kubernetes resources. It was designed and built from scratch by kpango as the foundation of an authentication and authorization platform for Kubernetes.</p>
<h2>Overview</h2>
<p>The company&#39;s standard authentication and authorization platform (Athenz) was complex to integrate into applications, requiring an average of three days for each implementation by on-site engineers. Garm was created to solve this problem by providing a transparent authorization layer for Kubernetes that uses Athenz as the Single Source of Truth (SSoT) for access control policies.</p>
<h2>Key Features</h2>
<ul>
<li><strong>Athenz integration</strong> — uses Athenz policies as the authoritative source for Kubernetes RBAC decisions</li>
<li><strong>Webhook-based</strong> — plugs into the Kubernetes API server&#39;s authorization webhook mechanism</li>
<li><strong>Policy caching</strong> — caches Athenz policies locally to avoid inline queries, reducing communication overhead</li>
<li><strong>Transparent deployment</strong> — works as a sidecar or standalone service without modifying application code</li>
<li><strong>SSoT management</strong> — centralizes authentication across Kubernetes clusters</li>
</ul>
<h2>Architecture</h2>
<pre class="shiki shiki-themes catppuccin-latte tokyo-night" style="background-color:#eff1f5;--shiki-dark-bg:#1a1b26;color:#4c4f69;--shiki-dark:#a9b1d6" tabindex="0"><code><span class="line"><span>K8s API Server → Authorization Webhook → Garm → Athenz (policy source)</span></span>
<span class="line"><span>                                          ↓</span></span>
<span class="line"><span>                                   Local Policy Cache</span></span></code></pre><p>Garm intercepts authorization requests from the Kubernetes API server, checks them against cached Athenz policies, and returns allow/deny decisions — all without inline queries to the Athenz server.</p>
<h2>Impact</h2>
<ul>
<li><strong>Deployment scale</strong>: Deployed to <strong>over 1300 Kubernetes clusters</strong> across LY Corporation as the internal standard platform for SSoT management</li>
<li><strong>Developer productivity</strong>: Reduced per-engineer authentication implementation time from <strong>3 days to 30 minutes</strong></li>
<li><strong>Ecosystem</strong>: Part of the broader Athenz OSS ecosystem including Athenz Authorizer, Authorization Proxy, and Athenz Client Sidecar</li>
</ul>
<h2>Athenz Ecosystem</h2>
<p>Garm is the centerpiece of a suite of tools built to simplify Athenz integration on Kubernetes:</p>
<ul>
<li><a href="https://github.com/AthenZ/athenz-authorizer">Athenz Authorizer</a> — policy and certificate caching library</li>
<li><a href="https://github.com/AthenZ/authorization-proxy">Authorization Proxy</a> — sidecar reverse proxy for API auth</li>
<li><a href="https://github.com/AthenZ/athenz-client-sidecar">Athenz Client Sidecar</a> — credential retrieval sidecar</li>
</ul>
<h2>Links</h2>
<ul>
<li><a href="https://github.com/AthenZ/garm">GitHub</a></li>
<li><a href="https://www.athenz.io/">Athenz Official Site</a></li>
<li><a href="https://speakerdeck.com/kpango/yahoo-japanniokeruathenzwoyong-itak8sakusesuzhi-yu-guan-li-at-japancontainerdays">Presentation: Athenz-based K8s Access Control at JapanContainerDays</a></li>
</ul>`,
  },
  glg: {
    slug: "glg",
    frontmatter: {
      title: "Glg - High-Speed Logging Library",
      description:
        "High-speed logging library for Go with leveled logging and colorized output, designed for high-volume log output",
      github: "https://github.com/kpango/glg",
      stars: 192,
      highlight:
        "Standard library within LY Corporation for mission-critical Go applications including Vald and ad delivery infrastructure.",
      tags: ["Go", "Logging", "Performance"],
    },
    html: `<h1>Glg</h1>
<p>Glg is a high-speed, simple logging library for Go designed to output large volumes of logs at high speed with minimal overhead.</p>
<h2>Overview</h2>
<p>In high-throughput systems such as vector search engines and ad delivery platforms, logging can become a significant bottleneck if the logger introduces contention or allocations. Glg was designed from scratch to eliminate these bottlenecks, providing leveled logging with colorized output while maintaining extreme performance.</p>
<h2>Key Features</h2>
<ul>
<li><strong>High-speed output</strong> — optimized for throughput with minimal overhead per log call</li>
<li><strong>Leveled logging</strong> — supports standard levels (TRACE, DEBUG, INFO, WARN, ERROR, FATAL)</li>
<li><strong>Colorized output</strong> — automatic color coding by log level for terminal readability</li>
<li><strong>Custom writer support</strong> — plug in any <code>io.Writer</code> for flexible log routing</li>
<li><strong>Printf and Println style</strong> — familiar Go formatting for log messages</li>
<li><strong>Thread-safe</strong> — safe for concurrent use from multiple goroutines</li>
<li><strong>Customizable log format</strong> — configurable timestamp and output format</li>
</ul>
<h2>Usage</h2>
<pre class="shiki shiki-themes catppuccin-latte tokyo-night" style="background-color:#eff1f5;--shiki-dark-bg:#1a1b26;color:#4c4f69;--shiki-dark:#a9b1d6" tabindex="0"><code><span class="line"><span style="color:#8839EF;--shiki-dark:#7DCFFF">import</span><span style="color:#40A02B;--shiki-dark:#89DDFF"> "</span><span style="color:#40A02B;--shiki-dark:#C0CAF5">github.com/kpango/glg</span><span style="color:#40A02B;--shiki-dark:#89DDFF">"</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7C7F93;--shiki-light-font-style:italic;--shiki-dark:#51597D;--shiki-dark-font-style:italic">// Simple logging</span></span>
<span class="line"><span style="color:#4C4F69;--shiki-dark:#C0CAF5">glg</span><span style="color:#7C7F93;--shiki-dark:#89DDFF">.</span><span style="color:#1E66F5;--shiki-light-font-style:italic;--shiki-dark:#7AA2F7;--shiki-dark-font-style:inherit">Info</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">(</span><span style="color:#40A02B;--shiki-dark:#89DDFF">"</span><span style="color:#40A02B;--shiki-dark:#9ECE6A">server started</span><span style="color:#40A02B;--shiki-dark:#89DDFF">"</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">)</span></span>
<span class="line"><span style="color:#4C4F69;--shiki-dark:#C0CAF5">glg</span><span style="color:#7C7F93;--shiki-dark:#89DDFF">.</span><span style="color:#1E66F5;--shiki-light-font-style:italic;--shiki-dark:#7AA2F7;--shiki-dark-font-style:inherit">Debugf</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">(</span><span style="color:#40A02B;--shiki-dark:#89DDFF">"</span><span style="color:#40A02B;--shiki-dark:#9ECE6A">processing request: </span><span style="color:#40A02B;--shiki-dark:#C0CAF5">%s</span><span style="color:#40A02B;--shiki-dark:#89DDFF">"</span><span style="color:#7C7F93;--shiki-dark:#89DDFF">,</span><span style="color:#4C4F69;--shiki-dark:#C0CAF5"> requestID</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">)</span></span>
<span class="line"><span style="color:#4C4F69;--shiki-dark:#C0CAF5">glg</span><span style="color:#7C7F93;--shiki-dark:#89DDFF">.</span><span style="color:#1E66F5;--shiki-light-font-style:italic;--shiki-dark:#7AA2F7;--shiki-dark-font-style:inherit">Error</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">(</span><span style="color:#40A02B;--shiki-dark:#89DDFF">"</span><span style="color:#40A02B;--shiki-dark:#9ECE6A">connection failed</span><span style="color:#40A02B;--shiki-dark:#89DDFF">"</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7C7F93;--shiki-light-font-style:italic;--shiki-dark:#51597D;--shiki-dark-font-style:italic">// Custom configuration</span></span>
<span class="line"><span style="color:#4C4F69;--shiki-dark:#C0CAF5">glg</span><span style="color:#7C7F93;--shiki-dark:#89DDFF">.</span><span style="color:#1E66F5;--shiki-light-font-style:italic;--shiki-dark:#7AA2F7;--shiki-dark-font-style:inherit">Get</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">()</span><span style="color:#7C7F93;--shiki-dark:#89DDFF">.</span></span>
<span class="line"><span style="color:#1E66F5;--shiki-light-font-style:italic;--shiki-dark:#7AA2F7;--shiki-dark-font-style:inherit">    SetMode</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">(</span><span style="color:#4C4F69;--shiki-dark:#C0CAF5">glg</span><span style="color:#7C7F93;--shiki-dark:#89DDFF">.</span><span style="color:#4C4F69;--shiki-dark:#C0CAF5">STD</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">)</span><span style="color:#7C7F93;--shiki-dark:#89DDFF">.</span></span>
<span class="line"><span style="color:#1E66F5;--shiki-light-font-style:italic;--shiki-dark:#7AA2F7;--shiki-dark-font-style:inherit">    SetLevel</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">(</span><span style="color:#4C4F69;--shiki-dark:#C0CAF5">glg</span><span style="color:#7C7F93;--shiki-dark:#89DDFF">.</span><span style="color:#4C4F69;--shiki-dark:#C0CAF5">INFO</span><span style="color:#7C7F93;--shiki-dark:#9ABDF5">)</span></span></code></pre><h2>Production Use</h2>
<p>Glg is not merely an individual open-source development — it has become an established standard library widely used within LY Corporation in mission-critical Go services, including:</p>
<ul>
<li><strong>Vald</strong> — distributed vector search engine core components</li>
<li><strong>Athenz-related products</strong> — authentication and authorization infrastructure</li>
<li><strong>Ad delivery infrastructure</strong> — high-throughput advertising platform</li>
</ul>
<h2>Links</h2>
<ul>
<li><a href="https://github.com/kpango/glg">GitHub</a></li>
</ul>`,
  },
  vald: {
    slug: "vald",
    frontmatter: {
      title: "Vald - Distributed Vector Search Engine",
      description:
        "A highly scalable distributed approximate nearest neighbor dense vector search engine",
      github: "https://github.com/vdaas/vald",
      stars: 1697,
      highlight:
        "Used by LY Corporation for similar image search, ad delivery, and recommendations. 99th percentile latency ≤50ms. Infrastructure costs reduced to ~1/10.",
      tags: ["Go", "Kubernetes", "Vector Search", "Distributed Systems", "Cloud Native"],
    },
    html: `<h1>Vald</h1>
<p>Vald is a highly scalable distributed approximate nearest neighbor (ANN) dense vector search engine developed and maintained by kpango (Yusuke Kato) and the vdaas team at Yahoo Japan Corporation.</p>
<h2>Overview</h2>
<p>Traditional vector databases struggle to scale horizontally while maintaining low-latency search across billions of vectors. Vald was built to solve exactly this problem: provide a cloud-native, fully distributed ANN search platform that can scale to handle Yahoo Japan&#39;s production workloads — including similar image search and content recommendation.</p>
<h2>Key Features</h2>
<ul>
<li><strong>Distributed by design</strong> — agents run as independent pods; the gateway routes and merges results</li>
<li><strong>Multiple ANN algorithms</strong> — pluggable core algorithm support (NGT, Faiss, etc.)</li>
<li><strong>Kubernetes-native</strong> — Helm charts, operators, and Kubernetes-native scaling</li>
<li><strong>High availability</strong> — built-in replication and backup/restore via object storage</li>
<li><strong>gRPC API</strong> — high-performance, language-agnostic interface with generated SDKs</li>
<li><strong>Filtering</strong> — pre- and post-filter hooks for fine-grained search customization</li>
<li><strong>Auto index correction</strong> — background index health checks and self-healing</li>
</ul>
<h2>Architecture</h2>
<pre class="shiki shiki-themes catppuccin-latte tokyo-night" style="background-color:#eff1f5;--shiki-dark-bg:#1a1b26;color:#4c4f69;--shiki-dark:#a9b1d6" tabindex="0"><code><span class="line"><span>Client → Gateway → Multiple Search Agents (NGT/Faiss shards)</span></span>
<span class="line"><span>                 ↘ Manager / Discoverer (Kubernetes service discovery)</span></span></code></pre><p>Each agent maintains a local ANN index shard. The gateway fans out queries, collects partial results, and returns merged top-k results — all over gRPC.</p>
<h2>Production Use at Yahoo Japan</h2>
<p>Vald powers several Yahoo Japan production services:</p>
<ul>
<li><strong>Similar image search</strong> — finding visually similar images across a large media corpus</li>
<li><strong>Content recommendation</strong> — embedding-based recommendation for news, shopping, and media</li>
<li><strong>Real-time indexing</strong> — streaming insert pipeline with near-real-time index updates</li>
</ul>
<h2>GitHub Stats</h2>
<ul>
<li>⭐ 1,691 stars</li>
<li>Language: Go (primary), C++ (NGT integration), Python (clients/tooling)</li>
<li>License: Apache 2.0</li>
</ul>
<h2>Links</h2>
<ul>
<li><a href="https://github.com/vdaas/vald">GitHub</a></li>
<li><a href="https://vald.vdaas.org">Documentation</a></li>
<li><a href="https://github.com/vdaas/vald/tree/main/charts/vald">Helm Chart</a></li>
</ul>`,
  },
};

export function getOss(slug: string): OssEntry | undefined {
  return oss[slug];
}

export function getAllOss(): OssEntry[] {
  return Object.values(oss).sort((a, b) => b.frontmatter.stars - a.frontmatter.stars);
}
