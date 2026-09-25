# Troubleshooting

## Common Local Setup Issues

### 1. Database Connection Refused

**Symptom**: Server crashes on startup with Prisma connection errors.
**Cause**: The local PostgreSQL docker container isn't running or `DATABASE_URL` is mismatched.
**Fix**:

- Ensure Docker is running.
- Run `docker compose up -d` in the root.
- Verify `apps/server/.env` contains `postgresql://postgres:postgres@localhost:5432/bridgeroom` (or your matching credentials).

### 2. Realtime/Socket Events Not Firing

**Symptom**: Chat messages don't appear in real time; "Connection Refused" in terminal.
**Cause**: Redis container is down or `REDIS_URL` is misconfigured.
**Fix**:

- Check `docker ps` for `bridgeroom-redis`.
- Ensure `apps/server/.env` includes `REDIS_URL=redis://localhost:6379`.

### 3. Missing `NEXT_PUBLIC_API_URL`

**Symptom**: API requests on the frontend fail or hit `localhost:3000/api` unexpectedly.
**Cause**: Missing or incorrect `.env.local` in `apps/web`.
**Fix**:

- Create `apps/web/.env.local`.
- Add `NEXT_PUBLIC_API_URL=http://localhost:5000/api`.
- Restart the development server (`pnpm dev`).

### 4. Prisma Type Errors on Build

**Symptom**: TypeScript errors citing missing fields on Prisma models.
**Cause**: The Prisma client is outdated relative to `schema.prisma`.
**Fix**:

```bash
cd apps/server
pnpm generate
```
