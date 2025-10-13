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

- **.NET 9**: Latest .NET framework
- **Entity Framework Core**: ORM for database access
- **Redis**: Caching layer
- **Serilog**: Structured logging
- **Sentry**: Error tracking and monitoring
- **Swagger/OpenAPI**: API documentation
- **xUnit**: Testing framework

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

## Additional Notes

### Pending Configuration

The following items need to be configured based on requirements:

1. **Database**: Choose and configure database provider (SQL Server, PostgreSQL, etc.)
2. **Authentication**: Implement JWT or Identity authentication
3. **Redis**: Configure Redis connection string
4. **Sentry**: Add Sentry DSN for error tracking
5. **Third-party Integrations**: Configure as needed (Google Sheets, Member Site API, etc.)
6. **Proxy Settings**: Configure if external API calls require proxy

## License

ISC

