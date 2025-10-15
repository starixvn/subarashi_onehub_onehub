using MediatR;
using ONEHub.Domain.Results;

namespace ONEHub.Application.Commands;

public sealed record LoginCommand(string Username, string Password) : IRequest<ServiceResult<LoginResult>>;

public sealed record LoginResult(UserProfileResult User, string AccessToken, string RefreshToken);
