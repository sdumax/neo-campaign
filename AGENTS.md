<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->


## Slash Commands

### /ship
When the user types `/ship <requirement>`:
1. Read `.ai/ship.md` in full.
2. Execute the Ship Workflow defined there.
3. All phases (PM → Architect → Team Lead → Execution → Review → QA → Merge) run in sequence.

This is the multi-agent development workflow. It creates tickets, assigns work to sub-agents, reviews, QAs, and prepares PRs for merge.

## Feature Development Workflow

### Architecture layers

| Layer | Path | Purpose | Owned by |
|---|---|---|---|
| **Primitives** | `components/ui/` | shadcn-generated atoms | shadcn CLI |
| **Custom** | `components/` | Atoms, sections, features | You |
| **Pages** | `app/<route>/` | Page assembly | You |

### The Hard Rule

> If a change can live in the **Custom** layer, it must NOT touch the **Primitives** layer.

Primitives are modified only when the component **cannot function** without the change. Everything else — extra styles, layout wrappers, logic, composition — goes in `components/`. This keeps `npx shadcn@latest add <name>` always safe to re-run without losing your code.

### Workflow

| # | Step | Action |
|---|---|---|
| 1 | **Audit** | Scan `components/ui/` + shadcn registry. What's available? What's missing? |
| 2 | **Add primitive** | If shadcn has it → `npx shadcn@latest add <name>`. If not → hand-roll in `components/ui/`. |
| 3 | **Build custom** | Compose in `components/`. Import from `components/ui/` only — never from shadcn/base-ui directly. Customize behavior here, not in the primitive. |
| 4 | **Assemble page** | Wire into `app/<route>/page.tsx`. |
| 5 | **Verify** | `npx next build` + `npx next lint`. |

### Guidelines

- No `dark:` variants — dark-only theme, use `globals.css` vars
- No hardcoded colors — use `bg-primary`, `text-muted-foreground`, etc.
- shadcn exists → `npx shadcn@latest add` it, never write by hand
- A primitive change is justified only if the component literally won't work without it
