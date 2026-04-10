---
title: "Fastime - Ultra-Fast Time Library"
description: "Super fast time library for Go with zero memory allocation, returning approximate current time via background goroutine"
github: "https://github.com/kpango/fastime"
stars: 56
highlight: "Widely adopted within LY Corporation's Go ecosystem for low-overhead time retrieval in performance-critical paths."
tags: ["Go", "Performance", "Time", "Zero-Alloc"]
---

# Fastime

Fastime is an ultra-fast time acquisition library for Go that returns the approximate current time with zero memory allocation, using a background goroutine to periodically update the cached time value.

## Overview

In high-performance Go applications, calling `time.Now()` on every request can become a measurable cost — each call involves a system call that incurs kernel overhead. Fastime eliminates this by maintaining a cached time value that is updated by a background goroutine, providing nanosecond-level time retrieval with zero allocations.

## Key Features

- **Zero allocation** — `allocs/op: 0` in the hot path
- **Background update** — a dedicated goroutine refreshes the cached time at a configurable interval
- **Drop-in replacement** — API-compatible with common `time.Now()` usage patterns
- **Configurable precision** — trade off between freshness and performance by adjusting the update interval
- **Thread-safe** — safe for concurrent access from any number of goroutines

## Usage

```go
import "github.com/kpango/fastime"

// Get current time (approximately)
now := fastime.Now()

// Get Unix timestamp
unix := fastime.UnixNanoNow()

// Format time
formatted := fastime.FormattedNow()
```

## Design

Fastime spawns a single background goroutine that calls `time.Now()` at regular intervals and stores the result atomically. All reads from `fastime.Now()` simply load the cached value — no system call, no allocation. This makes it ideal for timestamping high-frequency events where nanosecond precision is not required.

## Production Use

Fastime is widely adopted within LY Corporation's Go ecosystem for low-overhead time retrieval in performance-critical paths, including:

- **Vald** — timestamping in the distributed vector search engine
- **Athenz products** — token and certificate expiration checks
- **Ad delivery systems** — high-frequency event logging and metrics

## Links

- [GitHub](https://github.com/kpango/fastime)
