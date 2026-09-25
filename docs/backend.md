# Backend Architecture

The backend (`apps/server`) is a Node.js API built with Express v5 and TypeScript, structured following a layered modular architecture.

## Architecture Pattern

The application logic is broken down into specific domains (modules). Each module generally implements the following layers:

- **Routes (`*.routes.ts`)**: Registers HTTP methods and paths, applying relevant middleware.
- **Controllers (`*.controller.ts`)**: Handles the HTTP request/response cycle and passes data to the service.
- **Services (`*.service.ts`)**: Encapsulates business logic.
- **Repositories (`*.repository.ts`)**: Handles database interaction using Prisma ORM, abstracting data-access from services.
- **Schemas (`*.schema.ts`)**: Defines Zod validation schemas for inputs.

## Key Modules

- **Auth** (`src/modules/auth/`): Handles registration, login, token refresh, and logout.
- **Room** (`src/modules/room/`): Handles room creation, membership, joining, and listing.
- **Message** (`src/modules/message/`): Handles retrieving chat history, read receipts, message updates, and deletions.

## Middleware & Utilities

- **Error Handling**: Centralized error handling exists in `src/middleware/error.middleware.ts`. Services throw domain-specific errors via `src/utils/app-error.ts` which are formatted and returned by the middleware.
- **Validation**: Requests are validated against Zod schemas.
- **Authentication**: `auth.middleware.ts` validates JWT access tokens on protected routes.
- **Logging**: Configured via Pino (`pino-http`) in `logger.middleware.ts` and `logger.ts`.

## Cross-Cutting Concerns

Shared types and validation schemas (e.g., login, register) exist in `packages/shared` to enforce parity between the frontend and backend.
