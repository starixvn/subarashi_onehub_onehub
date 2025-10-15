using ONEHub.Domain.Entities;

namespace ONEHub.Application.Services;

public interface ITokenService
{
    string GenerateAccessToken(User user);

    RefreshToken GenerateRefreshToken(User user);
}
