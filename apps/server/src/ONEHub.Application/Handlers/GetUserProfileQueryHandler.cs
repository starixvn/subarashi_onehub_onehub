using MediatR;
using ONEHub.Application.Queries;
using ONEHub.Domain.Errors;
using ONEHub.Domain.Repositories;
using ONEHub.Domain.Results;

namespace ONEHub.Application.Handlers;

public sealed class GetUserProfileQueryHandler(IAuthRepository authRepository)
    : IRequestHandler<GetUserProfileQuery, ServiceResult<UserProfileResult>>
{
    public async Task<ServiceResult<UserProfileResult>> Handle(GetUserProfileQuery request, CancellationToken cancellationToken)
    {
        var user = await authRepository.GetUserByIdAsync(request.UserId, cancellationToken);

        if (user == null)
        {
            return ServiceResult<UserProfileResult>.Failure(AuthenticationError.UserNotFound);
        }

        var userProfileResult = new UserProfileResult
        {
            UserId = user.UserId,
            Username = user.Username,
            Email = user.Email,
            Avatar = user.Avatar
        };

        return ServiceResult<UserProfileResult>.Success(userProfileResult);
    }
}
