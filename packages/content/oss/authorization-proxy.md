---
title: "Authorization Proxy - Athenz Sidecar Reverse Proxy"
description: "Kubernetes sidecar reverse proxy for API endpoint authentication and authorization using Athenz"
github: "https://github.com/AthenZ/authorization-proxy"
stars: 8
highlight: "Transparent authentication proxy avoiding inline Athenz queries, part of the Athenz OSS ecosystem built from scratch."
tags: ["Go", "Kubernetes", "Athenz", "Sidecar", "Reverse Proxy"]
---

# Authorization Proxy

Authorization Proxy is a Kubernetes sidecar reverse proxy that provides transparent authentication and authorization for API endpoints using [Athenz](https://www.athenz.io/). It supports OAuth2 access tokens, Athenz role tokens, and mTLS.

## Overview

Integrating authentication and authorization into every microservice is repetitive, error-prone, and was costing engineers an average of three days per service at LY Corporation. Authorization Proxy eliminates this burden by acting as a transparent reverse proxy sidecar — all auth logic is handled before the request reaches the application.

## Key Features

- **Transparent auth proxy** — sits in front of the application as a Kubernetes sidecar; no code changes required
- **Multiple auth methods** — supports Athenz role tokens, OAuth2 access tokens, and mTLS certificates
- **Policy-based access control** — maps HTTP methods and URL paths to Athenz actions and resources
- **Local policy cache** — uses [Athenz Authorizer](https://github.com/AthenZ/athenz-authorizer) to cache policies locally, avoiding inline queries to Athenz
- **gRPC and HTTP support** — works with both gRPC and REST API endpoints
- **Health check bypass** — configurable paths that skip authorization (e.g., `/health`, `/ready`)

## Architecture

```
Client → Authorization Proxy (Sidecar) → Application
              ↓
         Athenz Authorizer
         (Local Policy Cache)
```

The proxy intercepts all incoming requests, validates credentials against cached Athenz policies, and forwards authorized requests to the application. Denied requests receive a 403 response before reaching the application code.

## Configuration

Authorization Proxy is configured via a YAML file that maps URL paths to Athenz resources:

```yaml
server:
  port: 8080
  proxy:
    upstream: http://localhost:8081

authorization:
  athenz:
    url: https://athenz.example.com/zts/v1
  policy:
    mapping:
      - method: GET
        path: /api/v1/users
        action: read
        resource: service.users
```

## Impact

- **Part of the platform deployed to 1300+ Kubernetes clusters** at LY Corporation
- **Reduced auth implementation time from 3 days to 30 minutes** per engineer
- Eliminated reliance on individual expertise for security integration

## Part of the Athenz Ecosystem

- **[Garm](https://github.com/AthenZ/garm)** — Kubernetes authorization webhook
- **[Athenz Authorizer](https://github.com/AthenZ/athenz-authorizer)** — policy and certificate caching library (used internally by this proxy)
- **[Athenz Client Sidecar](https://github.com/AthenZ/athenz-client-sidecar)** — credential retrieval sidecar

## Links

- [GitHub](https://github.com/AthenZ/authorization-proxy)
- [Athenz Official Site](https://www.athenz.io/)
