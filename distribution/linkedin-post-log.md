---
title: "LinkedIn post log — agent eval"
privacy: "public-safe / operator"
updated: "2026-08-08"
---

# LinkedIn post log — agent evaluation

Operator log for distribution of agent-eval-notes / verified-done.  
Drafts live in [`linkedin-post-draft.md`](linkedin-post-draft.md). This file is the run note (what was selected, status, follow-ups).

## 2026-08-08 — primary post (selected)

| Field | Value |
|-------|-------|
| **Status** | **Ready to post** (human paste into LinkedIn; not auto-posted from this vault) |
| **Variant** | Flagship H1 rejection + verify-tool sequel (Finding A + D) |
| **Surface** | LinkedIn personal feed |
| **Primary link** | https://camerontjs-dot.github.io/agent-eval-notes/ |
| **Secondary link** | https://github.com/camerontjs-dot/verified-done |
| **Hashtags** | `#AgentEvaluation` `#LLMEval` (max 2) |
| **Study labels** | exploratory; n stated in comments if asked |

### Final paste body

```text
The packet harness beat my baseline on every aggregate I measured.

Verified passes: 28/36 → 34/36.
Scope violations: 6 → 0.

I still did not promote it.

The promotion gate was written before the run. One hard line: zero false completion claims.

On the two-file task, a local 14B model failed both attempts and reported both as done. Quiet failures. The average never showed them. The rule did.

I care about this because unsupervised agents are not dangerous when they thrash in the logs. They are dangerous when the summary looks clean and the gap shows up later.

What I measure now, as three separate axes:

1. Did an external verifier pass?
2. Did the agent stay in scope?
3. Did it claim "done" only when the verifier agrees?

Same failure mode showed up again when I ablated a run_verify tool on a public demo split: without it, 0/3 pass and 3/3 false completions; with it, 3/3 clean on the same model and task.

I also ran the same ablation on a local 14B coder. With the tool: honest abstention on the hard two-file task. Without it: false completion both times. A different local model abstained either way. So the tool is a harness factor, and the effect is model-dependent.

If you only track pass rate, you will ship harnesses that look better and lie more.

Write-ups + guided tour (no private fixtures):
https://camerontjs-dot.github.io/agent-eval-notes/

Runnable honesty demo:
https://github.com/camerontjs-dot/verified-done

#AgentEvaluation #LLMEval
```

### Optional first comment (if anyone asks for n)

```text
n=36 on the sealed core compare (6 categories × 3 local models × 2 seeds). Live verify ablation: Haiku n=3 per arm; local coder-14b and qwen3.5:9b n=2 per arm. Exploratory, DEV routing only. Full tables, harness descriptions, and limits are on the site under Methodology, Report 01, Report 06, and the essay.
```

### Alternate (not selected this run)

Short Finding D-only post remains in `linkedin-post-draft.md` for a later post if the flagship underperforms or you want a second hit.

### Operator checklist

- [x] Numbers locked to `numbers-lock.md`
- [x] Links live (Pages + verified-done)
- [x] Harness disclosure page added (`briefs/public-harness-descriptions.md`) so comments can point at method, not "trust me"
- [ ] Human pastes to LinkedIn and marks **Posted** below with date/time
- [ ] Optional: pin comment with n if early engagement is numbers-focused

### Posted

| When | URL / note |
|------|------------|
| _pending human paste_ | |

---

## Why this variant (judgment)

Flagship H1 is the hireable story (pre-registered reject). Finding D is the local proof that the harness factor is not a cloud-only trick. One post can carry both without drowning the reader; the short D post is for a follow-up week, not the first impression.
