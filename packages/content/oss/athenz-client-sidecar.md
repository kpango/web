---
title: "Athenz Client Sidecar - Credential Retrieval Sidecar"
description: "Kubernetes sidecar container providing a common interface to retrieve authentication and authorization credentials from Athenz server"
github: "https://github.com/AthenZ/athenz-client-sidecar"
tags: ["Go", "Kubernetes", "Athenz", "Sidecar", "Security"]
---

# Athenz Client Sidecar

Athenz Client Sidecar is a Kubernetes sidecar container that provides a common interface for applications to retrieve authentication and authorization credentials — including N-tokens, access tokens, and role tokens — from an [Athenz](https://www.athenz.io/) server.

## Overview

Applications running on Kubernetes often need to authenticate themselves to other services using Athenz credentials. Without a sidecar, each application must implement its own Athenz client logic — token acquisition, caching, refresh, and error handling. Athenz Client Sidecar centralizes this into a shared sidecar container, exposing a simple HTTP API for credential retrieval.

## Key Features

- **Token retrieval** — fetches N-tokens, role tokens, and access tokens from Athenz
- **Automatic caching** — caches tokens locally and refreshes them before expiration
- **Automatic renewal** — background goroutines handle token lifecycle management
- **Simple HTTP API** — applications retrieve tokens via a local HTTP endpoint, no Athenz SDK required
- **Certificate management** — handles X.509 certificate provisioning and rotation for mTLS
- **Kubernetes-native** — designed to run as a sidecar container in Kubernetes pods

## Architecture

```
Application Container ←→ Athenz Client Sidecar ←→ Athenz Server (ZTS)
                              ↓
                        Local Token Cache
```

The application container sends a simple HTTP request to the sidecar's local endpoint. The sidecar returns a cached token or fetches a fresh one from the Athenz ZTS server, handling all the complexity of authentication, caching, and renewal.

## Usage

From the application container, credentials are retrieved via a local HTTP call:

```
GET http://localhost:8080/v1/token?domain=your.domain&role=your.role
```

The sidecar handles:
1. **Token acquisition** — authenticates to Athenz and retrieves the requested token
2. **Caching** — stores the token locally for subsequent requests
3. **Refresh** — automatically renews tokens before they expire
4. **Error recovery** — retries on transient failures

## Impact

- Deployed as part of the Athenz ecosystem across **450+ Kubernetes clusters** at LINE Yahoo! Japan Corporation
- Eliminates boilerplate Athenz client code from every application
- Ensures consistent credential management practices across all services

## Part of the Athenz Ecosystem

- **[Garm](https://github.com/AthenZ/garm)** — Kubernetes authorization webhook
- **[Athenz Authorizer](https://github.com/AthenZ/athenz-authorizer)** — policy and certificate caching library
- **[Authorization Proxy](https://github.com/AthenZ/authorization-proxy)** — sidecar reverse proxy for API auth

## Links

- [GitHub](https://github.com/AthenZ/athenz-client-sidecar)
- [Athenz Official Site](https://www.athenz.io/)
