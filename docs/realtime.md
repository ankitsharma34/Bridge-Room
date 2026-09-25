# Realtime Implementation

BridgeRoom uses Socket.IO to manage all real-time events. The configuration utilizes `ioredis` to manage session/presence state efficiently.

## Connection & Authentication

- Socket connections undergo validation through `socket-auth.middleware.ts` using JWT verification before a socket is established.

## Event Dictionary

Events are logically grouped into Client-emitted and Server-emitted events (`apps/server/src/socket/events/socket.events.ts`).

### Client Events (Sent from Web)

- `active_room:join` / `active_room:leave`: User focuses or leaves the active room view.
- `message:send`: User sends a message in a room.
- `message:read` / `message:delivered`: Status receipts for a specific message.
- `typing:start` / `typing:stop`: Typing indicator triggers.

### Server Events (Sent to Web)

- **Presence**: `user_online`, `user_offline`, `room_presence:updated`, `active_room:joined`, `active_room:left`.
- **Membership**: `room:member_joined`, `room:member_left`.
- **Chat**: `message:received`, `message:updated`, `message:deleted`.
- **Indicators**: `typing:updated`, `message:read`, `message:delivered`.
- **Error**: `error` (for emitting websocket-level failures back to the client).

## Redis Coordination

- While PostgreSQL stores persistent historical records (like messages and room members), Redis is used in the Socket.IO `services` (e.g., `presence.service.ts`, `active-room.service.ts`) to track who is currently connected and typing.
