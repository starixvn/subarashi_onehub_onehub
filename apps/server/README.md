# ONEHub API - .NET 9 Backend

A .NET 9 Web API built with Clean Architecture principles.

## Architecture

This project follows Clean Architecture with the following layers:

### Layers

1. **Domain** (`ONEHub.Domain`)
   - Contains enterprise business rules
   - Entities, Value Objects, Domain Events
   - No dependencies on other layers

2. **Application** (`ONEHub.Application`)
   - Contains application business rules
   - Use Cases, DTOs, Interfaces
   - Depends only on Domain

3. **Infrastructure** (`ONEHub.Infrastructure`)
   - Contains external concerns (Database, File System, Web Services, etc.)
   - Implements interfaces defined in Application
   - Depends on Application and Domain

4. **Web API** (`ONEHub.WebApi`)
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
- **NetArchTest**: Architecture testing framework for enforcing Clean Architecture rules

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
dotnet ef database update --project src/ONEHub.Infrastructure --startup-project src/ONEHub.WebApi
```

3. Run the application:
```bash
dotnet run --project src/ONEHub.WebApi
```

The API will be available at:
- HTTPS: `https://localhost:7290`
- HTTP: `http://localhost:5252`

### Development

Run in watch mode:
```bash
dotnet watch --project src/ONEHub.WebApi
```

### Testing

Run all tests:
```bash
dotnet test
```

Run architecture tests:
```bash
dotnet test tests/ONEHub.Architecture.Tests
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
│   ├── ONEHub.WebApi/           # Web API layer
│   ├── ONEHub.Application/      # Application logic layer
│   ├── ONEHub.Domain/           # Domain entities layer
│   └── ONEHub.Infrastructure/   # Infrastructure layer
├── tests/
│   └── ONEHub.Architecture.Tests/  # Architecture tests
├── ONEHub.sln
└── Dockerfile
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
- `https://localhost:7290/swagger`

## Building for Production

Build the application:
```bash
dotnet build --configuration Release
```

Publish the application:
```bash
dotnet publish --configuration Release --output ./publish
```

## Docker Deployment

Build Docker image:
```bash
docker build -t onehub-api .
```

Run with Docker:
```bash
docker run -p 5000:5000 onehub-api
```

The API will be available at `http://localhost:5000`

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

