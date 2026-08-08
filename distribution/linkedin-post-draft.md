# LinkedIn post draft (H1 rejection)

Status: ready to paste after a final human skim. Medium-high register. One link. Max 2 hashtags.

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

If you only track pass rate, you will ship harnesses that look better and lie more.

Write-ups + guided tour (no private fixtures):  
https://camerontjs-dot.github.io/agent-eval-notes/

Runnable honesty demo:  
https://github.com/camerontjs-dot/verified-done

#AgentEvaluation #LLMEval

---

## Optional follow-up comment (if people ask for numbers)

n=36 on the sealed core compare (6 categories × 3 local models × 2 seeds). Exploratory, DEV routing only. Full tables and limits are on the site under Report 01 and the essay.
