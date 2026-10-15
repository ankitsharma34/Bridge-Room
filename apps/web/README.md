# BridgeRoom Web

The BridgeRoom web client is a Next.js 16 App Router application for private
social rooms. It provides public marketing pages, email/password authentication,
protected dashboard pages, room management, member lists, and the current chat
interface.

## Stack

- Next.js 16, React 19, and TypeScript
- Tailwind CSS 4 and local shadcn-style UI components
- TanStack Query for server state
- Zustand for the persisted browser session
- Axios for the REST API client and refresh-token retry flow
- React Hook Form and Zod schemas from `@bridgeroom/shared`

## Application map

| Area | Route | Purpose |
| --- | --- | --- |
| Landing | `/`, `/about`, `/features` | Public product pages |
| Authentication | `/login`, `/register` | Account access and creation |
| Dashboard | `/dashboard` | Room and message summary |
| Profile | `/dashboard/profile` | User details, room counts, and logout |
| Rooms | `/dashboard/rooms` | List, filter, create, or join rooms |
| Room creation | `/dashboard/rooms/create` | Create a private room |
| Room workspace | `/dashboard/rooms/[roomId]` | Stage, members, room actions, and chat |

Dashboard routes are client-protected by `AuthGuard`. The access token and user
profile are persisted under the `bridgeroom-auth` local-storage key. API calls
attach that access token, and a 401 response triggers one shared refresh request
before queued requests are retried.

## Source layout

- `src/app` contains route layouts and pages.
- `src/components` contains auth, dashboard, landing, room, and UI components.
- `src/hooks/queries` owns query keys and server-state reads.
- `src/hooks/mutations` owns room/auth writes, invalidation, navigation, and toasts.
- `src/services` contains typed REST clients.
- `src/store/auth.store.ts` contains the persisted authentication state.
- `src/lib/env/client.ts` validates public environment configuration at startup.

## Configuration

Create `.env.local` with the API prefix used by the Express server:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

`NEXT_PUBLIC_API_URL` is required and must be a valid URL. The browser must also
be allowed to send credentials to this origin because refresh tokens are cookie
based.

## Commands

Run commands from the repository root:

```bash
pnpm --filter web dev
pnpm --filter web lint
pnpm --filter web check-types
pnpm --filter web build
```

The development server listens on `http://localhost:3000`.

## Current boundary

Room and message history reads use the REST API. The server already exposes
Socket.IO events, but the web chat currently renders an optimistic local message
and invalidates history without opening a socket or transmitting that message.
Real-time send/receive, presence, typing indicators, delivery receipts, and read
receipts therefore still need client integration before the chat can be treated
as complete.
