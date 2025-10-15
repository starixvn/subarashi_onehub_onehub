using ONEHub.Domain.Results;
using ONEHub.WebApi.DTOs.Interfaces;

namespace ONEHub.WebApi.DTOs.Response;

public class RefreshTokenResponse : IResponse<AuthTokenResult>
{
    public int ErrorCode { get; set; }

    public string ErrorMessage { get; set; }

    public AuthTokenResult Result { get; set; }
}
