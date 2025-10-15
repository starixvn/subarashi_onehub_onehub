using ONEHub.Domain.Results;
using ONEHub.WebApi.DTOs.Interfaces;

namespace ONEHub.WebApi.DTOs.Response;

public class UserProfileResponse : IResponse<UserProfileResult>
{
    public int ErrorCode { get; set; }

    public string ErrorMessage { get; set; }

    public UserProfileResult Result { get; set; }
}
