# Frontend Architecture

The frontend (`apps/web`) is built with Next.js 16 (React 19) utilizing the App Router.

## Application Structure

The application routes are structured using Next.js route groups:

- **`app/(landing)`**: Public-facing pages (Home, About, Features, Login, Register).
- **`app/(dashboard)`**: Authenticated experiences (Dashboard, My Rooms).
- **`app/(dashboard)/dashboard/rooms/[roomId]`**: The active room view containing chat, members, and stage.

## State Management

BridgeRoom's web app separates server state from client state:

1. **Server State (TanStack Query)**
   Data fetching and caching (e.g., fetching room details, messages, user profile) are handled via `@tanstack/react-query`. Custom hooks are grouped into:
   - `src/hooks/queries/`: `use-room`, `use-messages`, `use-profile`, etc.
   - `src/hooks/mutations/`: `use-create-room`, `use-login`, `use-join-room`, etc.

2. **Client State (Zustand)**
   Global UI or local app state is handled via Zustand. Primarily, `src/store/auth.store.ts` manages the current user's authentication context.

## API Integration

Network requests are centralized in `src/services/`.

- **`api.ts`**: Configures an Axios instance pointing to `NEXT_PUBLIC_API_URL` and includes interceptors (e.g., for attaching tokens, handling 401s, etc.).
- Modules like `auth.service.ts`, `room.service.ts`, and `message.service.ts` export specific functions that use this Axios instance.

## UI Components

- The project relies heavily on `packages/ui`, which exports customized [shadcn/ui](https://ui.shadcn.com/) components built with Radix UI and Tailwind CSS v4.
- App-specific components are organized logically in `src/components/` by domain (`auth`, `dashboard`, `landing`, `room`).
