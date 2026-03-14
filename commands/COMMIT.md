# Commit Message Rules

## Format

```
<type>(<scope>): <description>
```

- **type** — the kind of change (see below)
- **scope** — the affected area (e.g. `server`, `web-client`, `nginx`, `docker`, `ci`)
- **description** — short summary in imperative mood, lowercase, no period at the end

## Types

| Type       | When to use                                      |
|------------|--------------------------------------------------|
| `feat`     | A new feature or functionality                   |
| `fix`      | A bug fix                                        |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `chore`    | Build process, dependencies, configs, tooling    |
| `docs`     | Documentation only changes                       |
| `style`    | Formatting, whitespace, missing semicolons (no logic change) |
| `test`     | Adding or updating tests                         |
| `perf`     | Performance improvement                          |
| `ci`       | CI/CD pipeline changes                           |

## Rules

1. Use imperative mood: "add feature" not "added feature" or "adds feature"
2. Keep the first line under 72 characters
3. Scope should reflect the actual area of change, not the ticket or feature name
4. One logical change per commit — don't mix unrelated changes
5. Use `fix` only for actual bug fixes, not for iterative adjustments during development
6. Use `chore` for dependency updates, config changes, and tooling setup
7. Avoid numbering attempts (e.g. `#3`, `#4`) — squash or amend instead

## Examples

```
feat(server): add pagination to keywords endpoint
fix(web-client): prevent empty sources array rendering as "0"
refactor(server): extract keyword mapping to a helper
chore(server): add eslint and prettier configuration
docs: add commit message conventions
style(server): format routes file with prettier
test(server): add integration tests for keywords routes
ci: add build and lint steps before deploy
perf(server): reduce duplicate db query in findRelated
```
