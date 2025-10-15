using System.Text;
using Microsoft.Extensions.Logging;
using ONEHub.Application.Services;

namespace ONEHub.Infrastructure.Services;

public class LogAggregate(
    ILogger<LogAggregate> logger,
    IDateTimeProvider dateTimeProvider)
    : ILogAggregate
{
    private StringBuilder builder = new();
    private int step;

    public void AppendHeader(string message)
        => builder.AppendLine($"{message.ToUpperInvariant()}");

    public void AppendLog(string message)
        => builder.AppendLine($"{dateTimeProvider.UtcNow.ToString("yyyy-MM-dd HH:mm:ss.fff")}: {message}");

    public void AppendStepLog(string message)
    {
        builder.AppendLine($"\n- STEP {step}: {message}");
        step++;
    }

    public string GetAggregateMsg() => builder.ToString();

    public void SendLog(LogLevel logLevel)
    {
        if (builder.Length == 0)
        {
            return;
        }

        string message = GetAggregateMsg();

        switch (logLevel)
        {
            case LogLevel.Critical:
                logger.LogCritical(message);
                break;

            case LogLevel.Error:
                logger.LogError(message);
                break;

            default: // Log Information
                logger.LogInformation(message);
                break;
        }

        builder = new StringBuilder();
        step = 0;
    }
}
