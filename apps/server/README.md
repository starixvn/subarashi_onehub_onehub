# OneStop API - .NET 9 Backend

A .NET 9 Web API built with Clean Architecture principles.

## Architecture

This project follows Clean Architecture with the following layers:

### Layers

1. **Domain** (`OneStop.Domain`)
   - Contains enterprise business rules
   - Entities, Value Objects, Domain Events
   - No dependencies on other layers

2. **Application** (`OneStop.Application`)
   - Contains application business rules
   - Use Cases, DTOs, Interfaces
   - Depends only on Domain

3. **Infrastructure** (`OneStop.Infrastructure`)
   - Contains external concerns (Database, File System, Web Services, etc.)
   - Implements interfaces defined in Application
   - Depends on Application and Domain

4. **API** (`OneStop.Api`)
   - Entry point of the application
   - Controllers, Middleware, Filters
   - Depends on Application and Infrastructure

## Tech Stack

### Core
- **.NET 9**: Latest .NET framework with minimal APIs support
- **ASP.NET Core**: High-performance web framework
- **C# 13**: Latest language features

### Data & Caching
- **Entity Framework Core**: ORM for database access with migrations
- **Redis**: Distributed caching layer for performance

### Logging & Monitoring
- **Serilog**: Structured logging with multiple sinks
- **Sentry**: Error tracking, performance monitoring, and alerting

### API & Documentation
- **Swagger/OpenAPI**: Interactive API documentation and testing
- **Minimal APIs**: Lightweight endpoint definitions

### Testing
- **xUnit**: Unit and integration testing framework
- **Moq** (recommended): Mocking framework for unit tests

## Getting Started

### Prerequisites

- .NET 9 SDK
- Redis (for caching)
- SQL Server / PostgreSQL (configure in appsettings.json)

### Setup

1. Restore dependencies:
```bash
dotnet restore
```

   **Note:** NuGet packages are stored in the user profile directory at `%userprofile%\.nuget\packages\` (default NuGet location)

2. Update database (after configuring connection string):
```bash
dotnet ef database update --project src/OneStop.Infrastructure --startup-project src/OneStop.Api
```

3. Run the application:
```bash
dotnet run --project src/OneStop.Api
```

The API will be available at:
- HTTPS: `https://localhost:3001`
- HTTP: `http://localhost:3002` (when using https profile)

### Development

Run in watch mode:
```bash
dotnet watch --project src/OneStop.Api
```

### Testing

Run all tests:
```bash
dotnet test
```

Run specific test project:
```bash
dotnet test tests/OneStop.Tests
```

Run tests with coverage:
```bash
dotnet test --collect:"XPlat Code Coverage"
```

Run tests with detailed output:
```bash
dotnet test --logger "console;verbosity=detailed"
```

## Project Structure

```
server/
├── src/
│   ├── OneStop.Api/              # Web API layer
│   ├── OneStop.Application/      # Application logic layer
│   ├── OneStop.Domain/           # Domain entities layer
│   └── OneStop.Infrastructure/   # Infrastructure layer
├── tests/
│   └── OneStop.Tests/
│       ├── Unit/                 # Unit tests
│       └── Integration/          # Integration tests
└── OneStop.sln
```

## Configuration

Key configuration sections in `appsettings.json`:

- **ConnectionStrings**: Database connection strings
- **Redis**: Redis cache configuration
- **Sentry**: Error tracking configuration
- **Serilog**: Logging configuration
- **Jwt**: JWT authentication settings

## API Documentation

When running in Development mode, access Swagger UI at:
- `https://localhost:3001/swagger`

## Building for Production

Build the application:
```bash
dotnet build --configuration Release
```

Publish the application:
```bash
dotnet publish --configuration Release --output ./publish
```

## Additional Notes

### Pending Configuration

The following items need to be configured based on your requirements:

1. **Database**: Choose and configure database provider (SQL Server, PostgreSQL, MySQL, etc.)
   - Update connection string in `appsettings.json`
   - Run EF Core migrations

2. **Authentication**: Implement authentication strategy
   - JWT Bearer tokens
   - ASP.NET Core Identity
   - OAuth2/OpenID Connect

3. **Redis**: Configure Redis for caching
   - Connection string in `appsettings.json`
   - Optional: Redis Sentinel or Cluster configuration

4. **Sentry**: Add Sentry DSN for error tracking
   - Register at sentry.io
   - Add DSN to `appsettings.json`

5. **CORS**: Configure allowed origins for frontend
   - Update CORS policy in `Program.cs`

6. **Third-party Integrations**: Configure as needed
   - API keys and secrets
   - External service endpoints

## License

ISC

