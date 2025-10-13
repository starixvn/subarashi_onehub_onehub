# OneStop

A monorepo project built with Nx workspaces, featuring a .NET 9 backend and React 19 frontend.

## Project Structure

```
one-stop/
├── apps/
│   ├── server/              # .NET 9 API (Clean Architecture)
│   │   ├── src/
│   │   │   ├── OneStop.Api/
│   │   │   ├── OneStop.Application/
│   │   │   ├── OneStop.Domain/
│   │   │   └── OneStop.Infrastructure/
│   │   ├── tests/
│   │   │   └── OneStop.Tests/
│   │   └── OneStop.sln
│   └── client/              # React + Vite + TypeScript
│       ├── src/
│       │   ├── app/
│       │   ├── components/
│       │   ├── features/
│       │   ├── hooks/
│       │   └── main.tsx
│       ├── tests/
│       └── public/
├── .husky/                  # Git hooks
├── nx.json
└── package.json
```

## Tech Stack

### Backend (.NET 9)
- **Framework**: .NET 9 with Clean Architecture
- **Cache**: Redis
- **Logging**: Sentry, Serilog
- **ORM**: Entity Framework Core
- **API Documentation**: Swagger / OpenAPI
- **Testing**: xUnit

### Frontend (React 19)
- **Core**: React 19 + TypeScript + Vite 7
- **UI Library**: shadcn/ui + Tailwind CSS v4
- **State Management**: TanStack Query v5 + Zustand
- **Forms**: react-hook-form + Zod v4
- **Router**: TanStack Router
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint + Prettier

### Monorepo Tools
- **Build System**: Nx 21
- **Git Hooks**: Husky
- **Commit Linting**: Commitlint (Conventional Commits)

## Getting Started

### Prerequisites

- Node.js >= 22.0.0
- npm >= 10.0.0
- .NET 9 SDK
- Redis (for backend caching)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Restore .NET packages:
```bash
cd apps/server
dotnet restore
```

### Development

Run all apps in development mode:
```bash
npm run dev
```

Run specific app:
```bash
# Frontend only
cd apps/client
npm run dev

# Backend only
cd apps/server
dotnet run --project src/OneStop.Api
```

### Build

Build all apps:
```bash
npm run build
```

### Adding UI Components

Add shadcn/ui components to the client app:
```bash
cd apps/client
npx shadcn@latest add button
```

Browse available components at [shadcn/ui](https://ui.shadcn.com/)

### Testing

Run all tests:
```bash
npm run test
```

### Linting

Lint all packages:
```bash
npm run lint
```

## Learn More

- [Nx Documentation](https://nx.dev/getting-started/intro)
- [.NET Documentation](https://docs.microsoft.com/en-us/dotnet/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

## License

ISC

