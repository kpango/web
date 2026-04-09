---
title: "Glg - High-Speed Logging Library"
description: "High-speed logging library for Go with leveled logging and colorized output, designed for high-volume log output"
github: "https://github.com/kpango/glg"
tags: ["Go", "Logging", "Performance"]
---

# Glg

Glg is a high-speed, simple logging library for Go designed to output large volumes of logs at high speed with minimal overhead.

## Overview

In high-throughput systems such as vector search engines and ad delivery platforms, logging can become a significant bottleneck if the logger introduces contention or allocations. Glg was designed from scratch to eliminate these bottlenecks, providing leveled logging with colorized output while maintaining extreme performance.

## Key Features

- **High-speed output** — optimized for throughput with minimal overhead per log call
- **Leveled logging** — supports standard levels (TRACE, DEBUG, INFO, WARN, ERROR, FATAL)
- **Colorized output** — automatic color coding by log level for terminal readability
- **Custom writer support** — plug in any `io.Writer` for flexible log routing
- **Printf and Println style** — familiar Go formatting for log messages
- **Thread-safe** — safe for concurrent use from multiple goroutines
- **Customizable log format** — configurable timestamp and output format

## Usage

```go
import "github.com/kpango/glg"

// Simple logging
glg.Info("server started")
glg.Debugf("processing request: %s", requestID)
glg.Error("connection failed")

// Custom configuration
glg.Get().
    SetMode(glg.STD).
    SetLevel(glg.INFO)
```

## Production Use

Glg is not merely an individual open-source development — it has become an established standard library widely used within LINE Yahoo! Japan Corporation in mission-critical Go services, including:

- **Vald** — distributed vector search engine core components
- **Athenz-related products** — authentication and authorization infrastructure
- **Ad delivery infrastructure** — high-throughput advertising platform

## Links

- [GitHub](https://github.com/kpango/glg)
