# Database

The application uses PostgreSQL as its primary datastore and Prisma ORM for data access and migrations.

## Schema Location

The single source of truth for the database schema is located at `apps/server/prisma/schema.prisma`.

## Core Entities

- **User**: Core identity model holding `email`, `username`, hashed `password`.
- **RefreshToken**: Securely stores active session refresh tokens linked to a `User`.
- **Room**: A private session space containing a `code` (unique invite code), `name`, `ownerId`.
- **RoomMember**: A join table mapping users to rooms, tracking `joinedAt` and `lastReadMessageId`.
- **Message**: Standard text message sent in a `Room` by a `User`.
- **MessageDelivery**: Tracks delivery receipts mapping a `Message` to a specific `User`.

## Workflow & Commands

### Managing Migrations

To create and apply a migration after modifying `schema.prisma`:

```bash
cd apps/server
pnpm migrate
```

### Generating the Client

Whenever the schema is changed, the Prisma client must be regenerated to update TypeScript types:

```bash
cd apps/server
pnpm generate
```

### Inspecting Data

Prisma Studio is available to view and modify local data during development:

```bash
cd apps/server
pnpm studio
```
