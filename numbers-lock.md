# Numbers lock (public package)

Every public headline number in this package should match a row here. Re-lock before changing report prose or the Pages tour.

**Study type:** exploratory unless a row says otherwise.  
**Stack default:** local open-weight models under Aider + Ollama unless a row names another stack.  
**Private fixtures:** not published. Suite names are labels only.

## Report 01: H1 rejection (core suite)

| Metric | H0 | H1 | n / design |
|--------|---:|---:|------------|
| Verified passes | 28/36 | 34/36 | 6 categories × 3 models × 2 seeds |
| Scope violations | 6 | 0 | same |
| False completion claims | not measured | 2 | both on `qwen3:14b` / two-file-change |
| Decision | | **not promoted globally** | pre-registered zero-FC gate |

H0 `claim_parse_rate` was **0.0** on this suite (`outputs/20260614T003502Z-core-H0-current.md`). The baseline wrap never emitted a parseable completion claim, so false-completion is undefined on H0, not zero. Do not publish `0 vs 2` as a delta. H1 is the first harness in this lab where the claim channel is measurable. The promotion reject still holds because the gate was an **absolute** zero-FC bar on H1, not "fewer false completions than H0".

Models: `qwen2.5-coder:14b`, `qwen3:14b`, `qwen3.5:9b`. Dates: 2026-06-14 (core compare). Stress suite also recorded 2 FC under H1 (2026-06-15). Locked restatement: 2026-08-16.

## Report 02: Multi-path coding hard screen

| Path | Pass | Two-file | Wall | RSS (approx.) |
|------|-----:|---------:|-----:|---------------|
| qwen2.5-coder:14b | 1.00 (8/8) | 2/2 | ~52s | ~15 GB |
| qwen3.5:9b | 1.00 (8/8) | 2/2 | ~32s | ~9–11 GB |
| qwen3-coder:30b | 0.875 | 1/2 | ~20s | ~18 GB |
| qwen3:14b | 0.75 | 0/2 | ~39s | ~15–16 GB |
| Gemma 3 12B fair Ollama / MLX | 0.75 | 0/2 | ~50 / ~35s | MLX ~7.1 GB |

n per path: 8 (4 case types × 2 seeds). H2 one-repair: Gemma/qwen3:14b stay 0/2; coder-30b 1/2 → 2/2. Date: 2026-07-18.

## Report 03: Fixture-safety transfer

| Metric | Value |
|--------|------:|
| Matrix jobs | 36 (3 cases × 4 models × 3 seeds) |
| Auto-clean | 10 |
| Keep (provisional grades) | 9 |
| Keep rate | ~0.25 |
| qwen2.5-coder:14b auto-clean | 0/9 |
| qwen3.5:9b keep | 3/3 of its auto-clean |

Date: 2026-07-17 (v0.1-robust). Keep grades provisional.

## Report 04: RAG routes

| Axis | n | Headline |
|------|--:|----------|
| Retrieve embedders | 60 jobs | BM25 and BGE-M3 1.00; nomic/MiniLM 0.92 (status-sensitive miss) |
| Fixed-context gen | 48 jobs | four models 1.00; default lightest perfect (~5s) |

**Ceiling note:** R4 pass rates are at 1.00. Do not rank models by pass rate until harder adversarial/refuse cases land. Date: 2026-07-21. DEV synthetic corpus only.

## Report 05: Skill-eval (thin instrumentation)

| Item | Status |
|------|--------|
| Protocol | Designed: static workbench + agent session; five-case matrix |
| Case packs | prompt-creation, skill-creation (+ process-control family) |
| Behavioral receipts published here | **Smoke only:** `prompt-creation` / happy-path, two manual-test receipts (pass then fail on structure asserts) |
| Multi-model sealed campaign | **Not done.** Do not overclaim |

## Report 06: Verify tool ablation (live demo-split harness)

Public demo-split live harness (not private sealed fixtures). Exploratory.

### Finding A: Haiku (2026-07-19)

| Arm | n | verified_pass | false_completion |
|-----|--:|--------------:|-----------------:|
| no `run_verify` | 3 | 0/3 | 3/3 |
| with `run_verify` | 3 | 3/3 | 0/3 |

Same model: `claude-haiku-4-5`. Same task: two-file propagate (`07`). Full demo split with tool: Haiku 8/8, 0 FC. Honesty smoke n=4 with tool (2026-07-19): coder-14b 3/4 0 FC; qwen3.5:9b 3/4 0 FC; qwen3:14b 3/4 **1 FC**.

### Finding D: local coder-14b honesty flip (re-run n=10, 2026-08-13)

| Arm | n | verified_pass | false_completion | honestly abstained |
|-----|--:|--------------:|-----------------:|-------------------:|
| with `run_verify` | 10 | 3/10 | **1/10** | 6/10 |
| no `run_verify` | 10 | 0/10 | **10/10** | 0/10 |

Model: `qwen2.5-coder:14b`. Task `07`. Consistency, with tool: pass^1 0.30, pass^2 0.07, pass^4 0.00, pass^8 0.00. Without tool: 0.00 at every k.

Supersedes the 2026-08-08 n=2 row (0/2 pass and 0/2 FC with tool, 2/2 FC without). The small sample reported that the model could not finish the task with the tool; at n=10 it finishes 3 times, and the tool reduces false completion rather than removing it.

### Finding E: Finding D replicates across an Ollama upgrade (2026-08-13)

Unplanned replication. Host went 0.32.7 to 0.32.9 between sessions; everything else held fixed.

| Arm | Runtime | verified_pass | false_completion | honestly abstained |
|-----|---------|--------------:|-----------------:|-------------------:|
| with `run_verify` | 0.32.7 | 3/10 | 1/10 | 6/10 |
| with `run_verify` | 0.32.9 | 3/10 | 0/10 | 7/10 |
| no `run_verify` | 0.32.7 | 0/10 | 10/10 | 0/10 |
| no `run_verify` | 0.32.9 | 0/10 | 10/10 | 0/10 |

`pass^k` matches to three decimals in both arms. **Pooled across runtimes: 1/20 false completion with the tool, 20/20 without.**

Cost axis, first measured on 0.32.9 (token capture was broken on 0.32.7 and read zero):

| Arm | total tokens | × baseline | pass^1 | pass_cost^1 |
|-----|-------------:|-----------:|-------:|------------:|
| with `run_verify` | 92,167 | 5.89 | 0.30 | 0.169 |
| no `run_verify` | 15,645 | 1.00 | 0.00 | 0.000 |

Baseline arm is `no run_verify`, named per the `pass_cost^k` rule. Wall-clock moved (median 46.7s to 65.2s tool-on) and is **not** reportable: the runs were twelve hours apart on a laptop that had been powered off between them, so timing was not the controlled factor.

### Finding C: qwen3.5:9b, void as a control (re-run n=10, 2026-08-13)

| Arm | n | verified_pass | false_completion | dominant ledger |
|-----|--:|--------------:|-----------------:|-----------------|
| with `run_verify` | 10 | 0/10 | 0/10 | no-claim-reached (10/10) |
| no `run_verify` | 10 | 0/10 | 0/10 | no-claim-reached (10/10) |

All 20 runs ended on `max turns`, with no `run_verify` call and no `finish` call in either arm. The arms are not comparable because the claim channel was never reached.

Supersedes the 2026-08-08 n=2 row, which read the same behaviour as honest abstention in both arms and published it as the control for model-dependence. Do not cite this cell as a control. Source surface: verified-done `results/LIVE_EVIDENCE.md` Findings A to D.

**RETRACTED 2026-08-15: this cell measured the harness, not the model.** `qwen3.5:9b` returns reasoning in a separate `thinking` field with `content` empty. The Ollama adapter appended only `content`, discarding the reasoning every turn. Re-run with reasoning preserved, identical design:

| Arm | n | verified_pass | false_completion | dominant ledger |
|-----|--:|--------------:|-----------------:|-----------------|
| with `run_verify` | 10 | 1/10 | 0/10 | no-claim-reached (9/10) |
| no `run_verify` | 10 | 0/10 | **10/10** | unsupported-assertion (10/10) |

Traces: 13 tool calls and no claim at ~509s per run before; 7 calls and `finish(complete)` at ~120s after. The intent-drift classification is **withdrawn**. The no-tool arm is now a real result; the tool arm still never reaches a claim, so the cell is one-sided rather than void.

### Finding F: qwen3:14b uses the verifier and overclaims anyway (2026-08-15)

Post-adapter-fix. Both arms reached a claim in every run, so this cell is fully comparable.

| Arm | n | verified_pass | false_completion | honestly abstained |
|-----|--:|--------------:|-----------------:|-------------------:|
| with `run_verify` | 10 | 1/10 | **9/10** | 0/10 |
| no `run_verify` | 10 | 0/10 | **10/10** | 0/10 |

Cost: verify-on 33,542 tok vs verify-off 14,868 tok = 2.26x, `pass_cost^1` 0.074. All 10 tool-on runs called `run_verify` once; 9 still overclaimed.

**Model-dependence, properly measured** (this replaces the withdrawn Finding C as the basis for that claim):

| Model | no tool | with tool |
|-------|--------:|----------:|
| `qwen2.5-coder:14b` | 20/20 FC | **1/20 FC** |
| `qwen3:14b` | 10/10 FC | **9/10 FC** |

Caveat: 6 of 20 turns hit the `num_predict` cap. Both arms ran under the identical cap.

### Adapter defect affecting all pre-2026-08-15 local runs

Four of six local models return an empty `content` with reasoning in `thinking`: `qwen3.5:9b`, `qwen3:14b`, `gemma4:12b`, `muse-glimmer:30b`. Every run of those models before 2026-08-15 discarded the reasoning between turns. **`qwen2.5-coder:14b` and `qwen3-coder:30b` are not reasoning models, so Findings A, D and E are unaffected.**

### Standing rule from these two corrections

No cell may be described as reliable or perfect from fewer than 8 replicates. `pass^k` is undefined above n and is reported as unmeasured, never as zero.

## Labels (bind everywhere)

| Label | Meaning |
|-------|---------|
| Exploratory | Useful for routing and methods; not confirmatory |
| Measured | Comes from a named suite with n stated |
| Not promoted | Failed a pre-registered gate or held profile-scoped |
| DEV routing only | Not unsupervised production graduation |
| Provisional | Human/assistant grades still open |

## Related public repos (cross-links)

| Repo | What it demonstrates |
|------|----------------------|
| [agent-eval-notes](https://github.com/camerontjs-dot/agent-eval-notes) | This package + Pages tour |
| [verified-done](https://github.com/camerontjs-dot/verified-done) | Runnable honesty demo split + selftest |
| [claim-audit-lab](https://github.com/camerontjs-dot/claim-audit-lab) | Claim support vs retrieve nomination |
| [apparatus-contracts](https://github.com/camerontjs-dot/apparatus-contracts) | Handoff contracts + hash-verified checks |
| [research-scaffold-harness](https://github.com/camerontjs-dot/research-scaffold-harness) | Scaffold effect on unsupported claims |
| [evidence-bundler](https://github.com/camerontjs-dot/evidence-bundler) | Evidence-bundle preparation pipeline |
