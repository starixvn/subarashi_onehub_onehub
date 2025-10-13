# OneStop Client - React Frontend

A modern React application built with Vite, TypeScript, and Tailwind CSS.

## Tech Stack

### Core
- **React 19**: Latest React version
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Beautiful React components built on Tailwind CSS

### State Management & Data Fetching
- **TanStack Query (React Query)**: Server state management with caching
- **TanStack Router**: Type-safe routing

### Forms & Validation
- **react-hook-form**: Performant form management
- **Zod**: TypeScript-first schema validation

### Code Quality
- **ESLint**: Linting
- **Prettier**: Code formatting
- **Vitest**: Unit testing framework
- **React Testing Library**: Component testing

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

The app will be available at `http://localhost:3000`

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
VITE_API_URL=https://localhost:3001/api
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
