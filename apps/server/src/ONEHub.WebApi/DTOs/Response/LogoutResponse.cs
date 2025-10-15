using ONEHub.WebApi.DTOs.Interfaces;

namespace ONEHub.WebApi.DTOs.Response;

public class LogoutResponse : IResponse
{
    public int ErrorCode { get; set; }

    public string ErrorMessage { get; set; }
}

