# Identified Issues

## Critical

- [x] **POST /keywords has no validation or authentication** — accepts `request.body as any` with no schema, no auth. Anyone can insert arbitrary data into MongoDB. **Fixed: route removed.**
- [x] **Hardcoded MongoDB credentials in dev docker-compose** — `user/pass` committed to the repo. **Fixed: moved to `.env.dev` (gitignored), added `.env.dev.example`.**
- [x] **ObjectId injection** — `new ObjectId(id)` with unvalidated user input throws an unhandled 500 on malformed IDs. **Fixed: `MongoId()` TypeBox schema validates at the route level with a 24-char hex regex; invalid IDs are rejected with 400 before reaching the handler.**
- [x] **Generic `throw new Error` instead of HTTP 404** — keyword not found returns 500 instead of 404. **Fixed: throws error with `statusCode: 404` and `code: 'NOT_FOUND'`, caught by global `setErrorHandler` which returns `{ error: { message, code } }`.**

## Performance

- **Double DB query in GET /keywords/:id/graph** — `findRelated()` re-fetches the keyword that was already fetched by `findById()` — 3 queries instead of 2 (`server/src/repositories/keywords.ts:30-48`).
- **No caching on client fetches** — raw `fetch` in `useEffect` with no caching or deduplication. Every page visit re-fetches all data (`web-client/app/keywords/page.tsx:19-23`).
- **No pagination** — `GET /keywords` returns all records at once. `findAll` needs `limit`/`skip` parameters.

## Code Quality

- **No error handling in client fetch calls** — missing `res.ok` check and `.catch()` handler. API errors silently result in bad state (`web-client/app/keywords/page.tsx:19-23`, `web-client/app/keywords/[id]/page.tsx:33-37`).
- [x] **Falsy check bug with sources** — `{data.keyword.sources?.length && (...)}` renders `0` to the DOM when sources is an empty array. **Fixed: changed to `sources && sources.length > 0 &&`.**
- **Type duplication** — `Keyword`, `KeywordSource`, `KeywordData` interfaces are redefined in multiple files with no shared source of truth.
- **Unnecessary `fp()` wrapper on routes plugin** — wrapping route plugins with `fastify-plugin` breaks Fastify encapsulation. Only decorators/hooks should use `fp` (`server/src/routes/api/keywords/index.ts`).

## Architecture

- **No loading/error states on keywords list** — `web-client/app/keywords/page.tsx` shows a blank page until data loads. No error state, no empty state.
- **Client components where Server Components would work** — both keyword pages use `'use client'` only for data fetching. Next.js App Router supports server-side `fetch` natively, which would reduce client JS and improve performance.

## Testing

- **No tests** — zero test files in the project. No test scripts in either `package.json`.

## Deployment & DevOps

- **CI/CD has no build or lint step** — the pipeline goes straight from `git pull` to `docker compose up --build` with no verification gate (`deploy.yml`).
- **`sudo git pull` in CI** — runs git as root, which can cause file permission issues on the VPS.
- [x] **No health checks in docker-compose** — `depends_on: mongodb` only waits for the container to start, not for MongoDB to be ready. App can crash on startup if DB isn't ready yet. **Fixed: added `healthcheck` with `mongosh ping` to the mongodb service and changed `depends_on` to `condition: service_healthy` in both `docker-compose.yaml` and `docker-compose.prod.yml`.**
- [x] **No `NEXT_PUBLIC_API_URL` fallback** — if the env var is not set, all API calls silently go to `undefined/keywords` (`web-client/constants/apiRoutes.ts`). **Fixed: added `?? ''` fallback so requests go to the same origin rather than a broken `undefined` prefix.**
