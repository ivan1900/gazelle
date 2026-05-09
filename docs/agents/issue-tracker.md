# Issue Tracker: GitHub Issues

Issues for this repository are tracked in **GitHub Issues** under the [ivan1900/gazelle](https://github.com/ivan1900/gazelle) repository.

## How agents interact with issues

Agent skills like `triage`, `to-issues`, `to-prd`, and `qa` use the `gh` CLI to:

- **Read** issues and their metadata (title, description, labels, state)
- **Create** new issues with auto-generated titles, descriptions, and labels
- **Update** issue state (open/closed) and apply triage labels
- **Query** issues by label (e.g., all `ready-for-agent` issues)

## Workflow

1. **Creation** — Skills create issues in GitHub with a title, description, and initial labels (typically `needs-triage`).
2. **Triage** — The `triage` skill reads the issue and applies one of five canonical labels (see `triage-labels.md`), which signals the issue's readiness and who should handle it.
3. **Implementation** — The `to-issues` skill breaks a plan into multiple GitHub issues, each labeled `ready-for-agent` or `ready-for-human`.
4. **Automation** — An AFK agent can pick up `ready-for-agent` issues autonomously without human context.

## Required CLI tool

Ensure `gh` (GitHub CLI) is installed and authenticated:

```bash
gh auth status
```

If not authenticated, run:

```bash
gh auth login
```

## Links

- Repository: https://github.com/ivan1900/gazelle
- Issues: https://github.com/ivan1900/gazelle/issues
