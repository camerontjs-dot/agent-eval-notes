---
title: "Sanitization rules"
privacy: "public-safe"
updated: "2026-08-08"
---

# Sanitization rules

Rules applied before materials entered this package.

## Always stripped

- Absolute filesystem paths and hostnames
- API keys, tokens, cookies, private emails
- Full agent transcripts and tool dumps
- Sealed fixture contents and gold answers
- Private project layout that is not part of the public story
- Unreviewed assistant-only grades presented as human gold

## Always kept

- Sample size (n), suite identity at a high level, date, study type
- Model and runtime names used in the measurement
- Gate language that forced a reject or promote decision
- Explicit non-claims

## Number discipline

Numbers in reports under `reports/` and the H1 one-pager are locked. Do not round or rephrase them into a stronger claim. Do not blend coding + prose + RAG + skill scores.

## Before external paste

1. Search the export for absolute paths and secret-shaped strings.
2. Confirm no fixture gold text remains.
3. Confirm every headline number still has n and an honesty label.
