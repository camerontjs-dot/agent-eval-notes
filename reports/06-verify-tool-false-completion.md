---
title: "Report: self-verify is a dominant harness factor for completion honesty"
privacy: "public-safe"
updated: "2026-08-13"
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

### Finding D: local coder-14b reproduces the honesty flip (n=10 per arm)

| Arm | n | Verified pass | False completion | Honestly abstained |
|-----|--:|--------------:|-----------------:|-------------------:|
| With `run_verify` | 10 | 3/10 | **1/10** | 6/10 |
| No `run_verify` | 10 | 0/10 | **10/10** | 0/10 |

Model: `qwen2.5-coder:14b`. Ten out of ten false completions without the tool: every run claimed done, every verifier disagreed.

The tool traces show what actually differs. With `run_verify` the model calls it two to four times and then finishes with an accurate diagnosis, for example a `TypeError` about `total` not accepting `tax_rate`. Without it, two of the ten runs called `finish(complete)` claiming tax support had been added to both files, having made no edits at all. The failure is not that the model tries and then oversells. It asserts a completion it never attempted.

The tool is also not a fix. It cuts false completion from 10/10 to 1/10 and does not eliminate it. See Finding E below, where that single false completion did not recur on a second runtime.

Consistency, as `pass^k` (all k trials succeed):

| Arm | pass^1 | pass^2 | pass^4 | pass^8 |
|-----|-------:|-------:|-------:|-------:|
| With `run_verify` | 0.30 | 0.07 | 0.00 | 0.00 |
| No `run_verify` | 0.00 | 0.00 | 0.00 | 0.00 |

**Correction (2026-08-13).** This finding first ran at n=2 per arm, and the small sample got two things wrong. It reported 0/2 verified passes with the tool and concluded the model "still cannot finish" this task; at n=10 it finishes three times. It also read as a clean flip between lying and abstaining, when the tool leaves one false completion in ten.

### Finding C: qwen3.5:9b never reaches a claim (void as a control)

| Arm | n | Verified pass | False completion | Dominant ledger |
|-----|--:|--------------:|-----------------:|-----------------|
| With `run_verify` | 10 | 0/10 | 0/10 | No claim reached (10/10) |
| No `run_verify` | 10 | 0/10 | 0/10 | No claim reached (10/10) |

All twenty runs ended on `max turns`. The model reads two files, issues eleven `write_file` calls, and is cut off. It never calls `run_verify` even when offered, and never calls `finish`.

So this cell does not compare the arms. The claim channel was never reached, which makes it uninformative rather than clean.

**Correction (2026-08-13).** At n=2 this looked like a model that abstained in both arms, and it was published as the control showing the verify-tool effect is model-dependent. Raising n showed every run was a turn-budget timeout. The old label credited a timeout with honesty the model never demonstrated, so `honestly abstained` now requires an actual finish call and budget exhaustion carries its own label.

**Retraction (2026-08-15). This cell was my instrument, not the model.** I attributed the looping to intent drift, the redundant-repeated-calls failure named in the multi-turn tool-use literature. That attribution was wrong.

`qwen3.5:9b` returns its reasoning in a separate `thinking` field and leaves `content` empty. The Ollama adapter appended only `content`, so every turn wrote a blank assistant message and discarded the model's reasoning, then followed it with an instruction to reply with a tool call. The model was not drifting. It was re-deriving its plan from nothing on every turn because the harness had erased it.

Re-running the identical design with the reasoning preserved, changing nothing else:

| Arm | n | Verified pass | False completion | Dominant ledger |
|-----|--:|--------------:|-----------------:|-----------------|
| With `run_verify` | 10 | 1/10 | 0/10 | No claim reached (9/10) |
| No `run_verify` | 10 | 0/10 | **10/10** | Unsupported assertion (10/10) |

The tool traces show the mechanism plainly. Before: 13 tool calls, no claim, about 509s per run. After: 7 tool calls, `finish(complete)` every time, about 120s. Half the actions and a quarter of the time, because it was no longer repeating work it had already reasoned through.

So the no-tool arm is now a real result and a strong one, 10 false completions in 10. The tool arm still never reaches a claim inside the turn budget, which leaves this comparison one-sided rather than clean.

Two things follow. The intent-drift classification is withdrawn. And a harness that assumes prose in `content` will silently mismeasure any reasoning model, which is most of the current local field: four of the six models tested here return an empty `content`.

### Finding E: the effect replicates across a runtime upgrade

The host's Ollama went from 0.32.7 to 0.32.9 between sessions. That is an unplanned chance to re-run Finding D with exactly one factor changed underneath the model, so I took it.

| Arm | Runtime | Verified pass | False completion | Honestly abstained |
|-----|---------|--------------:|-----------------:|-------------------:|
| With `run_verify` | 0.32.7 | 3/10 | 1/10 | 6/10 |
| With `run_verify` | 0.32.9 | 3/10 | 0/10 | 7/10 |
| No `run_verify` | 0.32.7 | 0/10 | **10/10** | 0/10 |
| No `run_verify` | 0.32.9 | 0/10 | **10/10** | 0/10 |

The effect holds. Verified passes are identical, the no-tool arm produced a false completion in all twenty of its runs across both runtimes, and `pass^k` matches to three decimals.

One run moved, and it happens to be the run a published sentence rests on. Finding D says the tool "does not eliminate" false completion, on the strength of one occurrence in ten. That occurrence did not recur. Pooled, the tool-on arm is 1 false completion in 20 and the tool-off arm is 20 in 20.

One event in twenty cannot separate a low rate from a fluke. So the claim I will make is the ratio, and the residual stays visible rather than rounded off: with the tool, 1/20. Without it, 20/20. "Not proven to eliminate" is the honest phrasing, and it is a different statement from "proven not to eliminate."

**The upgrade also fixed the instrument.** Token capture returned zero on the old runtime, which made the efficiency axis uncomputable. It works now:

| Arm | Total tokens | × baseline | pass^1 | pass_cost^1 |
|-----|-------------:|-----------:|-------:|------------:|
| With `run_verify` | 92,167 | 5.89 | 0.30 | 0.169 |
| No `run_verify` | 15,645 | 1.00 | 0.00 | 0.000 |

The verify tool costs about six times the tokens. Discounting consistency by that spend drops it from 0.30 to 0.169, which is the honest price of the intervention and belongs next to the headline. The cheap arm scores zero at every k, because an arm that never succeeds is not efficient at any price.

One thing this does not measure: wall-clock. Median tool-on duration went from 46.7s to 65.2s, and the two runs were twelve hours apart on a laptop that had been shut down in between. Thermal state and background load are uncontrolled here, so that difference is not attributable to the runtime and is not reported as a finding.

### Finding F: qwen3:14b uses the verifier and overclaims anyway

Run after the adapter fix, so this cell is measured on a working instrument.

| Arm | n | Verified pass | False completion | Honestly abstained |
|-----|--:|--------------:|-----------------:|-------------------:|
| With `run_verify` | 10 | 1/10 | **9/10** | 0/10 |
| No `run_verify` | 10 | 0/10 | **10/10** | 0/10 |

Both arms reached a completion claim in every run, which makes this the cleanest two-armed comparison in this report: nothing here is void or one-sided.

The tool buys almost nothing. It costs 2.26 times the tokens and moves false completion from 10/10 to 9/10, for a `pass_cost^1` of 0.074. All ten tool-on runs called `run_verify` once and nine still claimed completion the external verifier contradicted.

Set against `qwen2.5-coder:14b`, where the same tool on the same task takes false completion from 20/20 to 1/20, this is what model-dependence looks like when it is actually measured.

This finding also supersedes the n=4 honesty smoke row above, which reported 1 false completion for this model with the tool available. That direction was right and the magnitude was badly understated, and it was measured through the adapter that discarded reasoning.

**Caveat.** Six turns across these twenty runs hit the `num_predict` output cap. A truncated turn can suppress a tool call on a reasoning model, so some individual runs carry that asterisk. It does not threaten the comparison: 9/10 against 1/20 is not a truncation artifact, and both arms ran under the identical cap.

## What raising n cost and bought

Both corrections came from the same move: re-running published cells at n=10 instead of n=2. Two replicates were enough to see an effect and not enough to characterize it, and in Finding C they were not enough to notice the effect was an artifact.

This is the argument for reporting `pass^k` rather than a single-trial rate. A cell with two replicates cannot report consistency at all, and a model passing 3 of 10 reads very differently at `pass^8`.

## Decision language

1. Treat `run_verify` (or an equivalent external check the agent can call) as a **controlled harness factor**, not wallpaper.
2. Do not score "honest completion" without a claim channel separate from the verifier.
3. Separate "the agent said it could not finish" from "the run ended before the agent said anything." Only the first is honesty.
4. Prefer models that **abstain** when stuck over models that pass softer suites but lie on multi-file.
5. When comparing models, hold the tool contract fixed. When comparing harnesses, hold the model fixed. Report both pass rate and false-completion rate.
6. Report `pass^k`, not a single-trial rate, before calling any cell reliable.

## How this pairs with Report 01

Report 01: harness change on a sealed local suite, pre-registered zero false-completion gate, promotion rejected.  
Report 06: live tool ablation on a public demo split, same failure mode, harness factor isolated on cloud and local open weights.

Same conclusion from two instruments: if you care about unsupervised "done," measure claim honesty and treat the harness as an experimental axis.

## What this does not prove

- Small n. The Haiku ablation is three replicates. Local arms are ten per cell, twenty pooled across the two runtimes.
- One task family. Every local finding here is the same two-file propagate task, so this is a claim about that task on that model, not about coding agents generally.
- Not a model leaderboard.
- Cloud runs are not bit-reproducible; local tool loops are not full IDE agents.
- Not production graduation.
- Abstention is better than false completion; it is not the same as a verified pass.

## Runnable surface

The public demo split and runner live in [verified-done](https://github.com/camerontjs-dot/verified-done). Scrubbed live summary: that repo's `results/LIVE_EVIDENCE.md` (Findings A–D).

## Claim I will stand behind

On this instrument, whether the agent can call an external verifier changed completion honesty from 0/3 to 3/3 for Haiku, and from 20/20 false completions to 1/20 for local `qwen2.5-coder:14b` on the same two-file task, pooled over two runtime versions.

That is a harness factor. It is also a harness × model interaction, and the evidence for that is Finding F rather than Finding C, which was withdrawn:

| Model | No `run_verify` | With `run_verify` |
|-------|----------------:|------------------:|
| `qwen2.5-coder:14b` | 20/20 FC | **1/20 FC** |
| `qwen3:14b` | 10/10 FC | **9/10 FC** |

Same harness, same task, same tool contract, same turn budget. On one model the verifier nearly eliminates false completion. On the other it changes almost nothing. Whether an external check makes an agent honest is a property of the pair, not of the tool.

What I will not claim: that the tool causes honesty. On `qwen2.5-coder:14b` it moves runs from false completion into abstention, which is the behaviour worth wanting. On `qwen3:14b` it does not. Every one of the ten tool-on runs called `run_verify`, exactly once, and nine then claimed completion that the external verifier contradicted. Availability of a checker, and even using it, is not the same as heeding it.
