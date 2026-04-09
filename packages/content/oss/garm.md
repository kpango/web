---
title: "Garm - Kubernetes Authorization Webhook for Athenz"
description: "Kubernetes authorization webhook integrating with Athenz for fine-grained RBAC access control on K8s resources"
github: "https://github.com/AthenZ/garm"
tags: ["Go", "Kubernetes", "Authorization", "Athenz"]
---

# Garm

Garm is a Kubernetes authorization webhook server that integrates with [Athenz](https://www.athenz.io/) to provide fine-grained role-based access control (RBAC) on Kubernetes resources. It was designed and built from scratch by kpango as the foundation of an authentication and authorization platform for Kubernetes.

## Overview

The company's standard authentication and authorization platform (Athenz) was complex to integrate into applications, requiring an average of three days for each implementation by on-site engineers. Garm was created to solve this problem by providing a transparent authorization layer for Kubernetes that uses Athenz as the Single Source of Truth (SSoT) for access control policies.

## Key Features

- **Athenz integration** — uses Athenz policies as the authoritative source for Kubernetes RBAC decisions
- **Webhook-based** — plugs into the Kubernetes API server's authorization webhook mechanism
- **Policy caching** — caches Athenz policies locally to avoid inline queries, reducing communication overhead
- **Transparent deployment** — works as a sidecar or standalone service without modifying application code
- **SSoT management** — centralizes authentication across Kubernetes clusters

## Architecture

```
K8s API Server → Authorization Webhook → Garm → Athenz (policy source)
                                          ↓
                                   Local Policy Cache
```

Garm intercepts authorization requests from the Kubernetes API server, checks them against cached Athenz policies, and returns allow/deny decisions — all without inline queries to the Athenz server.

## Impact

- **Deployment scale**: Deployed to **over 450 Kubernetes clusters** across LINE Yahoo! Japan Corporation as the internal standard platform for SSoT management
- **Developer productivity**: Reduced per-engineer authentication implementation time from **3 days to 30 minutes**
- **Ecosystem**: Part of the broader Athenz OSS ecosystem including Athenz Authorizer, Authorization Proxy, and Athenz Client Sidecar

## Athenz Ecosystem

Garm is the centerpiece of a suite of tools built to simplify Athenz integration on Kubernetes:

- [Athenz Authorizer](https://github.com/AthenZ/athenz-authorizer) — policy and certificate caching library
- [Authorization Proxy](https://github.com/AthenZ/authorization-proxy) — sidecar reverse proxy for API auth
- [Athenz Client Sidecar](https://github.com/AthenZ/athenz-client-sidecar) — credential retrieval sidecar

## Links

- [GitHub](https://github.com/AthenZ/garm)
- [Athenz Official Site](https://www.athenz.io/)
- [Presentation: Athenz-based K8s Access Control at JapanContainerDays](https://speakerdeck.com/kpango/yahoo-japanniokeruathenzwoyong-itak8sakusesuzhi-yu-guan-li-at-japancontainerdays)
