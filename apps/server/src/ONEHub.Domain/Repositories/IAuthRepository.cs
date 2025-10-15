using ONEHub.Domain.Entities;

namespace ONEHub.Domain.Repositories;

public interface IAuthRepository
{
    Task<User> GetUserByUsernameAsync(string username, CancellationToken cancellationToken = default);

    Task<User> GetUserByIdAsync(int userId, CancellationToken cancellationToken = default);

    Task<User> CreateUserAsync(User user, CancellationToken cancellationToken = default);

    bool VerifyPassword(string password, string passwordHash);

    Task StoreRefreshTokenAsync(RefreshToken refreshToken, CancellationToken cancellationToken = default);

    Task<RefreshToken> GetRefreshTokenAsync(int userId, string token, CancellationToken cancellationToken = default);

    Task RevokeAllExpiredUserRefreshTokensAsync(int userId, CancellationToken cancellationToken = default);
}
