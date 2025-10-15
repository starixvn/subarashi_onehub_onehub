using System.Collections.ObjectModel;
using System.Globalization;
using System.Net;
using System.Net.Sockets;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using ONEHub.Application.Services;

namespace ONEHub.WebApi.HealthChecks;

public class ServerHealthCheck(
    IHttpContextAccessor httpContextAccessor,
    IDateTimeProvider dateTimeProvider)
    : IHealthCheck
{
    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        IDictionary<string, object> result = new Dictionary<string, object>();

        await AddServerIpInfo(result);
        AddExtraServerInfo(result);

        return HealthCheckResult.Healthy("Server Info", new ReadOnlyDictionary<string, object>(result));
    }

    private static async Task AddServerIpInfo(IDictionary<string, object> result)
    {
        var hostName = Dns.GetHostName();
        result.Add("Host Name", hostName);

        var serverIps = await Dns.GetHostAddressesAsync(hostName).ConfigureAwait(false);

        for (var i = 0; i < serverIps.Length; i++)
        {
            if (serverIps[i].AddressFamily == AddressFamily.InterNetwork)
            {
                result.Add($"IP{i}", serverIps[i].ToString());
            }
        }
    }

    private void AddExtraServerInfo(IDictionary<string, object> result)
    {
        var context = httpContextAccessor.HttpContext;
        if (context is null)
        {
            return;
        }

        result.Add("Local Ip", context.Connection.LocalIpAddress?.ToString());
        result.Add("Local Port", context.Connection.LocalPort);
        result.Add("Client Ip", context.Connection.RemoteIpAddress?.ToString());
        result.Add("Server Time", dateTimeProvider.OffsetNow.LocalDateTime.ToString(CultureInfo.InvariantCulture));
        result.Add("Last Updated", File.GetCreationTime(typeof(ServerHealthCheck).Assembly.Location).ToString(CultureInfo.InvariantCulture));
        result.Add("Host", context.Request.Host);
        result.Add("Schema", context.Request.Scheme);
    }
}
