using ONEHub.Domain.Entities;
using ONEHub.WebApi.DTOs.Interfaces;

namespace ONEHub.WebApi.DTOs.Response;

public class LoginResponse : IResponse<User>
{
    public int ErrorCode { get; set; }

    public string ErrorMessage { get; set; }

    public User Result { get; set; }
}
