# LinkedIn post draft (H1 rejection)

Status: **selected for post** — see [`linkedin-post-log.md`](linkedin-post-log.md) for final paste body, checklist, and Posted row. Medium-high register. Max 2 hashtags.

---

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

Same failure mode showed up again when I ablated a `run_verify` tool on a public demo split: without it, 0/3 pass and 3/3 false completions; with it, 3/3 clean on the same model and task.

I also ran the same ablation on a local 14B coder. With the tool: honest abstention on the hard two-file task. Without it: false completion both times. A different local model abstained either way. So the tool is a harness factor, and the effect is model-dependent.

If you only track pass rate, you will ship harnesses that look better and lie more.

Write-ups + guided tour (no private fixtures):  
https://camerontjs-dot.github.io/agent-eval-notes/

Runnable honesty demo:  
https://github.com/camerontjs-dot/verified-done

#AgentEvaluation #LLMEval

---

## Alternate short post (lead with local Finding D)

I held the model fixed and removed one tool.

Local `qwen2.5-coder:14b`, same two-file task:

- with `run_verify`: 0/2 false completions (honest abstain)  
- without it: 2/2 false completions  

Capability did not magically jump. The claim channel did. A second local model already abstained in both arms, so this is not "one switch fixes every model."

Method write-ups + demo:  
https://camerontjs-dot.github.io/agent-eval-notes/  
https://github.com/camerontjs-dot/verified-done

#AgentEvaluation #LLMEval

---

## Optional follow-up comment (if people ask for numbers)

n=36 on the sealed core compare (6 categories × 3 local models × 2 seeds). Live verify ablation: Haiku n=3 per arm; local coder-14b and qwen3.5:9b n=2 per arm. Exploratory, DEV routing only. Full tables and limits are on the site under Report 01, Report 06, and the essay.
