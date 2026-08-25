# Agent evaluation write-ups

Public-safe measurement notes from a private sealed evaluation lab for local coding agents, constrained generation, RAG routes, skill/instruction docs, and live completion-honesty probes.

**Author:** [Cameron Sanderson](https://github.com/camerontjs-dot)

This package is **reports, essay, and method language only**. It does not include private sealed fixtures, raw agent transcripts, or full lab code.

## Live surfaces

| Surface | URL |
|---------|-----|
| **Guided tour (GitHub Pages)** | https://camerontjs-dot.github.io/agent-eval-notes/ |
| **This repo** | https://github.com/camerontjs-dot/agent-eval-notes |
| **Runnable honesty demo** | https://github.com/camerontjs-dot/verified-done |

Tour order: Start → Methodology → Labels → H1 rejection → Essay → Verify ablation → Multi-path → Transfer → RAG → Skills → **Try the method** → Limitations → Resume bullets.

Local preview:

```bash
python3 -m http.server 8080 --directory docs
```


## Public surface map

| Surface | Role |
|---------|------|
| **This repo + Pages tour** | Methods, locked numbers, harness disclosure, essay |
| [verified-done](https://github.com/camerontjs-dot/verified-done) | Runnable honesty demo (tasks + selftest + live evidence summary) |
| Related apparatus | [claim-audit-lab](https://github.com/camerontjs-dot/claim-audit-lab), [evidence-bundler](https://github.com/camerontjs-dot/evidence-bundler), [apparatus-contracts](https://github.com/camerontjs-dot/apparatus-contracts) |
| Workspace OS | [MainFrame](https://github.com/camerontjs-dot/MainFrame) (public Stage 1b cut; MindGraph nested) |

Operator publish logs and internal program notes stay in the private workspace. They are not part of this repo.

## What you will find

| Path | Contents |
|------|----------|
| [`docs/`](docs/) | GitHub Pages guided tour |
| [`reports/`](reports/) | Six self-contained Markdown write-ups (01–06) |
| [`essays/`](essays/) | Longform H1 rejection essay |
| [`briefs/`](briefs/) | One-pagers, [harness isolation protocol](briefs/harness-isolation-protocol-card.md), [public harness descriptions](briefs/public-harness-descriptions.md) |
| [`pdf/`](pdf/) | Print-ready PDFs (H1, multi-path, transfer) |
| [`numbers-lock.md`](numbers-lock.md) | Locked headline numbers + cross-repo links |
| [`METHODOLOGY.md`](METHODOLOGY.md) | How measurement is defined |
| [`LIMITATIONS.md`](LIMITATIONS.md) | What these notes do not claim |
| [`proof-points.md`](proof-points.md) | Resume / interview talking points (numbers-locked) |

## Reports (pick one story)

| Report | One-line story | Best for |
|--------|----------------|----------|
| [01 - H1 rejection](reports/01-h1-rejection.md) | Better aggregate still not promoted | AI safety / eval |
| [02 - Multi-path coding](reports/02-multi-path-coding-screen.md) | Multi-file is the discriminating case | Local coding agents |
| [03 - Task-family transfer](reports/03-fixture-safety-task-transfer.md) | Coding winner fails constrained prose | Eval design |
| [04 - RAG routes](reports/04-rag-stack-routes.md) | Use-case routes, not one Elo | RAG / retrieval |
| [05 - Agent-as-evaluator](reports/05-skill-eval-agent-as-evaluator.md) | Skill edge matrix + thin smoke receipts | Prompt / skills |
| [06 - Verify tool ablation](reports/06-verify-tool-false-completion.md) | run_verify flips honesty on Haiku and coder-14b; model-dependence is Finding F, not an abstainer control | Agent reliability |

**Essay:** [The harness that scored better and was not promoted](essays/the-harness-that-scored-better.md)

## Honesty rules (binding)

1. Say **measured** / **exploratory**, not validated or proven, unless a confirmatory protocol is named.
2. State **n** with every headline metric.
3. Say **not promoted**, not thrown out, for the H1 decision.
4. Name the stack (local open-weight vs live frontier) when it matters.
5. **DEV routing only** unless a report documents a graduated path.
6. Do not blend coding, prose, RAG, and skill scores into one model quality number.

## Related public work

- [verified-done](https://github.com/camerontjs-dot/verified-done) — runnable honesty demo split
- [claim-audit-lab](https://github.com/camerontjs-dot/claim-audit-lab)
- [apparatus-contracts](https://github.com/camerontjs-dot/apparatus-contracts)
- [research-scaffold-harness](https://github.com/camerontjs-dot/research-scaffold-harness)
- [evidence-bundler](https://github.com/camerontjs-dot/evidence-bundler)

## License

[MIT](LICENSE)
