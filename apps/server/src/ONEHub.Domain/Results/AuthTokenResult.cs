namespace ONEHub.Domain.Results;

public class AuthTokenResult
{
    public UserProfileResult User { get; set; }

    public required string AccessToken { get; set; }

    public required string RefreshToken { get; set; }
}
