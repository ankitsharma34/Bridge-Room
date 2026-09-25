# Environment Variables

This document outlines the environment variables required for the different applications within the BridgeRoom monorepo.

## Backend (`apps/server`)

The backend environment is strictly validated using Zod at runtime (located in `apps/server/src/config/env.ts`). The application will fail to start if required variables are missing or incorrectly formatted.

| Variable             | Purpose                                | Required | Example Format / Default                                   |
| -------------------- | -------------------------------------- | -------- | ---------------------------------------------------------- |
| `PORT`               | The port the Express API listens on.   | No       | `5000` (Default)                                           |
| `DATABASE_URL`       | PostgreSQL connection string.          | Yes      | `postgresql://postgres:postgres@localhost:5432/bridgeroom` |
| `REDIS_URL`          | Redis connection string.               | Yes      | `redis://localhost:6379`                                   |
| `JWT_ACCESS_SECRET`  | Secret key for signing access tokens.  | Yes      | `your_super_secret_access_key`                             |
| `JWT_REFRESH_SECRET` | Secret key for signing refresh tokens. | Yes      | `your_super_secret_refresh_key`                            |
| `NODE_ENV`           | Running environment.                   | No       | `development` (Default)                                    |
| `FRONTEND_URL`       | Used for CORS origins.                 | Yes      | `http://localhost:3000`                                    |

## Frontend (`apps/web`)

The Next.js application expects variables in `.env.local` for local development or within the deployment environment (e.g., Vercel).

| Variable              | Purpose                                                                                                     | Required | Example Format / Default    |
| --------------------- | ----------------------------------------------------------------------------------------------------------- | -------- | --------------------------- |
| `NEXT_PUBLIC_API_URL` | The base URL of the backend REST API. Must be prefixed with `NEXT_PUBLIC_` to be accessible by the browser. | Yes      | `http://localhost:5000/api` |
