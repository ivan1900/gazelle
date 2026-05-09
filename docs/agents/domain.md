# Domain Documentation

This file describes how agents should read domain knowledge and architectural decisions from this repository.

## Layout: Single-context

This repository uses a **single-context layout**:

```
repo-root/
├── CONTEXT.md              ← Global domain language and project mental model
├── docs/
│   └── adr/                ← Architectural Decision Records
│       ├── 0001-*.md
│       ├── 0002-*.md
│       └── ...
```

There is one `CONTEXT.md` at the repository root and one `docs/adr/` directory. All architectural decisions live here (no per-service or per-module contexts).

## CONTEXT.md — Domain Language

Skills like `improve-codebase-architecture`, `diagnose`, and `tdd` read `CONTEXT.md` to understand:

- **Core domain concepts** — What problems does this system solve? What are the key entities?
- **Mental model** — How do developers think about this codebase? What terms do they use?
- **Code organization** — How is the source code structured? Why?
- **Key patterns** — Are there recurring architectural patterns? (e.g., hexagonal architecture, layered, event-driven)
- **Constraints** — What are the hard requirements? (e.g., "must support 1M concurrent users", "offline-first")
- **Tech stack rationale** — Why Next.js? Why Prisma? Why these choices over alternatives?

### What to include in CONTEXT.md

```markdown
# Gazelle: Domain Model and Architecture

## What problem do we solve?

[1-2 sentences: What is Gazelle? What does it do for users?]

## Core Concepts

- **Activity**: [definition]
- **Account**: [definition]
- **Dashboard**: [definition]
- [more entities...]

## Architecture

[High-level overview: How does data flow? What are the major components?]

### Tech Stack

- **Frontend**: Next.js 16, React 19, MUI 9
- **Styling**: Emotion + MUI
- **Backend**: Next.js API routes + Prisma ORM
- **Database**: MariaDB (via Prisma adapter)
- **Auth**: NextAuth.js
- **State management**: React Context

### Code Organization
```

src/
├── app/ # Next.js app directory
│ ├── api/ # Server-side API routes
│ ├── components/ # React components
│ ├── dashboard/ # Dashboard pages
│ └── signin/ # Auth pages
├── Contexts/ # React Context providers
│ ├── Account/
│ ├── Activity/
│ ├── ActivityType/
│ └── shared/
└── generated/ # Prisma client + types

```

## Key Decisions

See `docs/adr/` for detailed architectural decisions.

## Constraints & Principles

- [List any hard requirements or guiding principles]
```

**To create your CONTEXT.md:** Start with the template above and fill in the blanks based on your codebase.

## docs/adr/ — Architectural Decision Records

Skills like `improve-codebase-architecture` read ADRs to understand **why** architectural decisions were made, not just what they are.

### ADR Format

Each file in `docs/adr/` should follow the [ADR template](https://github.com/joelparkerhenderson/architecture_decision_record):

```markdown
# ADR XXXX: [Short title]

**Status**: Accepted | Pending | Superseded | Deprecated

**Date**: YYYY-MM-DD

## Context

What problem or question triggered this decision?

## Decision

What decision did we make?

## Rationale

Why did we choose this over alternatives?

## Consequences

What are the upsides? The downsides? The tradeoffs?

## Alternatives Considered

- [Alternative 1 — why rejected]
- [Alternative 2 — why rejected]
```

### Example ADRs for this repo

You might create ADRs for:

- **Why Next.js?** (vs Remix, SvelteKit, etc.)
- **Why Prisma + MariaDB?** (vs raw SQL, Drizzle, TypeORM, etc.)
- **Why React Context for state?** (vs Redux, Zustand, Jotai, etc.)
- **Why MUI?** (vs Shadcn, Tailwind, etc.)
- **Why NextAuth.js?** (vs Auth0, Clerk, etc.)
- Architectural patterns (hexagonal, layered, feature-based, etc.)
- Database schema design decisions
- Component composition strategy

## How agents use this

1. **Before writing code**, agents read `CONTEXT.md` to understand the domain and codebase structure
2. **When proposing changes**, they check `docs/adr/` to align with past decisions
3. **When suggesting improvements**, they reference existing ADRs to avoid contradicting prior rationale
4. **When reviewing code**, they apply the domain language and patterns described in `CONTEXT.md`

## Next Steps

1. Create `CONTEXT.md` at the repository root with your project's domain model
2. Create `docs/adr/` directory if it doesn't exist
3. Document key architectural decisions as ADRs (you can backfill these over time)
4. Update `CONTEXT.md` and ADRs as your architecture evolves
