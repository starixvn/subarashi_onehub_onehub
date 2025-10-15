using System.Reflection;
using Microsoft.AspNetCore.HttpOverrides;
using ONEHub.Application;
using ONEHub.Domain.Options;
using ONEHub.Infrastructure;
using ONEHub.WebApi.Configurations;
using ONEHub.WebApi.Endpoints;
using ONEHub.WebApi.ExceptionHandler;
using ONEHub.WebApi.HealthChecks;

namespace ONEHub.WebApi.Startup;

public static class DependencyInjection
{
    public static IServiceCollection AddDependencyInjection(this IServiceCollection services, IConfiguration configuration)
    {
        var appSetting = configuration.GetSection(AppSettings.SettingName).Get<AppSettings>();

        if (appSetting == null)
        {
            throw new InvalidOperationException("App settings are not configured properly.");
        }

        services.Configure<AppSettings>(configuration.GetSection(AppSettings.SettingName));

        services
            .AddApplication()
            .AddInfrastructure();

        services.AddCors(options => options.AddDefaultPolicy(policy =>
            policy
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()));

        services.Configure<RouteHandlerOptions>(options => { options.ThrowOnBadRequest = true; });

        services.Configure<ForwardedHeadersOptions>(options =>
        {
            options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto | ForwardedHeaders.XForwardedHost;
            options.ForwardLimit = null;
            options.KnownNetworks.Clear();
            options.KnownProxies.Clear();
        });

        services
            .AddHealthChecks()
            .AddCheck<ServerHealthCheck>("Server")
            .AddCheck<MemoryHealthCheck>("Memory");

        services.AddHttpContextAccessor();
        services.AddExceptionHandler<BadHttpRequestExceptionHandler>();
        services.AddExceptionHandler<GlobalExceptionHandler>();

        services.InstallServices(configuration, typeof(IServiceInstaller).Assembly);

        return services;
    }

    public static IEndpointRouteBuilder MapEndpoints(this IEndpointRouteBuilder app)
    {
        var endpointType = typeof(IEndpoints);
        var assembly = endpointType.Assembly;

        var endpointTypes = assembly.GetExportedTypes()
            .Where(t => t.IsClass && endpointType.IsAssignableFrom(t));

        foreach (var type in endpointTypes)
        {
            if (Activator.CreateInstance(type) is IEndpoints instance)
            {
                instance.Map(app);
            }
        }

        return app;
    }

    private static void InstallServices(this IServiceCollection services, IConfiguration configuration, params Assembly[] assemblies)
    {
        var serviceInstallers = assemblies
            .SelectMany(a => a.DefinedTypes)
            .Where(t => typeof(IServiceInstaller).IsAssignableFrom(t) && t.IsClass)
            .Select(Activator.CreateInstance)
            .Cast<IServiceInstaller>();

        foreach (var serviceInstaller in serviceInstallers)
        {
            serviceInstaller.Install(services, configuration);
        }
    }
}
