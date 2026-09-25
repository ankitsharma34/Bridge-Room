<center>

# BridgeRoom

</center>

## Description

**BridgeRoom** is a real-time social hangout platform designed to help friends and family stay connected, regardless of distance.

Users can create private rooms, communicate through real-time messaging, see member presence, and interact through shared activities. The platform is built with a scalable room-based architecture and a real-time backend designed for reliable communication.

## Tech Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Zustand
- TanStack Query
- Axios
- Socket.IO Client
- React Hook Form
- Zod
- shadcn/ui

### Backend

- Node.js
- Express.js
- TypeScript
- Socket.IO
- JWT
- Zod
- Pino

### Database & Infrastructure

- PostgreSQL
- Prisma ORM
- Redis
- Docker
- Turborepo
- pnpm

### Deployment

- Vercel - Frontend
- Render - Backend
- Neon - PostgreSQL
- Upstash - Redis

## Technical Description

BridgeRoom follows a **monorepo-based architecture** using Turborepo, with separate applications for the frontend and backend and shared packages for common types and validation schemas.

The backend exposes REST APIs for authentication, room management, memberships, invitations, and messaging workflows. JWT-based authentication, request validation, centralized error handling, and structured logging provide a consistent backend architecture.

Real-time communication is handled using **Socket.IO**, supporting room-based messaging and presence tracking. Redis is used for fast-access and real-time state, while PostgreSQL provides persistent application data storage through Prisma ORM.

The frontend uses **TanStack Query** for server-state management and **Zustand** for client-side state, with Next.js providing the application framework and routing.

Detailed architecture, API specifications, database design, authentication flow, real-time events, development setup, and deployment documentation are maintained separately in the [`docs`](./docs) directory.

## How to Use

### Prerequisites

- Node.js 18+
- pnpm
- Docker
- PostgreSQL
- Redis

### Installation

Clone the repository:

```bash
git clone https://github.com/ankitsharma34/Bridge-Room.git
cd Bridge-Room
```

Install dependencies:

```bash
pnpm install
```

Configure the required environment variables for the frontend and backend.

Start the development environment:

```bash
pnpm dev
```

The frontend and backend applications will run through the Turborepo workspace.

For detailed setup instructions, environment variables, database configuration, and development workflows, see the [`docs`](./docs) directory.

## Links

- Frontend: [Live Demo](https://bridge-room-web.vercel.app)
- Server Health: [Live API](https://bridgeroom-server.onrender.com/api/health)
- Repository: [GitHub Repository](https://github.com/ankitsharma34/Bridge-Room)
- Documentation: [Project Documentation](docs/README.md)
