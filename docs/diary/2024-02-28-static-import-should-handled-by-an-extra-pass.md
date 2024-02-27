---
title: Static import should handled by an extra pass
date: 2024-02-28
---

Static import should handled by an extra pass,
instead of injecting a `Loader` to `Mod`,
which can implement dynamic import.
