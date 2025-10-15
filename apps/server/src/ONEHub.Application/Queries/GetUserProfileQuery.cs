using MediatR;
using ONEHub.Domain.Results;

namespace ONEHub.Application.Queries;

public sealed record GetUserProfileQuery(int UserId) : IRequest<ServiceResult<UserProfileResult>>;
