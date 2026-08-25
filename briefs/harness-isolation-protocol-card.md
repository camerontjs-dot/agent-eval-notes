---
title: "Harness isolation protocol card (public)"
privacy: "public-safe"
updated: "2026-08-08"
lane: "EV06"
study_type: "method"
---

# Harness isolation protocol card

**Audience:** reviewers of agent-eval-notes, collaborators designing the next suite.  
**Status:** method card (not a new experiment). Grounded in Report 01, Report 06, and field work on scaffold confounds (EV06 foundation).

## Why this card exists

Long-horizon agent scores mix **model** and **harness** (tools, prompts, memory, subagents, verify loops). If you change both, you cannot say which one moved the number. This card is the pre-run checklist I use before claiming a promotion, a model win, or a harness win.

## Unit under test

Name exactly one primary unit:

| Unit | When to choose it |
|------|-------------------|
| **Model** | Same tool contract, same prompts, same memory policy; only weights/runtime change |
| **Harness module** | Same model; only one harness factor changes (e.g. `run_verify` on/off) |
| **Full agent product** | You are ranking a shipped stack; then **do not** claim "model quality" |

## Fixed vs free (one phase)

Before the run, fill this table:

| Factor | Fixed value | Free? | Notes |
|--------|-------------|-------|-------|
| Model id + decode settings | | no (unless model sweep) | |
| Tool contract (list of tools) | | **one** free slot max | e.g. verify on/off |
| System / packet prompts | | | |
| Memory / retrieval policy | | | |
| Subagent topology | | | |
| Task family + case ids | | no mid-run adds | |
| Verifier / gold oracle | | no | external, deterministic |
| Seeds / replicates | | | state n |

**Rule:** one free experimental factor per phase. Everything else fixed and written down.

## Disclosure fields (publish with every score)

When a number is public, attach:

1. **Model** (id, size class if known, local vs hosted)
2. **Harness version** (short name + git commit or package tag if available)
3. **Tool contract** (which tools existed; call out verify)
4. **Task family + n**
5. **Primary metrics** (at least: verified pass rate **and** false-completion rate for coding agents)
6. **Study type** (exploratory / measured / confirmatory)
7. **Promotion decision** if any (promoted / not promoted / profile-scoped) and the gate that decided it

## Promotion gates (coding agents, default)

Write these **before** looking at aggregates:

| Gate | Default |
|------|---------|
| Verified pass | report rate; do not promote on this alone |
| Scope violations | prefer zero on the promotion suite |
| False completion claims | **zero tolerance** on the promotion suite unless a different bar is pre-registered |
| Hard-case veto | multi-file / two-file cells cannot all fail while mean looks fine |
| Efficiency | second axis only; never averaged into quality |

**Not promoted** language: use when a pre-registered gate fails. Do not say the model "failed" if the free factor was the harness.

## Standard isolation designs

| Design | Isolates | Public exhibit |
|--------|----------|----------------|
| Same model, tool-on vs tool-off | One harness module | Report 06 Findings A, D |
| Same harness, two models, both arms reach a claim | Whether tool effect is universal | Report 06 Finding F (Finding C withdrawn) |
| Same harness, multi-model smoke | Model honesty under fixed tools | Report 06 smoke tables |
| Packet harness A vs B, fixed models | Scaffold / packet structure | Report 01 H1 |
| Same model, multi-family transfer | Overfit to one family | Report 03 |

## Anti-patterns

- Ranking models from mixed-harness leaderboards without disclosure
- Blending coding + prose + RAG into one Elo
- Calling a mean win a graduation when multi-file cells still lie
- Changing model **and** tools in the same matrix cell
- Publishing pass rate without a claim channel

## What this card does not do

It does not replace sealed fixtures, statistical power analysis, or confirmatory protocols. It keeps attribution honest on exploratory work so public numbers stay hireable without overclaiming.

## Related

- `METHODOLOGY.md` (package contract)
- Reports 01 and 06
- verified-done `LIVE_EVIDENCE.md` Findings A–D
