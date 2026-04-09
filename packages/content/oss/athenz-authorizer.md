---
title: "Athenz Authorizer - Policy Caching Library"
description: "Go library that caches Athenz policies and certificates for authentication and authorization of service requests"
github: "https://github.com/AthenZ/athenz-authorizer"
tags: ["Go", "Athenz", "Authorization", "Security"]
---

# Athenz Authorizer

Athenz Authorizer is a Go library that provides efficient caching and verification of [Athenz](https://www.athenz.io/) policies and certificates for authentication and authorization of service requests.

## Overview

When integrating Athenz into microservices, querying the Athenz server on every request introduces unacceptable latency. Athenz Authorizer solves this by maintaining a local cache of policies, role certificates, and public keys — enabling authorization decisions to be made locally in microseconds rather than milliseconds.

## Key Features

- **Policy caching** — periodically fetches and caches Athenz policies, enabling local authorization decisions
- **Certificate verification** — validates role certificates and access tokens against cached public keys
- **Automatic refresh** — background goroutines keep the cache fresh without blocking request processing
- **Pluggable architecture** — supports custom policy updaters, certificate refreshers, and token verifiers
- **Thread-safe** — designed for high-concurrency environments with zero contention on reads

## Usage

```go
import "github.com/AthenZ/athenz-authorizer/v5"

// Create authorizer with Athenz configuration
authz, err := authorizerd.New(
    authorizerd.WithAthenzURL("https://athenz.example.com/zts/v1"),
    authorizerd.WithAthenzDomains("your.domain"),
)

// Start background cache refresh
ctx := context.Background()
if err := authz.Init(ctx); err != nil {
    log.Fatal(err)
}

// Authorize a request
if err := authz.Authorize(r, "action", "resource"); err != nil {
    // access denied
}
```

## Design

Athenz Authorizer maintains three independent caches:

1. **Policy cache** — maps (domain, action, resource) tuples to role assertions
2. **Role certificate cache** — stores and refreshes X.509 certificates for role-based mTLS
3. **Public key cache** — caches Athenz public keys for token signature verification

Each cache is refreshed by a dedicated background goroutine, ensuring the hot path (authorization check) never blocks on network I/O.

## Part of the Athenz Ecosystem

Athenz Authorizer is the core library powering the transparent authentication proxy architecture:

- **[Garm](https://github.com/AthenZ/garm)** — Kubernetes authorization webhook
- **[Authorization Proxy](https://github.com/AthenZ/authorization-proxy)** — sidecar reverse proxy using Athenz Authorizer
- **[Athenz Client Sidecar](https://github.com/AthenZ/athenz-client-sidecar)** — credential retrieval sidecar

## Links

- [GitHub](https://github.com/AthenZ/athenz-authorizer)
- [Athenz Official Site](https://www.athenz.io/)
