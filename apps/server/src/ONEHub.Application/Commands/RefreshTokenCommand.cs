using MediatR;
using ONEHub.Domain.Results;

namespace ONEHub.Application.Commands;

public sealed record RefreshTokenCommand(string RefreshToken, int UserId) : IRequest<ServiceResult<RefreshTokenResult>>;

public sealed record RefreshTokenResult(string AccessToken, string RefreshToken);
