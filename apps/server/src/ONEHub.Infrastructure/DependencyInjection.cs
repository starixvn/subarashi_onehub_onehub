using Microsoft.Extensions.DependencyInjection;

namespace ONEHub.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {

        services.AddMemoryCache(options => { options.TrackStatistics = true; });

        // services


        // repositories


        return services;
    }
}
