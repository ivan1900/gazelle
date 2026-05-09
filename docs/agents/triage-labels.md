# Triage Label Vocabulary

This file defines the five canonical triage roles and their label mappings in GitHub Issues.

## The five roles

| Role                  | Label             | Meaning                                                   |
| --------------------- | ----------------- | --------------------------------------------------------- |
| **Needs evaluation**  | `needs-triage`    | Maintainer needs to review and classify this issue        |
| **Awaiting reporter** | `needs-info`      | Issue is waiting for the reporter to provide more details |
| **Ready for agent**   | `ready-for-agent` | Fully specified; an AI agent can pick it up autonomously  |
| **Ready for human**   | `ready-for-human` | Requires human implementation or domain expertise         |
| **Won't fix**         | `wontfix`         | Will not be actioned (closed, out of scope, etc.)         |

## How to use

When creating or triaging issues, apply exactly one of these labels to signal the issue's state to agents and team members.

### `needs-triage`

Applied to new issues. The maintainer should:

- Read the description and reproduction steps (if applicable)
- Classify whether it's a bug, feature, or question
- Move to `needs-info` if more details are needed, or to `ready-for-agent` / `ready-for-human` if clear

### `needs-info`

Applied when the issue is unclear or missing critical details. The reporter should:

- Add the missing context (e.g., steps to reproduce, environment, expected vs actual behavior)
- Once complete, the maintainer re-evaluates and relabels

### `ready-for-agent`

Applied when an issue is:

- Well-specified with clear acceptance criteria
- Has all necessary context (no ambiguity)
- Can be implemented autonomously by an AI agent

Agents will pick these up automatically if assigned to an AFK workflow.

### `ready-for-human`

Applied when an issue requires:

- Domain expertise or business judgment beyond an agent's scope
- Human design decisions
- Architectural choices that need review

### `wontfix`

Applied when an issue:

- Is out of scope for this repository
- Duplicates another issue
- Is no longer relevant
- Represents a user error rather than a bug

## No custom remapping

This repo uses the default label strings. If you add custom labels to GitHub Issues, update this file to reflect the mapping.
