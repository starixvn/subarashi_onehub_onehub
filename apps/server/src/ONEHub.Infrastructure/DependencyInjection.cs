using Microsoft.Extensions.DependencyInjection;
using ONEHub.Application.Services;
using ONEHub.Domain.Repositories;
using ONEHub.Infrastructure.Repositories;
using ONEHub.Infrastructure.Services;

namespace ONEHub.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddMemoryCache(options => { options.TrackStatistics = true; });

        // services
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IDateTimeProvider, SystemDateTimeProvider>();
        services.AddScoped<ILogAggregate, LogAggregate>();

        // repositories
        services.AddScoped<IAuthRepository, AuthRepository>();

        return services;
    }
}
