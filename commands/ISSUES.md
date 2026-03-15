# Identified Issues

## Critical

- [x] **POST /keywords has no validation or authentication** — accepts `request.body as any` with no schema, no auth. Anyone can insert arbitrary data into MongoDB. **Fixed: route removed.**
- [x] **Hardcoded MongoDB credentials in dev docker-compose** — `user/pass` committed to the repo. **Fixed: moved to `.env.dev` (gitignored), added `.env.dev.example`.**
- [x] **ObjectId injection** — `new ObjectId(id)` with unvalidated user input throws an unhandled 500 on malformed IDs. **Fixed: `MongoId()` TypeBox schema validates at the route level with a 24-char hex regex; invalid IDs are rejected with 400 before reaching the handler.**
- [x] **Generic `throw new Error` instead of HTTP 404** — keyword not found returns 500 instead of 404. **Fixed: throws error with `statusCode: 404` and `code: 'NOT_FOUND'`, caught by global `setErrorHandler` which returns `{ error: { message, code } }`.**

## Performance

- [x] **Double DB query in GET /keywords/:id/graph** — `findRelated()` re-fetches the keyword that was already fetched by `findById()` — 3 queries instead of 2. **Fixed: replaced `findRelated(id)` with `findRelatedByIds(relatedIds)` that accepts IDs directly — 1 query instead of 2. Added MongoDB projections to `findAll` and `findRelatedByIds` to transfer only needed fields.**
- [x] **No caching on client fetches** — raw `fetch` in `useEffect` with no caching or deduplication. **Fixed: pages converted to Server Components with `next: { revalidate: 60 }` ISR caching.**
- [x] **No pagination** — `GET /keywords` returns all records at once. **Fixed: added `page`/`limit` query params (default 20, max 100) with `PaginatedResponse` schema returning `{ data, pagination: { page, limit, total, totalPages } }`. `countAll()` and `findAll()` run in parallel via `Promise.all`.**

## Code Quality

- [x] **No error handling in client fetch calls** — missing `res.ok` check and `.catch()` handler. **Fixed: pages are now Server Components; `getKeywords()` checks `res.ok` and returns `[]` on failure; `getKeywordData()` checks `res.ok` and calls `notFound()` on failure.**
- [x] **Falsy check bug with sources** — `{data.keyword.sources?.length && (...)}` renders `0` to the DOM when sources is an empty array. **Fixed: changed to `sources && sources.length > 0 &&`.**
- [x] **Type duplication** — `Keyword`, `KeywordSource`, `KeywordData` interfaces are redefined in multiple files with no shared source of truth. **Fixed: created `web-client/types/keyword.ts` with shared types (`KeywordListItem`, `KeywordDetail`, `KeywordSummary`, `KeywordGraphData`, `KeywordSource`); all components import from this single file.**
- [x] **Unnecessary `fp()` wrapper on routes plugin** — wrapping route plugins with `fastify-plugin` breaks Fastify encapsulation. **Fixed: removed `fp()` wrapper, plugin exported directly.**

## Architecture

- [x] **No loading/error states on keywords list** — `web-client/app/keywords/page.tsx` shows a blank page until data loads. **Fixed: page is now a Server Component — SSR renders the full list, no loading state needed. 404 detail pages handled via `notFound()`.**
- [x] **Client components where Server Components would work** — both keyword pages use `'use client'` only for data fetching. **Fixed: both pages converted to async Server Components. Only the Graph (interactive @xyflow/react) remains client-side, lazy-loaded via `dynamic()` with `ssr: false`.**

## Testing

- **No tests** — zero test files in the project. No test scripts in either `package.json`.

## Deployment & DevOps

- [x] **CI/CD has no build or lint step** — the pipeline goes straight from `git pull` to `docker compose up --build` with no verification gate (`deploy.yml`). **Fixed: added a `lint` job (runs `npm ci && npm run lint` for server and web-client) that must pass before `deploy` runs; lint also added to both Dockerfiles.**
- **`sudo git pull` in CI** — runs git as root, which can cause file permission issues on the VPS.
- [x] **No health checks in docker-compose** — `depends_on: mongodb` only waits for the container to start, not for MongoDB to be ready. App can crash on startup if DB isn't ready yet. **Fixed: added `healthcheck` with `mongosh ping` to the mongodb service and changed `depends_on` to `condition: service_healthy` in both `docker-compose.yaml` and `docker-compose.prod.yml`.**
- [x] **No `NEXT_PUBLIC_API_URL` fallback** — if the env var is not set, all API calls silently go to `undefined/keywords` (`web-client/constants/apiRoutes.ts`). **Fixed: added `?? ''` fallback so requests go to the same origin rather than a broken `undefined` prefix.**
