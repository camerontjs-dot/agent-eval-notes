# PDF render notes

Source: [`../briefs/01-h1-rejection-onepager.md`](../briefs/01-h1-rejection-onepager.md)

Regenerate from repo root:

```bash
node .agents/skills/print-ready-pdf-generation/scripts/render-markdown-pdf.mjs \
  30_projects/agent-eval-public/briefs/01-h1-rejection-onepager.md \
  30_projects/agent-eval-public/pdf/01-h1-rejection-onepager.pdf \
  --config 30_projects/agent-eval-public/pdf/pdf-config.js
```

Inspect:

```bash
pdfinfo 30_projects/agent-eval-public/pdf/01-h1-rejection-onepager.pdf
pdftoppm -png -r 150 30_projects/agent-eval-public/pdf/01-h1-rejection-onepager.pdf /tmp/h1-onepager
```
