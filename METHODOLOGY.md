---
title: "Methodology (public summary)"
privacy: "public-safe"
updated: "2026-08-08"
---

# Methodology (public summary)

This is the public-facing measurement contract. It describes *how* claims are formed without documenting private lab layout or sealed fixtures.

## Unit of measurement

Claims are always scoped to a **tuple**:

**task family × model (or profile) × harness version**

Examples of task families: multi-file coding edits, constrained prose generation, retrieve vs grounded generate, skill/instruction behavior.

A good score in one family is not evidence for another. Reports refuse a single blended Elo.

## Success conditions (coding agents)

For coding-agent work:

1. Execution happens in a **disposable copy**, never an active production worktree.
2. An **external deterministic verifier** decides pass or fail. Agent narrative is not enough.
3. **Scope violations** and **false completion claims** are first-class failures.
4. Efficiency (wall time, memory) is recorded as a **second axis**, never averaged into quality.

## Pre-registration over post-hoc story

When a harness change is under test, acceptance gates are written **before** the pretty score exists. The H1 packet harness (report 01) is the exhibit: better verified pass rate, zero scope violations, still rejected because false completion claims violated a pre-registered zero-tolerance gate. H0 could not emit that honesty metric (`claim_parse_rate` 0.0), so the published table records H0 false-completion as **not measured**, not zero. A control arm that cannot fail a metric is not a clean zero on that metric.

## One factor per phase

A phase changes either the model path **or** the harness factor, not both. Otherwise attribution collapses.

## Harness isolation (protocol card)

Long-horizon agent scores mix model and harness. Before claiming a model win, a harness win, or a promotion:

1. Name the **unit under test** (model vs one harness module vs full product stack).
2. Hold everything else **fixed** and written down (tool contract, prompts, memory, task ids, verifier).
3. Publish scores with **disclosure fields**: model, harness version, tools (especially verify), task family, n, study type, and any promotion gate.
4. For coding agents, report **verified pass** and **false completion** as separate metrics. Prefer a pre-registered zero false-completion gate on promotion suites.
5. Prefer isolation designs already exercised here: same model tool-on/off (Report 06), same harness multi-model honesty smoke, packet A vs B at fixed models (Report 01), multi-family transfer (Report 03).

Full checklist: [`briefs/harness-isolation-protocol-card.md`](briefs/harness-isolation-protocol-card.md).

## Public harness descriptions (credibility without fixtures)

Structural disclosure for each stack used in the reports lives in [`briefs/public-harness-descriptions.md`](briefs/public-harness-descriptions.md): H0 vs H1 packet, live tool contract (`list` / `read` / `write` / optional `run_verify` / `finish`), multi-path, fixture-safety, RAG, and skill stacks.

**Disclosed:** runtime class, tool contract, free factor, oracle, claim channel, n, promotion gates.  
**Not disclosed:** sealed fixture text, gold patches, full prompt files, raw transcripts.

That split is intentional. Sealed fixtures stay sealed so they keep measuring something; the public [verified-done](https://github.com/camerontjs-dot/verified-done) demo split is the re-runnable method surface.

## Separate harnesses per task family

Constrained prose is not graded with the coding packet harness. RAG retrieve is not blended with grounded generation. Skill activation is not a worktree edit pass.

## Skill / instruction evaluation (report 05)

Skills and instruction docs use a different runtime split:

- **Static workbench:** structure lint, trigger matching, receipt aggregation, gate math (no LLM API).
- **Agent session:** behavioral exercise of cases, first-pass judgment against case criteria, JSON receipts.

Every skill faces a five-case edge matrix: silent negative, happy path, minimal input, edge/conflict, overachiever/constraints.

## Labels

| Label | Meaning |
|-------|---------|
| Exploratory | Useful for routing and methods discussion; not confirmatory |
| Measured | Number comes from a sealed suite run with stated n |
| Not promoted | Failed a pre-registered gate or was held to profile scope |
| DEV routing only | Default for local use in development, not unsupervised production graduation |

## What external readers cannot re-run from this package

The private held-out fixtures are not published. That is intentional contamination control. Public materials explain method and restate locked numbers; they do not ship the instrument that produced the headline.
