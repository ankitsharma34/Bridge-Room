# Getting Started

Follow these instructions to set up the BridgeRoom project on your local machine for development.

## Prerequisites

- **Node.js**: `>=24.0.0 <25`
- **Package Manager**: `pnpm` (v9.0.0 or higher)
- **Docker & Docker Compose**: Required for running the local PostgreSQL and Redis services.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ankitsharma34/Bridge-Room.git
cd Bridge-Room
```

### 2. Install Dependencies

The project uses pnpm workspaces. Install all dependencies from the root:

```bash
pnpm install
```

### 3. Start Local Infrastructure

BridgeRoom requires PostgreSQL and Redis. A `docker-compose.yml` file is provided in the root directory.

```bash
docker compose up -d
```

_This command starts `bridgeroom-postgres` (port 5432) and `bridgeroom-redis` (port 6379)._

### 4. Configure Environment Variables

**Backend (`apps/server`)**
Copy the example environment file:

```bash
cp apps/server/.env.example apps/server/.env
```

Fill in the values in `apps/server/.env` (see [Environment Variables](./environment-variables.md) for details). At minimum, ensure `DATABASE_URL` and `REDIS_URL` match your Docker setup.

**Frontend (`apps/web`)**
Create `apps/web/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 5. Setup the Database

Navigate to the server directory and run Prisma migrations to build the schema:

```bash
cd apps/server
pnpm migrate
cd ../..
```

### 6. Start the Development Servers

From the root directory, run:

```bash
pnpm dev
```

This Turborepo command will start both the Next.js frontend and the Express backend concurrently.

### 7. Confirm Applications are Running

- **Frontend**: Navigate to `http://localhost:3000`
- **Backend**: API runs at `http://localhost:5000` (or whatever `PORT` you configured).
