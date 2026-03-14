# Work Summary

## 1. ESLint & Prettier (server)

Added linting and formatting tooling to the server, matching the web-client's approach.

- **ESLint**: flat config with `typescript-eslint` (`recommendedTypeChecked`), Prettier integration
- **Prettier**: tabs, single quotes, trailing commas, 100 char width
- **Scripts**: `lint`, `lint:fix`, `format`, `format:check`
- **Disabled `require-await`** globally — Fastify plugins must be `async` by contract even without `await`
- Auto-formatted all server source files for consistency

## 2. Critical bug fixes

- **Removed unvalidated POST /keywords** — no schema, no auth, accepted arbitrary data
- **Moved hardcoded MongoDB credentials** from `docker-compose.yaml` to `.env.dev` (gitignored), added `.env.dev.example`
- **ObjectId validation at the route level** — created `MongoId()` TypeBox schema (`^[a-f\d]{24}$`) that rejects invalid IDs with 400 before they reach handlers
- **Proper 404 responses** — replaced `throw new Error()` (which returned 500) with structured errors caught by a global error handler
- **Fixed sources rendering bug** — `sources?.length &&` rendered `0` to the DOM for empty arrays

## 3. Unified response format

Established a consistent API response envelope:

- **Success**: `{ data: T }` — via `dataResponse()` helper in handlers
- **Error**: `{ error: { message, code } }` — via global `setErrorHandler` in `initResponseFormat.ts`
- **Schema pair**: `DataResponse(schema)` for TypeBox definitions + `dataResponse(payload)` for runtime — TypeScript enforces the convention
- **Updated frontend** to unwrap `json.data` from both endpoints

## 4. Swagger / OpenAPI documentation

- Integrated `@fastify/swagger` + `@fastify/swagger-ui`
- Available at `/docs`
- Automatically picks up TypeBox schemas from routes (summary, tags, params, response)

## 5. Schema extraction and code organization

Extracted inline TypeBox schemas into reusable modules:

```
src/schemas/
  common.ts      # MongoId()
  keyword.ts     # KeywordSchema, KeywordSummarySchema, KeywordListItemSchema, KeywordSourceSchema
  response.ts    # DataResponse(), ErrorResponse
src/utils/
  response.ts    # dataResponse()
src/types/
  fastify.d.ts   # module augmentation only
```

- `schemas/` — TypeBox schema definitions (compile-time)
- `utils/` — runtime helper functions
- `types/` — TypeScript declarations only
- Route schemas compose from shared building blocks (`KeywordSchema`, `KeywordSummarySchema`) instead of inline duplication
- Added response schema to `GET /keywords` (previously had none)

## 6. Commit conventions

Created `commands/COMMIT.md` with Conventional Commits rules based on the project's existing style, discouraging the `#N` attempt numbering pattern.
