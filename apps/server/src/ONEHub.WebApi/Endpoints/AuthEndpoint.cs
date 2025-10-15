using System.Net;
using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using ONEHub.Application.Commands;
using ONEHub.Application.Services;
using ONEHub.Domain.Extensions;
using ONEHub.Domain.Results;
using ONEHub.WebApi.DTOs.Request;
using ONEHub.WebApi.DTOs.Response;
using ONEHub.WebApi.Extensions;
using ONEHub.WebApi.Filters;

namespace ONEHub.WebApi.Endpoints;

public class AuthEndpoint : IEndpoints
{
    public string GroupName => "Auth";

    public void Map(IEndpointRouteBuilder app)
    {
        var group = app.MapGroup(this);

        group
            .MapPost(Login, "login")
            .AddEndpointFilter<ValidatorFilter<LoginRequest>>();

        group
            .MapPost(RefreshToken, "refresh")
            .AddEndpointFilter<ValidatorFilter<RefreshTokenRequest>>();

        group
            .MapPost(Logout, "logout")
            .RequireAuthorization();
    }

    [Produces("application/json")]
    [ProducesResponseType(typeof(LoginResponse), (int)HttpStatusCode.OK)]
    internal static async Task<IResult> Login(
        LoginRequest request,
        IMediator mediator,
        ILogAggregate logAggregate,
        HttpContext httpContext)
    {
        logAggregate.AppendHeader($"Log Aggregate: Auth Login - UserName: {request.Username}");

        var command = new LoginCommand(request.Username, request.Password);
        var result = await mediator.Send(command);

        return result.Match(
            () =>
            {
                // Set HTTP-only cookies for authentication
                httpContext.Response.SetAuthCookies(result.Result.AccessToken, result.Result.RefreshToken);

                return Results.Ok(new LoginResponse
                {
                    ErrorCode = 0,
                    ErrorMessage = string.Empty,
                    Result = new AuthTokenResult
                    {
                        User = result.Result.User,
                        AccessToken = result.Result.AccessToken,
                        RefreshToken = result.Result.RefreshToken
                    }
                });
            },
            error => Results.Ok(new LoginResponse
            {
                ErrorCode = error.Code,
                ErrorMessage = error.Message
            })
        );
    }

    [Produces("application/json")]
    [ProducesResponseType(typeof(RefreshTokenResponse), (int)HttpStatusCode.OK)]
    internal static async Task<IResult> RefreshToken(
        RefreshTokenRequest request,
        IMediator mediator,
        ILogAggregate logAggregate,
        HttpContext httpContext)
    {
        logAggregate.AppendHeader($"Log Aggregate: Auth Refresh Token - UserId: {request.UserId}");

        var command = new RefreshTokenCommand(request.RefreshToken, request.UserId);
        var result = await mediator.Send(command);

        return result.Match(
            () =>
            {
                // Update HTTP-only cookies for authentication
                httpContext.Response.SetAuthCookies(result.Result.AccessToken, result.Result.RefreshToken);

                return Results.Ok(new RefreshTokenResponse
                {
                    ErrorCode = 0,
                    ErrorMessage = string.Empty,
                    Result = new AuthTokenResult
                    {
                        User = null, // RefreshToken doesn't return user
                        AccessToken = result.Result.AccessToken,
                        RefreshToken = result.Result.RefreshToken
                    }
                });
            },
            error => Results.Ok(new RefreshTokenResponse
            {
                ErrorCode = error.Code,
                ErrorMessage = error.Message
            })
        );
    }

    [Produces("application/json")]
    [ProducesResponseType(typeof(LogoutResponse), (int)HttpStatusCode.OK)]
    internal static IResult Logout(
        HttpContext httpContext,
        ILogAggregate logAggregate)
    {
        var userId = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        logAggregate.AppendHeader($"Log Aggregate: Auth Logout - UserId: {userId ?? "Unknown"}");

        // Clear HTTP-only authentication cookies
        httpContext.Response.ClearAuthCookies();

        return Results.Ok(new LogoutResponse
        {
            ErrorCode = 0,
            ErrorMessage = string.Empty
        });
    }
}
