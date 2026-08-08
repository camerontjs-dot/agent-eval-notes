# RAG adversarial next (planned, no new numbers yet)

Report 04 fixed-context generation is at a **ceiling** (four models at 1.00 pass on 48 jobs). Ranking by pass rate is not useful until harder cases land.

## Planned harder slice (design only)

Do not run a large matrix until cases exist and metrics are pre-registered.

Candidate case types:

1. **Status trap** — query implies current procedure; gold is superseded; must refuse or rank active doc first.  
2. **Partial support** — context supports only half the claim; must refuse full support.  
3. **Conflicting passages** — two docs disagree; answer must not blend as if consistent.  
4. **Empty / off-domain** — must refuse rather than invent.

## Gate before publishing new RAG numbers

- One factor per phase (case hardness or model, not both).  
- n stated; exploratory label.  
- Do not blend with coding or prose scores.  
- Still DEV synthetic unless a regulated corpus path is separately locked.

Until then, public copy should keep the ceiling warning from Report 04.
