---
title: "Report: RAG-stack retrieve and grounded-gen routes"
privacy: "public-safe"
updated: "2026-08-08"
study_type: "exploratory"
---

# RAG-stack retrieve and grounded-gen routes

**Audience:** RAG / retrieval / knowledge-system roles.  
**Study type:** exploratory sealed corpus (DEV synthetic; not GxP validation).  
**Rule:** do not blend retrieve pass rates with generation pass rates, or with coding/prose scores.

## Headline

On a sealed retrieve suite, pure BM25 and BGE-M3 both hit perfect pass rates, while lighter dense embedders failed a **status-sensitive** case. On fixed-context grounded generation, four models all hit 1.00 pass, so ranking moved to **efficiency and prior task-family fit**, not a fake Elo.

## Axes (separate)

| Axis | Question | External check |
|------|----------|----------------|
| Retrieve | Does the right passage rank high for the use case? | hit@k / pass on sealed queries |
| Refuse | Does the system refuse when it should? | refuse cases (when run) |
| Grounded gen | Given fixed context, support or refuse correctly? | support/refuse verifier |

One factor per phase. No single "best RAG model" score.

## Retrieve embedder A/B (60 jobs)

Profiles: BM25, sentence-transformers MiniLM, Ollama nomic-embed-text, Ollama bge-m3, Ollama qwen3-embedding 0.6B.

| Profile | Pass rate | Hit@1 | Notes |
|---------|----------:|------:|-------|
| **bm25** | **1.00** | 1.00 | Efficiency default when tied |
| **ollama-bge-m3** | **1.00** | 1.00 | Best pure dense on this set; fixed status-sensitive fail |
| ollama-nomic | 0.92 | 0.90 | Fails one regulated_status style case |
| st-minilm | 0.92 | 0.90 | Same status failure pattern |
| ollama-qwen3-emb-0.6b | 0.92 | 0.90 | Stronger on status; weaker on paraphrase (0.67) |

**Situation route:** prefer BM25 when efficiency ties; prefer BM25 or BGE-M3 when document **status / currency** ranking matters; do not assume nomic or MiniLM alone is enough for status-sensitive work.

Hybrid RRF (BM25 fused with dense) recovered MiniLM/nomic status failures on this sealed set (all hybrid rows 1.00). Still prefer pure BM25 when quality is tied and cost matters.

## Fixed-context generation (48 jobs)

12 sealed cases × 4 models (support + refuse + regulated status style checks). Scorer-fixed run.

| Model | Pass rate | Prefer? |
|-------|----------:|---------|
| qwen3.5:9b | 1.00 | **Yes - default** (lightest among perfect) |
| qwen3:14b | 1.00 | Alternate if 9b unavailable |
| gemma3:12b | 1.00 | Cross-family OK after scorer fix |
| qwen2.5-coder:14b | 1.00 | Control also perfect; **not** transfer proof beyond this suite |

Mean wall per case (think off, approx.): qwen3.5:9b **~5.0s** · coder-14b ~7.7s · qwen3:14b ~8.0s · gemma3:12b ~11.2s.

All models also cleared sealed **refuse** cases on this set. Perfect scores mean the suite is at a **ceiling**: expand adversarial coverage before ranking models by pass rate alone.

## Decisions / routes

1. Retrieve defaults are **use-case scoped**, not one embedder for everything.
2. Grounded gen default on this sealed set: **qwen3.5:9b** by efficiency among perfect models.
3. Do not import coding or prose winners as RAG defaults without this suite.
4. Do not claim GxP or production validation from DEV synthetic corpus.

## What this does **not** prove

- Not a general RAG leaderboard.
- Not proof that hybrid is always better (it tied at 1.00 after rescue; efficiency still favors BM25 when equal).
- Not graduation of any model to unsupervised knowledge-base writes.
- Ceiling risk on generation: perfect pass rates limit discriminative power until harder cases land.

## Resume angle

You separated retrieve vs generate, measured status-sensitive failure modes, and refused a single Elo when the data only supported **situation routes**.
