# Troubleshooting

## `Error: listen EADDRINUSE: address already in use :::3000`

Another process is using port 3000. Stop it, or set a different `PORT` (see configuration.md).

## Prisma error P2024: timed out fetching a new connection from the connection pool

Seen on serverless platforms (e.g. Vercel) under bursts of traffic: each function instance creates its own
`PrismaClient`, which exhausts the database connection pool. Reuse a single client across invocations
(see `lib/prisma.ts`) and consider a pooled connection string.

## HTTP 413 when adding a note

The request body is larger than 10 KB. Notes are limited to `NOTE_MAX_LENGTH` characters (default 500).

## HTTP 401 when deleting a note

The `X-Admin-Token` header is missing or does not match `ADMIN_TOKEN`.
