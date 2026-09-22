# Configuration

ShopNotes is configured with environment variables (see `.env.example`).

| Variable | Default | Description |
| --- | --- | --- |
| `PORT` | `3000` | Port the HTTP server listens on. Set `PORT=8080` to change it. |
| `DATABASE_URL` | none | Postgres connection string used by Prisma (`lib/prisma.ts`). Required. |
| `ADMIN_TOKEN` | none | Value required in the `X-Admin-Token` header to delete notes. |
| `RATE_LIMIT_PER_MINUTE` | `60` | Requests per minute per IP before the API returns HTTP 429. |
| `NOTE_MAX_LENGTH` | `500` | Maximum note length in characters; longer notes return HTTP 400. |
| `LOG_LEVEL` | `info` | One of `debug`, `info`, `warn`, `error`. |

## Changing the port

Set `PORT` in your `.env` file, for example `PORT=8080`, and restart the server.

## Rate limiting

Each IP address may make `RATE_LIMIT_PER_MINUTE` requests per minute. When the limit is exceeded the API returns
HTTP 429 with a `Retry-After` header (seconds). Raise the variable to allow more traffic.
