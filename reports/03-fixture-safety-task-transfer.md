---
title: "Report: fixture-safety and task-family transfer failure"
privacy: "public-safe"
updated: "2026-08-08"
study_type: "exploratory"
---

# Fixture-safety and task-family transfer failure

**Audience:** roles in evaluation design, synthetic data, constrained generation, or agent routing.  
**Study type:** exploratory constrained-prose suite (deterministic scorer + human-style keep grades).  
**n:** 36 matrix jobs (3 sealed cases × 4 models × 3 seeds) on the v0.1-robust panel.

## Headline

The **best multi-file coding model on the hard screen produced zero auto-clean constrained prose outputs** on this suite. Task families do not transfer. Routing by a single "best local model" is an anti-pattern the data rejected.

## Problem the suite targets

When generating dry operational filler next to gold or regulated material, models must obey hard constraints: subject bans, verb bans, format, word bands, no meta-leak, no forbidden propositions. Looking fluent is not enough. Contaminating gold is a real failure mode.

This is a **prose harness**, not the coding packet path. Scores are never blended with coding pass rates.

## Pipeline

1. Generate under a fixed contract.
2. **Auto scorer** hard-fails rule breaks (deterministic).
3. Only auto-clean outputs get quality grades (assignment + writing axes).
4. Keep requires both axes at threshold (A≥3 and B≥3 on the graded pass).

## Panel results (v0.1-robust)

| Metric | Value |
|--------|------:|
| Matrix jobs | 36 |
| Auto-clean (no hard-fail) | 10 |
| Keep (after grades on auto-clean) | 9 |
| Iterate | 1 |
| Kill | 0 |
| **Keep rate of full matrix** | **0.25** |

Most generations fail the rules before any human taste test. That is the point of the instrument.

### By model (9 jobs each)

| Model profile | Auto-clean | Keep | Notes |
|---------------|----------:|-----:|-------|
| qwen3.5:9b | 3 | 3 | Best writing axis on keeps (B=4 on all three) |
| qwen3:14b | 3 | 3 | Solid alternate general |
| qwen3-coder:30b | 4 | 3 | One iterate (subject-adjacent slip) |
| **qwen2.5-coder:14b** | **0** | **0** | Coding hard-screen winner; **wrong family** for this job |

Human grades on the auto-clean set were assistant first-pass with operator confirm still open. Treat keep labels as **provisional**, not locked gold. The transfer failure does not depend on the soft grades: coder-14b never reached auto-clean.

## Decision language

| Route | Model | Evidence |
|-------|-------|----------|
| Prose / constrained filler default | qwen3.5:9b | All auto-clean seeds kept; best writing scores |
| Do not use for this task | qwen2.5-coder:14b | 0/9 auto-clean |
| Coding multi-file default | qwen2.5-coder:14b | Separate hard screen (see report 02) |

Same lab, separate harnesses, separate winners.

## Claims (provisional)

1. **Task-family transfer fails** between multi-file coding and constrained filler on these instruments.
2. A low keep rate (~25%) is informative, not an embarrassment: unconstrained "good writing" benches would miss the contamination risk.
3. Negative results (coding champion fails prose rules) are publishable and more useful than silent regeneration.

## What this does **not** prove

- Not general writing quality or creative writing ranking.
- Not regulated corpus accuracy claims.
- Not a full panel for every model (Gemma prose was smoke-only later).
- Grades pending final operator confirm remain provisional.

## Resume angle

You designed an eval that **protects gold material**, measured hard-fail rates, and refused to promote a coding winner into a prose job without evidence.
