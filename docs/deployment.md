# Deployment

This guide outlines deployment steps based on project dependencies and standard practices for Turborepo monorepos.

## Backend (Node.js/Express)

1. **Environment Variables**: Configure all required secrets (`DATABASE_URL`, `REDIS_URL`, JWT secrets, etc.).
2. **Build**: Run `pnpm build` from the `apps/server` directory. This generates the Prisma Client and compiles TypeScript to `dist/`.
3. **Start**: The application starts via `node dist/src/server.js` (`pnpm start`).

## Frontend (Next.js)

1. **Environment Variables**: Set `NEXT_PUBLIC_API_URL` to point to your live backend domain.
2. **Build**: The app is built using `pnpm build` within `apps/web`.
3. **Start**: Starts via `next start` (`pnpm start`). If deploying to a platform like Vercel, it automatically detects Next.js and handles the build/start flow implicitly.

## Infrastructure Dependencies

- **PostgreSQL**: Hosted on Neon.
- **Redis**: Hosted on Upstash.
