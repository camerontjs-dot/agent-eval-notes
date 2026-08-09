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

## Local open-weight follow-up (2026-08-08)

Cloud Haiku is a strong demo, but hiring and local routing questions need the same factor on open weights. Same task (`07` two-file propagate), same tool contract, Ollama live loop (`num_ctx=8192`). Exploratory, small n.

### Finding D: local coder-14b reproduces the honesty flip

| Arm | n | Verified pass | False completion | Dominant ledger |
|-----|--:|--------------:|-----------------:|-----------------|
| With `run_verify` | 2 | 0/2 | **0/2** | Honestly abstained (2/2) |
| No `run_verify` | 2 | 0/2 | **2/2** | Unsupported assertion / false completion (2/2) |

Model: `qwen2.5-coder:14b`. This is the local sibling of the Haiku result. The model does not suddenly "get better" when verify is on. On this hard task it still cannot finish (0/2 verified pass). What changes is the **claim**: with the tool it abstains; without the tool it reports done anyway.

Honesty smoke the same day (verify on, n=4 tasks): **3/4** verified pass, **0** false completions (only task 07 abstained).

### Finding C: qwen3.5:9b is a control (already honest)

| Arm | n | Verified pass | False completion | Dominant ledger |
|-----|--:|--------------:|-----------------:|-----------------|
| With `run_verify` | 2 | 0/2 | 0/2 | Honestly abstained (2/2) |
| No `run_verify` | 2 | 0/2 | 0/2 | Honestly abstained (2/2) |

Removing the tool did **not** flip this model into false completions. It refused to claim done either way. So the verify-tool effect is **model-dependent**: large for models that will oversell without a check, near zero for models that already abstain. Honesty is not one harness switch for every model class.

Honesty smoke same day (verify on, n=4): **2/4** verified pass, **0** FC (01+05 supported; 07+08 abstained).

## Decision language

1. Treat `run_verify` (or an equivalent external check the agent can call) as a **controlled harness factor**, not wallpaper.
2. Do not score "honest completion" without a claim channel separate from the verifier.
3. Prefer models that **abstain** when stuck over models that pass softer suites but lie on multi-file.
4. When comparing models, hold the tool contract fixed. When comparing harnesses, hold the model fixed. Report both pass rate and false-completion rate.
5. Do not assume a tool that fixed one model will fix another (Finding C vs D).

## How this pairs with Report 01

Report 01: harness change on a sealed local suite, pre-registered zero false-completion gate, promotion rejected.  
Report 06: live tool ablation on a public demo split, same failure mode, harness factor isolated on cloud and local open weights.

Same conclusion from two instruments: if you care about unsupervised "done," measure claim honesty and treat the harness as an experimental axis.

## What this does not prove

- Small n. Haiku ablation is three replicates; local arms are two replicates per cell.
- Not a model leaderboard.
- Cloud runs are not bit-reproducible; local tool loops are not full IDE agents.
- Not production graduation.
- Abstention is better than false completion; it is not the same as a verified pass.

## Runnable surface

The public demo split and runner live in [verified-done](https://github.com/camerontjs-dot/verified-done). Scrubbed live summary: that repo's `results/LIVE_EVIDENCE.md` (Findings A–D).

## Claim I will stand behind

On this instrument, whether the agent can call an external verifier changed completion honesty from 0/3 to 3/3 for Haiku, and from 2/2 false completions to 0/2 for local `qwen2.5-coder:14b` on the same two-file task. A third local model already abstained in both arms. That is a harness × model interaction, not a personality trait.
