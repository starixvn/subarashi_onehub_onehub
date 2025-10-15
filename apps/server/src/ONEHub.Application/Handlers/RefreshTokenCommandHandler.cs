using MediatR;
using ONEHub.Application.Commands;
using ONEHub.Application.Services;
using ONEHub.Domain.Errors;
using ONEHub.Domain.Repositories;
using ONEHub.Domain.Results;

namespace ONEHub.Application.Handlers;

public sealed class RefreshTokenCommandHandler(
    IAuthRepository authRepository,
    ITokenService tokenService)
    : IRequestHandler<RefreshTokenCommand, ServiceResult<RefreshTokenResult>>
{
    public async Task<ServiceResult<RefreshTokenResult>> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        // Validate refresh token from repository
        var storedToken = await authRepository.GetRefreshTokenAsync(request.UserId, request.RefreshToken, cancellationToken);

        if (storedToken == null)
        {
            return ServiceResult<RefreshTokenResult>.Failure(AuthenticationError.InvalidToken);
        }

        // Get user by ID
        var user = await authRepository.GetUserByIdAsync(request.UserId, cancellationToken);

        if (user == null)
        {
            return ServiceResult<RefreshTokenResult>.Failure(AuthenticationError.UserNotFound);
        }

        // Generate new access token (keep same refresh token)
        string newAccessToken = tokenService.GenerateAccessToken(user);

        // Revoke all expired refresh tokens for the user
        await authRepository.RevokeAllExpiredUserRefreshTokensAsync(request.UserId, cancellationToken);

        var result = new RefreshTokenResult(newAccessToken, request.RefreshToken);

        return ServiceResult<RefreshTokenResult>.Success(result);
    }
}
