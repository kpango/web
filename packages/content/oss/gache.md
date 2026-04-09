---
title: "Gache - Ultra-Fast Lock-Free Cache"
description: "Ultra-fast lock-free in-memory cache library using concurrent map and xxhash"
github: "https://github.com/kpango/gache"
tags: ["Go", "Cache", "Performance", "Lock-free", "xxhash"]
---

# Gache

Gache is an ultra-fast, lock-free in-memory cache library for Go. It uses a sharded concurrent map combined with xxhash for O(1) lookups with near-zero contention.

## Performance

| Library   | ns/op | Allocs/op | Notes              |
|-----------|-------|-----------|--------------------|
| **gache** | ~378  | 0         | Small data, no GC  |
| go-cache  | ~3233 | varies    | Mutex-based        |

**8.5× faster** than go-cache for small data, with **zero allocations** in the hot path.

## Key Features

- **Lock-free reads** — sharded design eliminates global lock contention
- **xxhash** — extremely fast non-cryptographic hash for key distribution
- **TTL support** — per-entry expiration with lazy and active eviction
- **Generic API** — type-safe cache with Go generics
- **Zero allocation hot path** — designed for high-throughput, low-latency workloads

## Usage

```go
import "github.com/kpango/gache/v2"

cache := gache.New[string]()
cache.Set("key", "value")

val, ok := cache.Get("key")
```

## Design

Gache shards the keyspace across N buckets (default: runtime.NumCPU() × 2). Each shard is independently locked, so concurrent reads and writes on different keys never contend. xxhash maps keys to shards in nanoseconds.

## Links

- [GitHub](https://github.com/kpango/gache)
