using System.Net;
using Microsoft.AspNetCore.Diagnostics;
using ONEHub.WebApi.Utils;

namespace ONEHub.WebApi.ExceptionHandler;

public sealed class GlobalExceptionHandler(ILogger logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext? httpContext, Exception exception, CancellationToken cancellationToken)
    {
        var errorMsg = ErrorMessageUtils.GenerateMessage(exception, httpContext);
        logger.LogError(errorMsg, exception);

        httpContext.Response.Clear();
        httpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        httpContext.Response.ContentType = "application/json";

        var result = new
        {
            code = 500,
            type = "",
            message = "An internal server error occurred while a request was processed."
        };

        await httpContext.Response.WriteAsJsonAsync(result, cancellationToken);
        return true;
    }
}
