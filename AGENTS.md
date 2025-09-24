# AGENTS.md file
Dev environment tips

Enforce Yarn v4 workspace integrity (yarn install --immutable).

Validate yarn.lock consistency across workspaces.

Run yarn workspaces focus <project_name> to scope builds.

Watch for unused dependencies → propose cleanup PRs.

Code Quality & Security

Run yarn lint + yarn tsc --noEmit on every PR.

Auto‑fix ESLint/Prettier issues before commit.

Block insecure code patterns (e.g., eval, Function constructor).

Patch vulnerabilities with yarn npm audit.

Deny hard‑coded secrets → enforce wrangler secret put.

Testing instructions

Find the CI plan in the .github/workflows folder.

Run yarn workspaces foreach --topological-dev --include <project_name> run test to run every check defined for that package.

Run yarn vitest run --coverage scoped to changed workspaces.

Fail PRs if coverage drops below baseline.

Auto‑generate test stubs for new files.

Require full suite green before merge.

PR instructions

Title format: [<project_name>]

Always run yarn lint and yarn test before committing.

Product Requirements Documentation (PRD)

For every new feature, create a PRD document in a dedicated folder: docs/prd/<feature_name>/.

Each PRD should cover:

Feature Overview: business context and goals

User Stories: scenarios and acceptance criteria

Compliance Requirements: security, data handling, and audit expectations

Monitoring Metrics: logs, KPIs, dashboards to track compliance and success

Risks & Mitigations: what could go wrong and how to address

Store supporting assets (diagrams, mockups) in the same folder.

Reference the PRD in your pull request description for traceability.

Cloudflare Deployment Checklist

Run `yarn build` per package → fail if bundle exceeds size budgets.

Optimize assets (JS minified, CSS purged, images to WebP/AVIF).

Ensure `wrangler.toml` has correct bindings for KV/D1/R2.

Run `yarn build` from the project root or scoped workspace before deploying.

Use `npx wrangler pages publish dist --project-name=<project_name>` for frontend deploy.

Use `npx wrangler deploy` for Workers backend.

Security & Policies

Apply least privilege for API keys using wrangler secret put.

Bind KV namespaces with read-only scope unless write is required.

Optimization & Token Efficiency

Keep prompts structured with brevity, and reusable.

Store boilerplate in configs instead of re‑sending.

Use JSON schema outputs + stop sequences to reduce retries.

Fetch only top‑k docs from retrieval (default: 4).

Auto‑summarize conversation memory after 10 turns.

Route small tasks to gpt-4o-mini; reserve larger models for synthesis.

Cache frequent queries in Workers KV / R2.

Debounce frontend inputs to prevent redundant calls.

Ensure .env and wrangler.toml never leak sensitive values.

Observability

Tail logs with wrangler tail <worker_name>.

Monitor agent workflows with codex obs dashboard open.
