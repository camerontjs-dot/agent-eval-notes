---
title: "Report: agent-as-evaluator protocol for skill and instruction docs"
privacy: "public-safe"
updated: "2026-08-08"
study_type: "methodology + early instrumentation"
---

# Agent-as-evaluator protocol for skill and instruction docs

**Audience:** roles that care about prompt/skill reliability, instruction design, or eval protocols without a permanent API bill.  
**Study type:** methodology with early instrumentation. Not a multi-model campaign at coding-lab scale.  
**Unit:** skill document × case profile × agent session (not a coding worktree pass).

## Headline

I evaluate agent **skills and instruction docs** with a split runtime: a free deterministic Python workbench for structure and triggers, and the **active agent session** as the behavioral runner and first-pass judge. Every skill is forced through a five-case edge matrix so prompts cannot pass by being only verbose or only brief.

## Why agent-as-evaluator

The usual path is a Python harness that calls a model API for every cell. That burns tokens, couples the suite to one vendor, and still needs a human when the judgment is about instruction following in a real tool loop.

I chose a different split:

| Layer | Who runs it | Job |
|-------|-------------|-----|
| Static workbench | Python CLI | Lint structure, match triggers, aggregate receipts, enforce gates |
| Behavioral session | Active agent (Claude Code, Codex, etc.) | Exercise the skill on case inputs, apply verify criteria, write JSON receipts |

No extra LLM API cost for the behavioral loop. The agent under test is already in session. Cross-model comparison is "run the same procedure in two sessions," then compare receipts.

Honest limit: this is not unattended CI for the full behavioral path. Static lint and trigger stubs can sit in a pre-commit hook. Full case walks need an agent session.

## Five-case edge matrix

Every skill under test is scored against five behavioral profiles. The matrix is the anti-overfit device (pesticide paradox: the same cases forever teach the prompt to pass the suite, not the job).

| Case profile | What it probes | Failure signal |
|--------------|----------------|----------------|
| Silent negative | Activation boundary on adjacent work | Skill loads when it should stay quiet |
| Happy path | Clear, fully specified input | Missing required structure or core task |
| Minimal input | Underspecified request | Guesses a full draft instead of clarifying |
| Edge / conflict | Messy or contradictory constraints | Ignores constraints or breaks format |
| Overachiever / constraints | Length caps, forbidden terms | Spills past limits or uses banned language |

When a skill fails in real use, the failure is transcribed into a new case. The suite grows from production defects, not only from author imagination.

## Trajectory layers (not string match alone)

Evaluation is multi-layer:

1. **Activation** - Does the skill trigger only when it should? Stub matcher + trigger density lint (capped trigger sets).
2. **Execution** - Does the output meet case criteria? Deterministic `verify.py` checks plus structured self-eval against the case card.
3. **Calibration / gate** - Pass-rate thresholds and mandatory boundary cases (silent-negative and happy-path cannot fail open).

This tracks the shift from final-answer grading to trajectory-aware agent evaluation, adapted for instruction documents rather than web agents.

## What is instrumented today

| Artifact | Status |
|----------|--------|
| Methodology and first-principles notes | Written and used as design authority |
| Python workbench (lint, stub, receipts, report, gate) | Implemented |
| Case packs | `prompt-creation`, `skill-creation`, and a process-control skill family |
| Behavioral receipts | **Smoke only** (see table) |
| Graduation claims | Not claiming fleet-wide skill graduation |

### Smoke receipts (honest thin slice)

Only `prompt-creation` / `happy-path` has behavioral receipts so far. Two manual-test runs on 2026-06-22:

| Timestamp | Verdict | Activated | Notes |
|-----------|---------|-----------|-------|
| 03:28:01Z | pass | yes | Structure assertions clean |
| 03:28:08Z | fail | yes | Missing sections (`element annotation`, `watch for`); forbidden phrase hit |

That is enough to prove the receipt path works and that verify can fail a "looks fine" draft. It is **not** a five-case × multi-model campaign. Silent-negative, minimal-input, edge, and overachiever cases are authored; full behavioral walks are still thin.

Treat this report as **protocol evidence** plus early instrumentation, not as a large sealed multi-model scoreboard.

## Resume angle

You designed an eval protocol that separates free static checks from expensive reasoning, forces activation and constraint boundaries, and uses the agent session itself as the evaluator so skill regression tests stay cheap and realistic.

## What this does **not** prove

- Not that every skill in the workspace has passed a graduation gate.
- Not that agent self-judgment is bias-free (verify scripts and mandatory cases are the control).
- Not interchangeable with the coding-agent sealed lab (different unit of work, different metrics).
- Not a published open suite of skill fixtures.

## Relationship to the coding-agent reports

Reports 01–04 measure coding, constrained prose, and RAG stacks under external verifiers. This report measures **instruction and skill documents**. Same discipline: pre-registered failure modes, explicit gates, separate metrics. Different harness.
