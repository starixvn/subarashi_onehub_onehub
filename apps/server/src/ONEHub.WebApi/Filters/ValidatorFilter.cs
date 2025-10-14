using ONEHub.WebApi.Utils;

namespace ONEHub.WebApi.Filters;

public class ValidatorFilter<T> : IEndpointFilter where T : class
{
    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        var entity = context.Arguments.OfType<T>().FirstOrDefault(a => a?.GetType() == typeof(T));

        if (entity is null)
        {
            return Results.BadRequest(new
            {
                code = 400,
                type = "INVALID_PARAMETER_VALUE",
                message = "Invalid value or required parameter list: Request parameters are null."
            });
        }

        var (isValid, validationResults) = RequestValidator.IsValidRequest(entity);

        if (isValid)
        {
            return await next(context);
        }

        return Results.BadRequest(new
        {
            code = 400,
            type = "INVALID_PARAMETER_VALUE",
            message = $"Invalid value or required parameter list: {RequestValidator.GetInvalidParamList(validationResults)}"
        });
    }
}
