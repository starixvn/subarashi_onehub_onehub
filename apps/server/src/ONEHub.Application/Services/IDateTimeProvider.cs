namespace ONEHub.Application.Services;

public interface IDateTimeProvider
{
    public DateTime UtcNow { get; }

    public DateTimeOffset OffsetNow { get; }

    public DateTime MinValue { get; }
}
