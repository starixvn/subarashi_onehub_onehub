using System.Net;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using ONEHub.Application.Services;
using ONEHub.WebApi.DTOs.Request;
using ONEHub.WebApi.DTOs.Response;
using ONEHub.WebApi.Extensions;
using ONEHub.WebApi.Filters;

namespace ONEHub.WebApi.Endpoints;

public class AuthEndpoint : IEndpoints
{
    public string GroupName => nameof(AuthEndpoint);

    public void Map(IEndpointRouteBuilder app)
    {
        var group = app.MapGroup(this);

        group
            .MapPost(Login)
            .AddEndpointFilter<ValidatorFilter<LoginResponse>>();
    }

    [Produces("application/json")]
    [ProducesResponseType(typeof(LoginResponse), (int)HttpStatusCode.OK)]
    internal static async Task<IResult> Login(
        LoginRequest request,
        IMediator mediator,
        ILogAggregate logAggregate)
    {
        logAggregate.AppendHeader($"Log Aggregate: Licensee Create Player - UserName: {request.Username}");
        var result = await mediator.Send(command);


        return result.Match(
            _ => Results.Ok(new LoginResponse
            {
                ErrorCode = 0,
                ErrorMessage = string.Empty,
                Result = result.Result
            }),
            (error, _) => Results.Ok(new LoginResponse
            {
                ErrorCode = error.Code,
                ErrorMessage = error.Message
            })
        );

    }
}
