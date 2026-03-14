# Glossary App

A web application for managing and visualizing terminology related to meta-platform architecture and performance metrics. Built as a university research project, it provides an interactive glossary with graph-based visualization of keyword relationships.

## Features

- Browse a full glossary of domain terms with definitions
- View interactive relationship graphs between keywords
- Source references with external links per keyword
- Swagger UI for API exploration
- Unified JSON API with consistent response format

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, React 19, Tailwind CSS 4, @xyflow/react |
| Backend | Fastify 5, TypeScript, TypeBox |
| Database | MongoDB 8 |
| API Docs | Swagger / OpenAPI |
| DevOps | Docker, Docker Compose, Nginx |

## Project Structure

```
glossary-app/
├── server/          # Fastify API server
├── web-client/      # Next.js frontend
├── deploy/          # Docker Compose & Nginx configs
└── commands/        # Project documentation & notes
```

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose

### Run with Docker Compose

```bash
cd deploy
cp .env.dev.example .env.dev   # configure credentials
docker compose up --build
```

| Service | URL |
|---|---|
| Web client | http://localhost:3000 |
| API server | http://localhost:5000 |
| Swagger UI | http://localhost:5000/docs |

### Run without Docker

**Server:**
```bash
cd server
npm install
npm run dev
```

**Web client:**
```bash
cd web-client
npm install
npm run dev
```

## Environment Variables

### Server

| Variable | Description | Default |
|---|---|---|
| `MONGO_URL` | MongoDB connection string | — |
| `PORT` | API server port | `5000` |
| `ORIGIN_URL` | Allowed CORS origin | `http://localhost:3000` |
| `NODE_ENV` | Environment | `development` |
| `LOG_LEVEL` | Pino log level | `debug` |

### Web Client

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the API server |

A `.env.dev.example` file is provided in `deploy/` with default development values.

## API

### `GET /keywords`

Returns all keywords sorted by term.

```json
{
  "data": [
    { "_id": "...", "term": "...", "definition": "..." }
  ]
}
```

### `GET /keywords/:id/graph`

Returns a keyword and its related keywords for graph visualization.

```json
{
  "data": {
    "keyword": {
      "id": "...",
      "term": "...",
      "definition": "...",
      "sources": [{ "name": "...", "url": "..." }]
    },
    "related": [
      { "id": "...", "term": "..." }
    ]
  }
}
```

Error responses follow the format:
```json
{
  "error": { "message": "...", "code": "..." }
}
```

Full interactive docs are available at `/docs` (Swagger UI) when the server is running.

## Scripts

### Server

| Command | Description |
|---|---|
| `npm run dev` | Start with ts-node (watch mode) |
| `npm run build` | Compile TypeScript |
| `npm start` | Run compiled output |
| `npm run lint` | Run ESLint |
| `npm run format` | Run Prettier |

### Web Client

| Command | Description |
|---|---|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Contributing

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/). See `commands/COMMIT.md` for project-specific conventions.
