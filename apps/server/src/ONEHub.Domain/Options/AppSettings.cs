namespace ONEHub.Domain.Options;

public class AppSettings
{
    public const string SettingName = "AppSettings";

    public bool UseErrorHandler { get; set; }

    public bool UseSwagger { get; set; }
}
