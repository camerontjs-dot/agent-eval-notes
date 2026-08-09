# Numbers lock (public package)

Every public headline number in this package should match a row here. Re-lock before changing report prose or the Pages tour.

**Study type:** exploratory unless a row says otherwise.  
**Stack default:** local open-weight models under Aider + Ollama unless a row names another stack.  
**Private fixtures:** not published. Suite names are labels only.

## Report 01 — H1 rejection (core suite)

| Metric | H0 | H1 | n / design |
|--------|---:|---:|------------|
| Verified passes | 28/36 | 34/36 | 6 categories × 3 models × 2 seeds |
| Scope violations | 6 | 0 | same |
| False completion claims | 0 | 2 | both on `qwen3:14b` / two-file-change |
| Decision | | **not promoted globally** | pre-registered zero-FC gate |

Models: `qwen2.5-coder:14b`, `qwen3:14b`, `qwen3.5:9b`. Dates: 2026-06-14 (core compare). Stress suite also recorded 2 FC under H1 (2026-06-15).

## Report 02 — Multi-path coding hard screen

| Path | Pass | Two-file | Wall | RSS (approx.) |
|------|-----:|---------:|-----:|---------------|
| qwen2.5-coder:14b | 1.00 (8/8) | 2/2 | ~52s | ~15 GB |
| qwen3.5:9b | 1.00 (8/8) | 2/2 | ~32s | ~9–11 GB |
| qwen3-coder:30b | 0.875 | 1/2 | ~20s | ~18 GB |
| qwen3:14b | 0.75 | 0/2 | ~39s | ~15–16 GB |
| Gemma 3 12B fair Ollama / MLX | 0.75 | 0/2 | ~50 / ~35s | MLX ~7.1 GB |

n per path: 8 (4 case types × 2 seeds). H2 one-repair: Gemma/qwen3:14b stay 0/2; coder-30b 1/2 → 2/2. Date: 2026-07-18.

## Report 03 — Fixture-safety transfer

| Metric | Value |
|--------|------:|
| Matrix jobs | 36 (3 cases × 4 models × 3 seeds) |
| Auto-clean | 10 |
| Keep (provisional grades) | 9 |
| Keep rate | ~0.25 |
| qwen2.5-coder:14b auto-clean | 0/9 |
| qwen3.5:9b keep | 3/3 of its auto-clean |

Date: 2026-07-17 (v0.1-robust). Keep grades provisional.

## Report 04 — RAG routes

| Axis | n | Headline |
|------|--:|----------|
| Retrieve embedders | 60 jobs | BM25 and BGE-M3 1.00; nomic/MiniLM 0.92 (status-sensitive miss) |
| Fixed-context gen | 48 jobs | four models 1.00; default lightest perfect (~5s) |

**Ceiling note:** R4 pass rates are at 1.00. Do not rank models by pass rate until harder adversarial/refuse cases land. Date: 2026-07-21. DEV synthetic corpus only.

## Report 05 — Skill-eval (thin instrumentation)

| Item | Status |
|------|--------|
| Protocol | Designed: static workbench + agent session; five-case matrix |
| Case packs | prompt-creation, skill-creation (+ process-control family) |
| Behavioral receipts published here | **Smoke only:** `prompt-creation` / happy-path, two manual-test receipts (pass then fail on structure asserts) |
| Multi-model sealed campaign | **Not done** — do not overclaim |

## Report 06 — Verify tool ablation (live demo-split harness)

Public demo-split live harness (not private sealed fixtures). Exploratory.

### Finding A — Haiku (2026-07-19)

| Arm | n | verified_pass | false_completion |
|-----|--:|--------------:|-----------------:|
| no `run_verify` | 3 | 0/3 | 3/3 |
| with `run_verify` | 3 | 3/3 | 0/3 |

Same model: `claude-haiku-4-5`. Same task: two-file propagate (`07`). Full demo split with tool: Haiku 8/8, 0 FC. Honesty smoke n=4 with tool (2026-07-19): coder-14b 3/4 0 FC; qwen3.5:9b 3/4 0 FC; qwen3:14b 3/4 **1 FC**.

### Finding D — local coder-14b honesty flip (2026-08-08)

| Arm | n | verified_pass | false_completion | note |
|-----|--:|--------------:|-----------------:|------|
| with `run_verify` | 2 | 0/2 | **0/2** | honestly abstained |
| no `run_verify` | 2 | 0/2 | **2/2** | false completion |

Model: `qwen2.5-coder:14b`. Task `07`. Smoke same day verify-on n=4: **3/4** pass, **0** FC.

### Finding C — local qwen3.5:9b control (2026-08-08)

| Arm | n | verified_pass | false_completion | note |
|-----|--:|--------------:|-----------------:|------|
| with `run_verify` | 2 | 0/2 | 0/2 | honestly abstained |
| no `run_verify` | 2 | 0/2 | 0/2 | honestly abstained |

Smoke same day verify-on n=4: **2/4** pass, **0** FC. Source surface: verified-done `results/LIVE_EVIDENCE.md` Findings A–D.

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
