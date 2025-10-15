using System.Net;
using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using ONEHub.Application.Queries;
using ONEHub.Domain.Extensions;
using ONEHub.WebApi.DTOs.Response;
using ONEHub.WebApi.Extensions;

namespace ONEHub.WebApi.Endpoints;

public class UserEndpoint : IEndpoints
{
    public string GroupName => "user";

    public void Map(IEndpointRouteBuilder app)
    {
        var group = app.MapGroup(this);

        group
            .MapGet(GetProfile)
            .RequireAuthorization();
    }

    [Produces("application/json")]
    [ProducesResponseType(typeof(UserProfileResponse), (int)HttpStatusCode.OK)]
    internal static async Task<IResult> GetProfile(HttpContext httpContext, IMediator mediator)
    {
        var userId = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userId) || !int.TryParse(userId, out var userIdInt))
        {
            return Results.Ok(new UserProfileResponse
            {
                ErrorCode = 401,
                ErrorMessage = "Unauthorized: User ID not found in token"
            });
        }

        var query = new GetUserProfileQuery(userIdInt);
        var result = await mediator.Send(query);

        return result.Match(
            () => Results.Ok(new UserProfileResponse
            {
                ErrorCode = 0,
                ErrorMessage = string.Empty,
                Result = result.Result
            }),
            error => Results.Ok(new UserProfileResponse
            {
                ErrorCode = error.Code,
                ErrorMessage = error.Message
            })
        );
    }
}
