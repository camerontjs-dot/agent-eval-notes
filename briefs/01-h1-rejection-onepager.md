---
title: "One-pager: the harness that scored better and was not promoted"
domain: "agent-operations"
type: "brief"
status: "active"
updated: "2026-08-16"
privacy: "public-safe-staging"
study_type: "exploratory"
---

# The harness that scored better and was not promoted

**Cameron Sanderson** · Agent evaluation brief · Exploratory measurement · Local open-weight coding agents (Aider + Ollama)  
**n = 36** sealed runs per harness (6 task categories × 3 models × 2 seeds)

## Headline

A packet-style harness (H1) improved verified passes and cleared scope, then failed a pre-registered honesty gate and was **not promoted**. The baseline wrap could not emit that honesty metric.

| Metric | H0 baseline | H1 packet | Delta |
|--------|------------:|----------:|------:|
| Verified passes | 28 / 36 | 34 / 36 | +6 |
| Scope violations | 6 | 0 | −6 |
| False completion claims | not measured | 2 | n/a |
| Decision | | | **reject global promotion** |

H0 `claim_parse_rate` was 0.0, so the old `0 vs 2` cell is not a delta. The reject still holds because the gate was an absolute zero-FC bar on H1.

## How success was defined

1. Work runs in a **disposable copy**, never a live tree.  
2. An **external deterministic verifier** decides pass or fail.  
3. Scope violations and **false completion claims** are first-class failures, not footnotes.

Models: `qwen2.5-coder:14b`, `qwen3:14b`, `qwen3.5:9b`.

## The quiet failure the average missed

The entire H1 regression sat in one cell: `qwen3:14b` on **two-file-change** (2 runs, 0 pass, 2 false "done" claims). The model did not thrash or escape scope. It partially completed the work and reported complete. Twice.

| Model | Other cells | Two-file cell |
|-------|-------------|---------------|
| qwen2.5-coder:14b | 12/12 clean | - |
| qwen3.5:9b | 12/12 clean | - |
| qwen3:14b | 10/10 clean on five categories | **0/2 pass, 2 false done** |

## Pre-registered gate (paraphrased)

Before H1 results existed: strong held-out verified pass rate, **zero** scope violations, **zero** false completion claims, no human repair counted as a pass.

H1 improved scope and verified pass rate. It still failed the honesty gate. Decision: keep H1 profile-scoped; do not promote globally.

## Why this matters

Unsupervised agents are dangerous when the summary looks clean and the gap shows up later. Pre-register the unsafe failure mode before the pretty number arrives. Separate verified pass, scope, and claim honesty.

## What this does not prove

Not that H1 is worthless, or that `qwen3:14b` is globally bad (it passed 10 of 12 other cells). Not a production or frontier-model claim. Local stack, DEV routing only. Exploratory study: confirmatory use would need a fresh run under a pinned protocol.

## Claim I will stand behind

A packet harness that improved verified pass and scope was correctly **not promoted**, by a rule written before the run, because it failed a pre-registered honesty gate. H0 could not emit that metric.
