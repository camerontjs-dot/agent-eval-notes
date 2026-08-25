---
title: "Report: the harness that scored better and was not promoted"
privacy: "public-safe"
updated: "2026-08-16"
study_type: "exploratory"
---

# The harness that scored better and was not promoted

**Audience:** hiring managers and technical interviewers evaluating agent evaluation or AI reliability work.  
**Study type:** exploratory measurement on local open-weight coding agents (Aider + Ollama).  
**n:** 36 sealed runs per harness on the core suite (6 task categories × 3 models × 2 seeds).

## Headline

On a sealed coding-agent suite, a packet-style harness (H1) improved verified passes and cleared scope, then failed a pre-registered honesty gate and was **not promoted** for global use. The baseline wrap could not emit that honesty metric.

| Metric | H0 baseline | H1 packet | Delta |
|--------|------------:|----------:|------:|
| Verified passes | 28 / 36 | 34 / 36 | +6 |
| Scope violations | 6 | 0 | −6 |
| False completion claims | not measured | 2 | n/a |
| Decision | | | **reject global promotion** |

H0 `claim_parse_rate` was 0.0. The baseline never produced a parseable completion claim, so a recorded zero there is a missing measurement, not a clean honesty score. H1 is the first harness in this comparison where false completion is defined. The reject still holds: the gate was zero false completions on H1, not "better than H0".

This is a methods result about **how you decide**, not a claim that H1 is worthless or that any model is globally bad.

## Setup (what was measured)

I built a private evaluation lab for local coding agents. Success is not "the diff looked right." Success is:

1. Work runs in a **disposable copy**, never a live tree.
2. An **external deterministic verifier** decides pass or fail.
3. Scope violations and **false completion claims** are first-class failure modes, not footnotes.

Harnesses under test (structure only; full packet text stays private):

- **H0:** baseline agent wrap — model + edit loop + same external grade, without the structured packet
- **H1 (packet):** structured task packet — more explicit task framing and supplied context than H0; **same** models, disposable workspaces, and external verifier

What is shared across H0/H1: Aider + Ollama runtime, disposable copies, external deterministic verify, separate scoring of scope and false "done" claims.  
What differs: packet structure only (scaffold comparison). Public card: [`briefs/public-harness-descriptions.md`](../briefs/public-harness-descriptions.md).

Models: `qwen2.5-coder:14b`, `qwen3:14b`, `qwen3.5:9b` under Aider + Ollama.

## Pre-registered gate

Before H1 results existed, graduation required (paraphrased):

- strong held-out verified pass rate
- zero scope violations
- **zero false completion claims**
- no human repair counted as a pass

H1's change log expected better scope adherence **and more accurate completion claims**. That prediction is load-bearing: the harness was supposed to fix the failure that later rejected it.

## What the aggregate missed

The entire H1 regression sat in one cell:

| Model | Category | Runs | Passes | Scope violations | False "done" claims |
|-------|----------|-----:|-------:|-----------------:|--------------------:|
| qwen2.5-coder:14b | all six categories | 12 | 12 | 0 | 0 |
| qwen3.5:9b | all six categories | 12 | 12 | 0 | 0 |
| qwen3:14b | five of six | 10 | 10 | 0 | 0 |
| **qwen3:14b** | **two-file-change** | **2** | **0** | **0** | **2** |

On two-file coordination, `qwen3:14b` did not thrash or escape scope. It partially completed the work and reported **done**. Twice. That is the quiet failure mode unsupervised agents are dangerous for: the summary looks clean and the gap shows up later.

## Decision

**Do not promote H1 globally.** Keep it profile-scoped. Block multi-file coordination for the failing model class until evidence changes.

The same false-completion pattern reappeared on an independent stress suite (2 false claims on the H1 stress run-set). Small n still, but not a single unlucky cell only.

## Why this is resume-relevant

This is applied evaluation discipline, not a leaderboard chase:

- Pre-register the unsafe failure mode **before** the pretty number arrives.
- Separate **verified pass**, **scope**, and **claim honesty**.
- Prefer a reject that protects real delegation over a dashboard that looks shippable.

Pharma QA habits transfer here: acceptance criteria outrank a metric that moved the right way.

## What this does **not** prove

- Not that H1 is a bad harness. It improved verified passes and cleared scope.
- Not that `qwen3:14b` is a bad model. It passed 10 of 12 other cells clean.
- Not that packet prompting *causes* false completions (confound not isolated; n per cell is 2).
- Not a production or frontier-model claim. Local stack, DEV routing only.
- Exploratory study: confirmatory use would need a fresh run under a pinned protocol.

## Claim I will stand behind

A packet harness that improved verified pass and scope was correctly **not promoted**, by a rule written before the run, because it failed a pre-registered honesty gate. I will not stand behind the old 0 vs 2 comparison: H0 could not emit that metric.

## Interview talking points (optional)

1. Why is a false "done" worse than a loud scope violation for unsupervised agents?
2. How would you instrument claim accuracy without trusting the model's self-report?
3. What changes if n becomes large enough to rank models, not only reject promotions?
