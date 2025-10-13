# Stage 1: Build React Frontend
FROM node:22-alpine AS client-build

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/client/package*.json ./apps/client/

# Install dependencies
RUN npm ci --workspace=client

# Copy client source code
COPY apps/client ./apps/client

# Build the frontend
WORKDIR /app/apps/client
RUN npm run build

# Stage 2: Build .NET Backend
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS server-build

WORKDIR /app

# Copy solution and project files
COPY apps/server/OneStop.sln ./
COPY apps/server/nuget.config ./
COPY apps/server/src/OneStop.Domain/*.csproj ./src/OneStop.Domain/
COPY apps/server/src/OneStop.Application/*.csproj ./src/OneStop.Application/
COPY apps/server/src/OneStop.Infrastructure/*.csproj ./src/OneStop.Infrastructure/
COPY apps/server/src/OneStop.Api/*.csproj ./src/OneStop.Api/

# Restore dependencies
RUN dotnet restore

# Copy the rest of the server source code
COPY apps/server/src ./src

# Copy the built frontend to wwwroot
COPY --from=client-build /app/apps/client/dist ./src/OneStop.Api/wwwroot

# Build and publish the .NET application
RUN dotnet publish src/OneStop.Api/OneStop.Api.csproj \
    --configuration Release \
    --no-restore \
    --output /app/publish

# Stage 3: Runtime Image
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime

WORKDIR /app

# Copy published application
COPY --from=server-build /app/publish .

# Create a non-root user
RUN adduser --disabled-password --gecos '' --uid 1000 appuser && \
    chown -R appuser:appuser /app
USER appuser

# Expose ports
EXPOSE 5000

# Set environment variables
ENV ASPNETCORE_URLS=http://+:5000
ENV ASPNETCORE_ENVIRONMENT=Production

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/health || exit 1

# Start the application
ENTRYPOINT ["dotnet", "OneStop.Api.dll"]
