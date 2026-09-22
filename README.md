# ShopNotes API (TravaStack sandbox)

A small sample Node.js + TypeScript API used to test [TravaStack](https://travastack.com), an AI assistant that
triages GitHub issues. Everything here is sample code; secrets in test issues are fake.

## What it does

ShopNotes stores short notes attached to orders. It exposes a REST API:

| Method | Path | Description |
| --- | --- | --- |
| GET | `/health` | Health check, returns `{ "ok": true }` |
| GET | `/orders/:id/notes` | List notes for an order |
| POST | `/orders/:id/notes` | Add a note (`{ "text": "..." }`, max 500 characters) |
| DELETE | `/notes/:noteId` | Delete a note (requires the `X-Admin-Token` header) |

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

The server listens on port `3000` by default. See [docs/configuration.md](docs/configuration.md) to change it.

## Documentation

- [Configuration](docs/configuration.md): environment variables, port, database, rate limits
- [Troubleshooting](docs/troubleshooting.md): common errors and fixes
