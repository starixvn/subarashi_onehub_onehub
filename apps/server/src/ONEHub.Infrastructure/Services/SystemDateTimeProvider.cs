using ONEHub.Application.Services;

namespace ONEHub.Infrastructure.Services;

public class SystemDateTimeProvider : IDateTimeProvider
{
    public DateTime UtcNow => DateTimeOffset.UtcNow.DateTime;

    public DateTimeOffset OffsetNow => DateTimeOffset.Now;

    public DateTime MinValue => DateTimeOffset.MinValue.DateTime;
}
