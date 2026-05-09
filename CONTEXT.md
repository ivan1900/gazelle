# Gazelle: Domain Model and Architecture

## What problem do we solve?

This project is a tool for user activity tracking and dashboarding. It allows users to log activities, view them on a dashboard, and gain insights into their habits and routines.

## Core Concepts

- **Activity**: A record of a user's action or event, including details such as type, duration, and timestamp.
- **Account**: Represents a user in the system, including authentication and profile information.
- **Dashboard**: A visual representation of a user's activities and metrics, providing insights and trends.
- [more entities...]

## Architecture

[High-level overview: How does data flow? What are the major components?]
there are two main boundled contexts:

- app/ — the Next.js application, which includes both frontend and backend code (API routes)
- Contexts/ — Is a real backend, here use domain drive design to organize code by domain concepts (Account, Activity, etc.)

### Tech Stack

- **Frontend**: Next.js 16, React 19, MUI 9
- **Styling**: Emotion + MUI
- **Backend**: Next.js Server Actions prior API routes + Prisma ORM
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
├── Contexts/ # Real backend with domain-driven design
│ ├── Account/
│ ├── Activity/
│ ├── ActivityType/
│ └── shared/
└── generated/ # Prisma client + types

```

## Key Decisions

See `docs/adr/` for detailed architectural decisions.

## Constraints & Principles

- Use cleand code principles
- First use integrated node features vs install new dependencies, unless there's a clear need
- Prioritize maintainability and readability over performance optimizations (premature optimization is the root of all evil)
- Follow established patterns and conventions in the Next.js and React ecosystems inside app/, but use domain-driven design principles in Contexts/ to organize code by business concepts rather than technical layers
