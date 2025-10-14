using Microsoft.Extensions.Logging;

namespace ONEHub.Application.Services;

public interface ILogAggregate
{
    void AppendHeader(string message);

    void AppendLog(string message);

    void AppendStepLog(string message);

    string GetAggregateMsg();

    void SendLog(LogLevel logLevel);
}
