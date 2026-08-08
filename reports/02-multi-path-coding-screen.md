---
title: "Report: multi-path coding hard screen (local agents)"
privacy: "public-safe"
updated: "2026-08-08"
study_type: "exploratory"
---

# Multi-path coding hard screen

**Audience:** roles involving local LLM coding agents, agent tooling, or model routing.  
**Study type:** exploratory sealed suite under packet harness + external verify.  
**Hard suite n per path:** 8 runs (4 case types × 2 seeds): mechanical-edit, regression-test, **two-file-change**, scope-trap.

## Headline

Most mid-size local models clear light coding cases and fail **multi-file coordination**. On this hard screen, only two paths finished perfect: a 14B coder and a 9B general model. One-shot harness repair did **not** rescue wrong model classes.

## Design choices that matter

- **One primary factor per phase** (model path or harness repair), not a blended soup.
- **External verify** decides pass; agent narrative does not.
- **Efficiency is a second axis:** wall time and backend RSS, never averaged into quality.
- **Sequential stacks only.** Dual-loading Ollama and an MLX server crushed memory in ops checks; screens run one stack at a time.

## Hard-screen scoreboard (selected paths)

| Path | Micro pass rate | two-file | Mean wall (s) | RSS peak (approx.) |
|------|----------------:|---------:|--------------:|-------------------:|
| qwen2.5-coder:14b (Ollama + Aider) | 1.00 | 2/2 | ~52 | ~15 GB |
| qwen3.5:9b (Ollama + Aider) | 1.00 | 2/2 | ~32 | ~8.6–10.6 GB |
| qwen3-coder:30b | 0.875 | 1/2 | ~20 | ~18 GB |
| qwen3:14b | 0.75 | 0/2 | ~39 | ~15–16 GB |
| Gemma 3 12B (Ollama fair) | 0.75 | 0/2 | ~50 | (see notes) |
| Gemma 3 12B (Aider + MLX server fair) | 0.75 | 0/2 | ~35 | ~7.1 GB |
| mistral-small3.1 | 0.75 | 0/2 | ~69 | ~16 GB |
| devstral | 0.75 | 0/2 (timeouts) | ~216 | ~16–17 GB |

Soft fair Gemma (no two-file case): **6/6** on both Ollama and MLX server paths. Light coding runtime parity held; multi-file still failed both.

## Harness repair (one retry) on two-file only

| Model class | Baseline two-file | After one repair |
|-------------|------------------:|-----------------:|
| Gemma / qwen3:14b | 0/2 | **0/2** |
| qwen3-coder:30b | 1/2 | **2/2** |

Repair helps a **near-miss coder**. It does not convert a non-coder multi-file failure into a pass.

## Decisions that followed the evidence

1. **Default multi-file reliability:** `qwen2.5-coder:14b` under Aider + packet harness.
2. **When RAM is tight and the suite is perfect:** prefer `qwen3.5:9b` (same 8/8, lower wall and RSS).
3. **Do not default** Gemma, devstral, mistral-small, or qwen3:14b for multi-file work on this suite.
4. **Repair is conditional,** not a blanket upgrade for every model.

These are **DEV / sealed-suite routes**, not a claim that every path graduated to unsupervised real worktrees.

## Claims (provisional)

1. Multi-file is the discriminating case on this instrument.
2. Prefer model class over harness repair for multi-file failures.
3. Pass rate and efficiency must stay separate columns.
4. Fair MLX (Aider + server) is viable for light coding comparisons; it did not fix Gemma's two-file gap.

## What this does **not** prove

- Not a global ranking of all open models (roster is deliberate, not exhaustive).
- Not SWE-bench or Aider Polyglot calibration (those are separate, optional shortlist tools).
- Not production autonomy. External verify on sealed fixtures is not the same as live repo graduation.
- Small per-cell n (2 seeds). Enough to route defaults and reject weak multi-file paths; not enough to crown a permanent winner.

## Resume angle

Show you can run a **fair multi-path screen**, keep efficiency honest, and change defaults when multi-file evidence contradicts soft-suite comfort.
