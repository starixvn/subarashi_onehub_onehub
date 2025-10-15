using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ONEHub.Application.Services;
using ONEHub.Domain.Entities;
using ONEHub.Domain.Options;

namespace ONEHub.Infrastructure.Services;

public class TokenService(
    IOptions<JwtSettings> jwtSettings,
    IDateTimeProvider dateTimeProvider)
    : ITokenService
{
    private readonly JwtSettings jwtSettings = jwtSettings.Value;

    public string GenerateAccessToken(User user)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()),
            new Claim(JwtRegisteredClaimNames.UniqueName, user.Username),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
            new Claim(ClaimTypes.Name, user.Username)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: jwtSettings.Issuer,
            audience: jwtSettings.Audience,
            claims: claims,
            expires: dateTimeProvider.UtcNow.AddMinutes(jwtSettings.ExpirationInMinutes),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public RefreshToken GenerateRefreshToken(User user)
    {
        var randomNumber = new byte[64];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);

        return new RefreshToken
        {
            UserId = user.UserId,
            Token = Convert.ToBase64String(randomNumber),
            CreatedAt = dateTimeProvider.UtcNow,
            ExpiresAt = dateTimeProvider.UtcNow.AddDays(7),
            IsRevoked = false
        };
    }
}
