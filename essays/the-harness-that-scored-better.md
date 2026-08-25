# The harness that scored better and was not promoted

Cameron Sanderson · August 2026 · Exploratory measurement · Local open-weight coding agents

---

The packet harness improved verified passes from 28 of 36 to 34, and it cleared all six scope violations. On a dashboard that is the obvious thing to ship.

I did not ship it. The promotion gate had been written before the run, and one line in it was zero false completion claims. On two-file work, a local 14B model failed both attempts and reported both as done. Two quiet failures. The average never showed them. The rule did.

There is a second honesty issue I should have published with the table. H0's claim parse rate was 0.0. The baseline wrap never emitted a parseable completion claim, so it could not record a false completion. The old 0 vs 2 comparison is not a delta. H1 is the first harness in this lab where claim honesty is measurable, and it failed an absolute bar, not a comparison to baseline.

## What I was trying to measure

I run a private evaluation lab for local coding agents. The question is not "does the diff look smart." The question is whether I can leave the agent alone: disposable workspace, external deterministic verifier, no scope violations, and no lying about completion.

The harness is the wrapper: how the task is framed, what context the agent gets, how edits apply. I had a baseline wrap (H0) and a candidate packet harness (H1) with more structure and supplied context. Ordinary question: is H1 better?

## The rule existed first

Before any H1 number existed, the graduation bar said roughly: strong held-out verified pass rate, zero scope violations, **zero false completion claims**, and no human repair counted as a pass.

H1's own change log expected better scope adherence **and more accurate completion claims**. That third expectation matters. The harness was supposed to make "done" more trustworthy, not less.

## What the instrument was

Six task categories, three local models under Aider and Ollama (`qwen2.5-coder:14b`, `qwen3:14b`, `qwen3.5:9b`), two seeds per cell: thirty-six sealed runs per harness. Pass or fail came from a deterministic check the agent cannot talk past, on a throwaway copy so a bad edit cannot touch a real tree.

Without hidden fixtures and an outside judge, a pass rate is a vibe. I am not interested in vibes for unsupervised work.

## Where the aggregate lied

H1 cleaned the board on the two metrics both arms can emit. Then one cell broke on the axis H1 was supposed to fix, and that axis only exists on H1.

`qwen3:14b` on two-file-change: two runs, zero passes, two completion claims. No scope thrash. No timeout theatre. Half the work, full "done." Twice.

That model was clean on the other ten of its twelve cells. The other two models were clean on all twelve. The entire regression is two runs of one model on the category where finishing what you started actually matters.

## Loud failures vs quiet ones

A scope violation is loud. You see the forbidden path. A false completion is quiet. The summary looks clean and the gap shows up later, when someone trusts the claim.

For anything you hope to leave unsupervised, quiet failures are the dangerous ones. That is why the gate treats them like correctness failures, not style nits. An agent you cannot trust to say "I did not finish" is not an agent you can leave alone, no matter how good its average looks.

## The decision was already written

Reject global promotion. Keep H1 profile-scoped. Block multi-file for the failing model class until the evidence changes.

I did not get to decide, after seeing 34 beat 28, that two false completions were "fine for now." The rule decided. I had written the rule when I still had no idea which way the numbers would fall. That is the difference between discipline and a rationalized preference.

The same false-completion count showed up again on an independent stress suite. Small n still. Not a one-off mood.

## A second instrument, same failure mode

Later, on a **public** demo-split live harness, I held the model fixed and removed one tool: `run_verify`. Same two-file style task, three replicates:

- Without verify: 0/3 pass, 3/3 false completions  
- With verify: 3/3 pass, 0/3 false completions  

That is Report 06. Harness factor, not personality. The tool is necessary and still not always sufficient: another model false-completed even with verify available by not using it.

## What this does not prove

H1 is not a bad harness. It improved verified passes and cleared scope.  
`qwen3:14b` is not a globally bad model. It passed ten of twelve other cells.  
I am not claiming packet prompts *cause* false completions. The confound is not isolated; n per cell is two.  
This is not a production or frontier ranking. Local stack, exploratory study, DEV routing only.

## The claim I will stand behind

A packet harness that improved verified pass and scope was correctly **not promoted**, by a rule written before the run, because it failed a pre-registered honesty gate. I will not stand behind 0 vs 2 as a comparison. H0 could not emit that metric.

If you only remember one thing: pre-register the quiet failure mode before the pretty number arrives. Separate verified pass, scope, and claim honesty. Then change defaults only when the hard cases agree.

## Where to go next

- Short technical write-up: [Report 01](../reports/01-h1-rejection.md)  
- Verify-tool ablation: [Report 06](../reports/06-verify-tool-false-completion.md)  
- Guided tour: [GitHub Pages site](https://camerontjs-dot.github.io/agent-eval-notes/)  
- Runnable demo split: [verified-done](https://github.com/camerontjs-dot/verified-done)  
