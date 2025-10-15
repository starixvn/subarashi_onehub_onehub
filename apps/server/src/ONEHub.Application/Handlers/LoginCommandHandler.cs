using MediatR;
using ONEHub.Application.Commands;
using ONEHub.Application.Services;
using ONEHub.Domain.Entities;
using ONEHub.Domain.Errors;
using ONEHub.Domain.Repositories;
using ONEHub.Domain.Results;

namespace ONEHub.Application.Handlers;

public sealed class LoginCommandHandler(
    IAuthRepository authRepository,
    ITokenService tokenService)
    : IRequestHandler<LoginCommand, ServiceResult<LoginResult>>
{
    public async Task<ServiceResult<LoginResult>> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        // Get user by username
        var user = await authRepository.GetUserByUsernameAsync(request.Username, cancellationToken);

        if (user == null)
        {
            return ServiceResult<LoginResult>.Failure(AuthenticationError.InvalidCredentials);
        }

        // Verify password using repository method
        bool isPasswordValid = authRepository.VerifyPassword(request.Password, user.PasswordHash);

        if (!isPasswordValid)
        {
            return ServiceResult<LoginResult>.Failure(AuthenticationError.InvalidCredentials);
        }

        // Generate JWT access token and refresh token
        string accessToken = tokenService.GenerateAccessToken(user);
        RefreshToken refreshTokenEntity = tokenService.GenerateRefreshToken(user);

        // Store refresh token in repository
        await authRepository.StoreRefreshTokenAsync(refreshTokenEntity, cancellationToken);

        // Map User entity to UserProfileResult (exclude PasswordHash for security)
        var userProfile = new UserProfileResult
        {
            UserId = user.UserId,
            Username = user.Username,
            Email = user.Email,
            Avatar = user.Avatar
        };

        var loginResult = new LoginResult(userProfile, accessToken, refreshTokenEntity.Token);

        return ServiceResult<LoginResult>.Success(loginResult);
    }
}
