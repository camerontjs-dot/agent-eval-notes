# Publish map (operator)

Local source of truth: this folder (`30_projects/agent-eval-public/`).

Public remote (clean history extract, not a monorepo push):

| Item | Value |
|------|--------|
| Repo | https://github.com/camerontjs-dot/agent-eval-notes |
| Pages | https://camerontjs-dot.github.io/agent-eval-notes/ |
| Pages source | branch `main`, folder `/docs` |
| Visibility | public |
| First push | 2026-08-08 |

## Update workflow

1. Edit content here (or regenerate site: `python3 docs/_build_pages.py`).
2. Leak-check for absolute paths and private lab paths.
3. Rsync to a clean temp dir, commit, push to `camerontjs-dot/agent-eval-notes` main.

Do not force-push lab history. Do not add fixtures, receipts, or workbench cases.
