---
title: "Vald - Distributed Vector Search Engine"
description: "A highly scalable distributed approximate nearest neighbor dense vector search engine"
github: "https://github.com/vdaas/vald"
stars: 1697
highlight: "Used by LY Corporation for similar image search, ad delivery, and recommendations. 99th percentile latency ≤50ms. Infrastructure costs reduced to ~1/10."
tags: ["Go", "Kubernetes", "Vector Search", "Distributed Systems", "Cloud Native"]
---

# Vald

Vald is a highly scalable distributed approximate nearest neighbor (ANN) dense vector search engine developed and maintained by kpango (Yusuke Kato) and the vdaas team at Yahoo Japan Corporation.

## Overview

Traditional vector databases struggle to scale horizontally while maintaining low-latency search across billions of vectors. Vald was built to solve exactly this problem: provide a cloud-native, fully distributed ANN search platform that can scale to handle Yahoo Japan's production workloads — including similar image search and content recommendation.

## Key Features

- **Distributed by design** — agents run as independent pods; the gateway routes and merges results
- **Multiple ANN algorithms** — pluggable core algorithm support (NGT, Faiss, etc.)
- **Kubernetes-native** — Helm charts, operators, and Kubernetes-native scaling
- **High availability** — built-in replication and backup/restore via object storage
- **gRPC API** — high-performance, language-agnostic interface with generated SDKs
- **Filtering** — pre- and post-filter hooks for fine-grained search customization
- **Auto index correction** — background index health checks and self-healing

## Architecture

```
Client → Gateway → Multiple Search Agents (NGT/Faiss shards)
                 ↘ Manager / Discoverer (Kubernetes service discovery)
```

Each agent maintains a local ANN index shard. The gateway fans out queries, collects partial results, and returns merged top-k results — all over gRPC.

## Production Use at Yahoo Japan

Vald powers several Yahoo Japan production services:

- **Similar image search** — finding visually similar images across a large media corpus
- **Content recommendation** — embedding-based recommendation for news, shopping, and media
- **Real-time indexing** — streaming insert pipeline with near-real-time index updates

## GitHub Stats

- ⭐ 1,691 stars
- Language: Go (primary), C++ (NGT integration), Python (clients/tooling)
- License: Apache 2.0

## Links

- [GitHub](https://github.com/vdaas/vald)
- [Documentation](https://vald.vdaas.org)
- [Helm Chart](https://github.com/vdaas/vald/tree/main/charts/vald)
