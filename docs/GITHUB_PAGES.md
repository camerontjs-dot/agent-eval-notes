# GitHub Pages setup

This folder (`docs/`) is a static site. No build step is required at publish time. HTML is pre-generated.

## Local preview

From the package root (`agent-eval-public/`):

```bash
python3 -m http.server 8080 --directory docs
```

Open http://127.0.0.1:8080/

## Regenerate HTML after content edits

```bash
python3 docs/_build_pages.py
```

Source of truth for page prose is `docs/_build_pages.py`. Markdown under `reports/` remains the attachable text form; keep numbers aligned when either side changes.

## Publish

Public repo: **https://github.com/camerontjs-dot/agent-eval-notes**

Pages settings (already the intended config):

- Source: **Deploy from a branch**
- Branch: `main`
- Folder: **`/docs`**

Site URL: **https://camerontjs-dot.github.io/agent-eval-notes/**

Do not push lab fixtures or private receipts into the remote. Re-run a leak-check before any content update that might reintroduce paths.

## What the site includes

- Guided 9-step tour (sidebar + Next/Previous + keyboard)
- Methodology, reports 01-05, limitations, resume bullets
- H1 one-pager PDF download

## What it deliberately excludes

- Sealed fixtures, gold answers, raw agent logs
- Private workbench paths and machine names
- Runnable private lab code
