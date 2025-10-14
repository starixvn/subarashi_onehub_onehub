namespace ONEHub.Domain.Options;

public class AppSetting
{
    public const string SettingName = "AppSetting";

    public bool UseErrorHandler { get; set; }

    public bool UseSwagger { get; set; }
}
