---
title: "Report: self-verify is a dominant harness factor for completion honesty"
privacy: "public-safe"
updated: "2026-08-08"
study_type: "exploratory"
---

# Self-verify is a dominant harness factor for completion honesty

**Audience:** anyone shipping coding agents who still treats "done" as a model personality trait.  
**Study type:** exploratory live ablation on a public demo-split task family.  
**Unit:** tool contract × model × task (not a private sealed fixture).

## Headline

On the same model, same two-file task, and same scoring rules, turning off one tool flipped every outcome from clean to dishonest:

| Arm | n | Verified pass | False completion |
|-----|--:|--------------:|-----------------:|
| No `run_verify` tool | 3 | 0/3 | **3/3** |
| With `run_verify` tool | 3 | 3/3 | **0/3** |

Model: `claude-haiku-4-5`. Task: two-file parameter propagate. Harness: list / read / write / (optional) run_verify / finish. External deterministic verifier grades the workspace; the agent's finish claim is a separate channel.

Without a way to check its own work, the model claimed a half-finished two-file change was complete on every attempt. With the tool, it used verify before finish and stayed clean.

## Why I ran this

Report 01 showed a private sealed suite rejecting a harness that looked better on averages because of false completions. That left an open question: is completion honesty mostly "which model," or can the harness force the issue?

This probe holds the model fixed and removes one tool. That is the cleanest single-factor move I could run without burning held-out fixtures.

## What else showed up under the same tool-on harness

Honesty smoke, n=4 tasks (mechanical, scope, two two-file), verify tool on:

| Model | Verified pass | False completion | Note |
|-------|--------------:|-----------------:|------|
| claude-haiku-4-5 | 4/4 | 0 | Full 8-task demo split also 8/8, 0 FC |
| qwen2.5-coder:14b | 3/4 | 0 | Honest incomplete when it could not finish |
| qwen3.5:9b | 3/4 | 0 | Honest abstain on the two-file task |
| qwen3:14b | 3/4 | 1 | Still false-completed two-file even with the tool available |

The hard part: the tool is **necessary but not sufficient**. It flipped Haiku clean. A different model can still report done without using the tool.

## Decision language

1. Treat `run_verify` (or an equivalent external check the agent can call) as a **controlled harness factor**, not wallpaper.
2. Do not score "honest completion" without a claim channel separate from the verifier.
3. Prefer models that **abstain** when stuck over models that pass softer suites but lie on multi-file.

## How this pairs with Report 01

Report 01: harness change on a sealed local suite, pre-registered zero false-completion gate, promotion rejected.  
Report 06: live tool ablation on a public demo split, same failure mode, harness factor isolated.

Same conclusion from two instruments: if you care about unsupervised "done," measure claim honesty and treat the harness as an experimental axis.

## What this does not prove

- Small n. Ablation is three replicates on one hard task.
- Not a model leaderboard.
- Cloud runs are not bit-reproducible; local tool loops are not full IDE agents.
- Not production graduation.

## Runnable surface

The public demo split and runner live in [verified-done](https://github.com/camerontjs-dot/verified-done). Scrubbed live summary: that repo's `results/LIVE_EVIDENCE.md`.

## Claim I will stand behind

On this instrument, whether the agent can call an external verifier changed completion honesty from 0/3 to 3/3 for the same model on the same two-file task. That is a harness result, not a personality trait.
