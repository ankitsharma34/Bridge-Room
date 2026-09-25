# Development Guide

## Scripts and Commands

Commands are run using Turborepo to leverage caching and monorepo coordination. From the root directory:

- **`pnpm dev`**: Starts all development servers (frontend and backend) concurrently.
- **`pnpm build`**: Builds all apps and packages.
- **`pnpm lint`**: Runs ESLint across all projects using shared configurations.
- **`pnpm format`**: Formats code using Prettier (`prettier --write "**/*.{ts,tsx,md}"`).
- **`pnpm check-types`**: Runs TypeScript compiler checks without emitting files.

## Adding Features

1. **Shared Schemas (`packages/shared`)**
   If a feature requires a new request/response shape, update or add the Zod schema in `packages/shared`. This ensures the backend validates it and the frontend types it correctly.

2. **Database Changes (`apps/server/prisma`)**
   Modify `schema.prisma`. Then generate and migrate locally:

   ```bash
   cd apps/server
   pnpm migrate
   pnpm generate
   ```

3. **Backend Logic (`apps/server`)**
   - Create/update your route in the appropriate module directory.
   - Implement controller logic.
   - Separate complex queries into the repository and business rules into the service.
   - Add Socket.IO events if realtime synchronization is needed.

4. **Frontend UI (`apps/web`)**
   - Import necessary schemas/types from `@bridgeroom/shared`.
   - Implement TanStack queries/mutations to hit your new endpoints.
   - Build UI using shadcn components from `@repo/ui`.
