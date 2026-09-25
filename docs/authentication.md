# Authentication Flow

BridgeRoom utilizes a standard JWT (JSON Web Token) approach with distinct access and refresh tokens.

## Implementation Details

### Registration (`POST /api/auth/register`)

- Validates user input (via Zod schema from `packages/shared`).
- Hashes password using `argon2` (`apps/server/src/utils/hash.ts`).
- Creates user in the database.

### Login (`POST /api/auth/login`)

- Verifies credentials using `argon2`.
- Generates a short-lived Access Token and a long-lived Refresh Token (`jwt.ts`).
- Stores the Refresh Token hash in the database securely.
- _Note: Cookie configuration and specific token delivery payloads are handled in the controller._

### Refresh (`POST /api/auth/refresh`)

- Uses a valid refresh token to grant a new short-lived access token, providing persistent sessions without requiring frequent re-authentication.

### Logout (`POST /api/auth/logout`)

- Clears tokens and removes the Refresh Token from the database to invalidate the session.

## Route Protection

Protected routes are secured using `authMiddleware` (`apps/server/src/middleware/auth.middleware.ts`), which requires a valid JWT access token (usually sent via the `Authorization` header as a Bearer token or cookies, depending on the client setup).

Socket.IO connections are independently verified using `socket-auth.middleware.ts` before allowing realtime communication.
