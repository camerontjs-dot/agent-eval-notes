---
title: "Public harness descriptions (disclosure without fixtures)"
privacy: "public-safe"
updated: "2026-08-08"
study_type: "method"
---

# Public harness descriptions

**Purpose:** Enough structural disclosure for a technical reader to trust the numbers, without shipping sealed fixtures, gold answers, full prompt text, or raw transcripts.

This is the middle ground between "trust me, I measured it" and "here is the entire lab." It follows the same spirit as harness-aware evaluation practice: name the scaffold, or do not claim a pure model result.

## Disclosure floor (what every public score should name)

| Field | Why it is public | Example |
|-------|------------------|---------|
| Task family | Prevents blended Elo | multi-file coding, constrained prose, RAG retrieve, honesty live |
| Model + stack | Reproducibility class | `qwen2.5-coder:14b`, Aider + Ollama |
| Harness id | Attribution | H0 / H1 packet / live-tool-loop v1 |
| Free factor | Isolation honesty | model only / `run_verify` on-off / packet A vs B |
| Oracle | How pass is decided | external deterministic verifier; not agent narrative |
| Claim channel | How "done" is scored | finish tool or explicit claim flag separate from verifier |
| n + study type | Strength of claim | exploratory, n=36 |
| Promotion gate | Decision rule | zero false completions on suite |

## What stays private (and why)

| Private | Reason |
|---------|--------|
| Sealed fixture source text and gold patches | Contamination: once public, they stop measuring generalization |
| Full system / packet prompt files | Easy to overfit and cargo-cult; structure is enough |
| Raw agent transcripts and tool dumps | Noise + path leakage; scrubbed summaries only |
| Private lab paths and internal run ids | No value to external readers |
| Unreviewed assistant-only grades as human gold | Epistemic honesty |

If you need to re-run the **method**, use the public [verified-done](https://github.com/camerontjs-dot/verified-done) demo split. If you need the **held-out headline**, you are in the same position as any sealed benchmark consumer: you get n, protocol, and decision language, not the exam paper.

## Stack A — Local coding packet harness (Reports 01–03)

**Runtime:** Aider as the coding agent shell, models served by Ollama (local open-weight). Optional fair path: Aider against an MLX server for Apple Silicon comparisons (Report 02).

**Environment:** Each attempt runs against a **disposable copy** of a task workspace. Production trees are never the work surface.

**Oracle:** An **external deterministic verifier** (tests / checks outside the model) decides pass or fail. Agent chat is not the grade.

**Scoring channels (independent):**

1. Verified pass (oracle green and in-scope)
2. Scope violation (edit outside allowed files)
3. False completion (claimed done while oracle red)

### H0 — baseline wrap

| Aspect | Public description |
|--------|-------------------|
| Role | Control harness for Report 01 |
| Shape | Standard agent wrap: model + edit loop + same external grade |
| Intent | "What you get without a structured packet" |
| Free factor in Report 01 | held fixed as baseline; H1 is the alternate harness |

### H1 — packet harness

| Aspect | Public description |
|--------|-------------------|
| Role | Treatment harness for Report 01; default multi-path path in Report 02 |
| Shape | **Structured task packet**: more explicit task framing and supplied context than H0, same models, same external verifier, same disposable-copy rule |
| Intent | Improve scope adherence and (by design hypothesis) completion honesty |
| What changed vs H0 | Packet structure / framing, not the model roster and not the oracle |
| What did **not** change | External verify definition; claim honesty still scored separately |
| Promotion result | **Not promoted globally** — zero-FC gate failed on two-file cell despite better aggregates |

**Why this is enough disclosure:** A reviewer can see that H0 vs H1 is a **scaffold comparison**, not a silent model swap. Full packet text is withheld so the sealed suite is not reconstructed from prompt residue.

## Stack B — Live tool-loop honesty harness (Report 06, verified-done)

**Runtime:** Hosted (Anthropic Haiku) or local (Ollama) model inside a **fixed tool contract**, not full Aider.

**Tools (public contract):**

| Tool | Class | Role |
|------|-------|------|
| `list` / `read` | lookup | inspect workspace |
| `write` | commit | edit files |
| `run_verify` | verify | call the external check **before** finish (optional arm removes this tool) |
| `finish` | claim | agent asserts complete; scored separately from oracle |

**Oracle:** Same idea as Stack A: deterministic `verify.py` (or equivalent) on a disposable workspace. Grade is not "does the model sound done."

**Ablation arms:**

| Arm | Free factor | Fixed |
|-----|-------------|-------|
| Tool-on | `run_verify` present | model, task, other tools, oracle |
| Tool-off | `run_verify` hidden | same |

**Public demo split:** eight small tasks in verified-done, authored for the repo (not the private sealed suite). Selftest proves each verifier discriminates.

**Findings this stack supports:** A (Haiku flip), B (model smoke), D/E (local coder-14b n=10, pooled 20/20 → 1/20 FC), F (qwen3:14b still 9/10 FC with the tool). Finding C is withdrawn: it was not an abstainer control. See Report 06 and `LIVE_EVIDENCE.md`.

## Stack C — Multi-path coding hard screen (Report 02)

| Aspect | Public description |
|--------|-------------------|
| Harness | Packet-style (H1 family) + external verify |
| Design | Fixed case types × seeds; multi-file and scope cases as discriminators |
| Free factor | Usually **model/path** under fixed harness |
| Second axis | Wall time and memory; never averaged into quality |

## Stack D — Fixture-safety / constrained prose (Report 03)

| Aspect | Public description |
|--------|-------------------|
| Harness | **Separate** from coding packet (different task family) |
| Oracle | Deterministic hard-fail rules before any keep grades |
| Point | Transfer failure: coding winners need not win constrained generation |

## Stack E — RAG routes (Report 04)

| Aspect | Public description |
|--------|-------------------|
| Design | Multi-axis: retrieve vs grounded generate (not one RAG Elo) |
| Harness | Sealed DEV corpus + fixed scorer per axis |
| Disclosure | Route cards and n per axis; corpus remains private |

## Stack F — Skill / instruction agent-as-evaluator (Report 05)

| Aspect | Public description |
|--------|-------------------|
| Split | Static workbench (lint, triggers, gates) + agent session (behavioral cases) |
| Matrix | Five-case edge set per skill (silent negative → overachiever) |
| Status | Protocol + thin smoke; not a multi-model sealed campaign |

## How to read a claim with these cards

1. Find the **stack** (A–F).
2. Check **free factor** (model vs harness module).
3. Check **oracle** and **claim channel** for coding/honesty work.
4. Check **n** and **exploratory** label.
5. If promotion language appears, demand the **pre-registered gate**.

## Credibility judgment (operator)

This is **enough** for hiring-manager and peer credibility if the tour always links here and METHODOLOGY. It is **not** enough for academic replication of sealed headlines — by design. The public demo split is the replication surface for the honesty method; sealed suites stay sealed so future runs mean something.

If a reviewer still says "black box," point them at:

1. This page  
2. Isolation protocol card  
3. verified-done selftest + live tool contract  
4. Report 06 ablation tables  

Do not "prove" credibility by dumping fixtures.
