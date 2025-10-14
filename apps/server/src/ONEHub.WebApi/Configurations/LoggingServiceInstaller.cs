using Microsoft.AspNetCore.HttpLogging;
using Serilog;

namespace ONEHub.WebApi.Configurations;

public class LoggingServiceInstaller : IServiceInstaller
{
    public void Install(IServiceCollection services, IConfiguration configuration)
    {
        // Serilog
        services.AddSerilog((s, l) => l
            .ReadFrom.Configuration(configuration)
            .ReadFrom.Services(s)
            .Enrich.FromLogContext()
            .Enrich.WithMachineName());

        services.AddHttpLogging(logging =>
        {
            logging.LoggingFields = HttpLoggingFields.All | HttpLoggingFields.RequestQuery;
            logging.RequestHeaders.Add("sec-ch-ua");
            logging.MediaTypeOptions.AddText("application/javascript");
            logging.RequestBodyLogLimit = 4096;
            logging.ResponseBodyLogLimit = 4096;
            logging.CombineLogs = true;
        });
    }
}
