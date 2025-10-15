using System.Collections.Concurrent;
using ONEHub.Application.Services;
using ONEHub.Domain.Entities;
using ONEHub.Domain.Repositories;

namespace ONEHub.Infrastructure.Repositories;

public class AuthRepository(
    IDateTimeProvider dateTimeProvider
    ) : IAuthRepository
{
    private static readonly ConcurrentDictionary<int, User> MockUsers = new(
        new Dictionary<int, User>
        {
            [1] = new User
            {
                UserId = 1,
                Username = "admin",
                Email = "admin@onehub.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
                Avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
            },
            [2] = new User
            {
                UserId = 2,
                Username = "testuser",
                Email = "test@onehub.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("test123"),
                Avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=testuser"
            }
        });

    private static int nextUserId = 3;

    public Task<User> GetUserByUsernameAsync(string username, CancellationToken cancellationToken = default)
    {
        var user = MockUsers.Values.FirstOrDefault(u =>
            u.Username.Equals(username, StringComparison.OrdinalIgnoreCase));

        return Task.FromResult(user);
    }

    public Task<User> GetUserByIdAsync(int userId, CancellationToken cancellationToken = default)
    {
        MockUsers.TryGetValue(userId, out var user);
        return Task.FromResult(user);
    }

    public Task<User> CreateUserAsync(User user, CancellationToken cancellationToken = default)
    {
        user.UserId = Interlocked.Increment(ref nextUserId);
        MockUsers.TryAdd(user.UserId, user);
        return Task.FromResult(user);
    }

    public bool VerifyPassword(string password, string passwordHash)
    {
        return BCrypt.Net.BCrypt.Verify(password, passwordHash);
    }

    private static readonly ConcurrentBag<RefreshToken> RefreshTokens = [];

    public Task StoreRefreshTokenAsync(RefreshToken refreshToken, CancellationToken cancellationToken = default)
    {
        RefreshTokens.Add(refreshToken);
        return Task.CompletedTask;
    }

    public Task<RefreshToken> GetRefreshTokenAsync(int userId, string token, CancellationToken cancellationToken = default)
    {
        var refreshToken = RefreshTokens.FirstOrDefault(rt =>
            rt.UserId == userId &&
            rt.Token == token &&
            !rt.IsRevoked &&
            rt.ExpiresAt > dateTimeProvider.UtcNow);

        return Task.FromResult(refreshToken);
    }

    public Task RevokeAllExpiredUserRefreshTokensAsync(int userId, CancellationToken cancellationToken = default)
    {
        var userTokens = RefreshTokens.Where(rt => rt.UserId == userId && !rt.IsRevoked && rt.ExpiresAt <= dateTimeProvider.UtcNow);

        foreach (var token in userTokens)
        {
            token.IsRevoked = true;
        }

        return Task.CompletedTask;
    }
}
