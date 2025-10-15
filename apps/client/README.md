# ONEHub Client - React Frontend

A modern React 19 application built with Vite 7, TypeScript, and Tailwind CSS v4.

## Tech Stack

### Core
- **React 19**: Latest React version with concurrent features
- **TypeScript 5.9**: Type-safe JavaScript
- **Vite 7**: Fast build tool and dev server with HMR

### UI & Styling
- **Tailwind CSS v4**: Utility-first CSS framework with PostCSS
- **shadcn/ui**: Beautiful, accessible React components
- **Sonner**: Toast notifications
- **clsx + tailwind-merge**: Dynamic class name utilities
- **class-variance-authority**: Type-safe component variants
- **next-themes**: Theme management for dark mode

### State Management & Data Fetching
- **TanStack Query v5**: Server state management with caching and devtools
- **TanStack Router**: Type-safe routing with devtools
- **Zustand**: Lightweight state management
- **Axios**: Promise-based HTTP client

### Forms & Validation
- **react-hook-form**: Performant form management
- **Zod v4**: TypeScript-first schema validation
- **@hookform/resolvers**: Integration between react-hook-form and validation libraries

### Code Quality
- **ESLint 9**: Linting with TypeScript support
- **Prettier**: Code formatting
- **Vitest 3**: Fast unit testing framework with UI
- **React Testing Library**: Component testing best practices

## Getting Started

### Prerequisites

- Node.js >= 22.0.0
- npm >= 10.0.0

### Installation

Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port)

### Building

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Testing

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Run tests with coverage:
```bash
npm run test:coverage
```

Run tests with UI:
```bash
npm run test:ui
```

## Code Quality

### Linting

```bash
npm run lint
```

### Formatting

Format all files:
```bash
npm run format
```

Check formatting:
```bash
npm run format:check
```

## Project Structure

```
client/
├── src/
│   ├── app/           # App configuration and setup
│   ├── components/    # Reusable UI components
│   ├── features/      # Feature-specific modules
│   ├── hooks/         # Custom React hooks
│   └── main.tsx       # Application entry point
├── tests/
│   ├── unit/
│   │   ├── components/
│   │   └── hooks/
│   ├── integration/
│   ├── setupTests.ts
│   └── vitest.config.ts
├── public/            # Static assets
└── index.html         # HTML entry point
```

## Configuration

### Path Aliases

The `@` alias is configured to point to the `src` directory:

```typescript
import { Component } from '@/components/Component';
```

### Environment Variables

Create a `.env.local` file in the root of the client directory:

```env
VITE_API_URL=https://localhost:7290/api
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## shadcn/ui Components

To add shadcn/ui components, use the CLI:

```bash
npx shadcn@latest add button
npx shadcn@latest add form
```

## Learn More

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [TanStack Router Documentation](https://tanstack.com/router/latest)
- [react-hook-form Documentation](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

## License

ISC
