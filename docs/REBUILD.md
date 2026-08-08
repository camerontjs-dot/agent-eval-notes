# Rebuild note

HTML pages under `docs/` are generated from Markdown sources in the package root.

Prefer editing Markdown under `reports/`, `essays/`, `METHODOLOGY.md`, etc., then regenerating site HTML with the package operator workflow (agent session or local script).

After changes:
1. Update `numbers-lock.md` if any headline figure moves.
2. Copy new PDFs into `docs/pdf/`.
3. Leak-check, export, push to `camerontjs-dot/agent-eval-notes`.
