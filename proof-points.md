---
title: "Proof points — agent evaluation (resume / interview)"
privacy: "public-safe"
updated: "2026-08-08"
source: "public reports 01–06"
---

# Proof points (resume and interview)

Public-safe, numbers-locked talking points from the reports. Not a full resume file.

Every number is locked to the public reports; do not invent extras. Prefer **one** proof cluster per application, then rewrite into the job's language.

## Flagship (AI eval / agent reliability / safety-minded systems)

- Built a sealed coding-agent evaluation lab with disposable worktrees and external deterministic verification; treated scope violations and false completion claims as first-class failures, not soft notes.
- Measured a packet harness that improved verified passes from 28/36 to 34/36 and eliminated scope violations (6→0), then **rejected global promotion** after a pre-registered gate caught 2 false completion claims on multi-file work.
- Documented the failure mode: a local 14B model passed 10/12 other cells clean, then twice reported multi-file work complete when the external verifier failed both runs.
- On a public demo-split live harness, showed that removing a `run_verify` tool flipped the same model from 3/3 clean to 0/3 pass with 3/3 false completions on a two-file task (exploratory, n=3 per arm).
- Reproduced the same honesty flip on a local open-weight coder (`qwen2.5-coder:14b`, n=2 per arm): with verify, honest abstention; without verify, 2/2 false completions on the hard two-file task. A second local model (`qwen3.5:9b`) abstained in both arms (control: tool effect is model-dependent).

## Local coding agents / ML systems / tooling

- Ran multi-path hard screens (8 runs per path: mechanical, regression, two-file, scope × 2 seeds) across local open-weight stacks (Ollama + Aider; fair MLX via Aider + server).
- Found multi-file coordination was the discriminating case: only `qwen2.5-coder:14b` and `qwen3.5:9b` achieved 8/8; several mid models scored 0.75 with two-file 0/2.
- Separated quality from efficiency (wall + RSS); selected the 9B path when RAM was tight (~32s / ~9–11 GB vs ~52s / ~15 GB for the 14B coder at the same 8/8).
- Showed one-shot harness repair fixed a near-miss 30B coder on two-file (1/2→2/2) but did not rescue Gemma / qwen3:14b (0/2 after retry).

## Evaluation design / synthetic data / constrained generation

- Designed a constrained-prose (fixture-safety) suite with deterministic hard-fail rules before human keep grades; only 10/36 outputs were auto-clean; matrix keep rate ~0.25.
- Demonstrated task-family non-transfer: the multi-file coding winner produced 0/9 auto-clean constrained filler outputs; prose default routed to `qwen3.5:9b` instead.

## RAG / retrieval / knowledge systems

- Built a multi-axis RAG eval (retrieve vs grounded generate) on a sealed DEV corpus; refused a single blended Elo.
- Measured embedder routes on 60 retrieve jobs: BM25 and BGE-M3 at 1.00 pass; nomic and MiniLM at 0.92 with a shared status-sensitive miss; documented use-case routes instead of one default embedder.
- On 48 fixed-context generation jobs, four models tied at 1.00 pass; ranked by efficiency and priors, defaulting to the lightest perfect model (~5s/case).

## Skill / instruction eval (agent-as-evaluator)

- Designed an agent-as-evaluator protocol: deterministic Python workbench for lint, trigger stubs, receipts, and gates; active agent session for behavioral cases with no extra API bill.
- Forced every skill under test through a five-case edge matrix (silent-negative, happy-path, minimal-input, edge/conflict, overachiever/constraints) to block prompt overfitting to a single happy path.
- Instrumented case packs for prompt-creation and skill-creation skills; treat as protocol + early instrumentation, not a coding-lab-scale multi-model campaign.

## Cover-letter / narrative seeds (short)

**Reliability-focused:**  
I measure agents the way regulated quality work measures processes: pre-registered acceptance criteria, external evidence, and quiet failure modes treated as real failures. When a harness scored better on every aggregate metric but introduced false completion claims, I did not promote it.

**Builder-focused:**  
I run local coding and retrieval stacks under sealed suites with external verifiers, then change defaults only when multi-file, constraint, or status-sensitive cases support the change.

## What not to put on a resume

- "Validated production agents" or "graduated all models to unsupervised use"
- Blended "overall model quality" scores across coding + prose + RAG
- Frontier-model claims from these local suites
- Exact private paths, fixture contents, or raw logs
- Keep rates or human grades stated as final gold without the provisional label

## Pairing guide

| Role flavor | Lead with | Attach if asked |
|-------------|-----------|-----------------|
| AI safety / eval | H1 rejection + essay | `reports/01-…`, essay, or `pdf/01-…` |
| Agent reliability / tools | Verify ablation | `reports/06-…` + verified-done demo |
| Coding agents / local LLM | Multi-path screen | `reports/02-…` or `pdf/02-…` |
| Synthetic data / eval design | Fixture-safety transfer | `reports/03-…` or `pdf/03-…` |
| RAG / search | Use-case routes | `reports/04-…` |
| Prompt / skill reliability | Agent-as-evaluator | `reports/05-…` |
