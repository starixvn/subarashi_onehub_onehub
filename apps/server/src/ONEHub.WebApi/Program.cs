using ONEHub.WebApi.Startup;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog();

builder.Services.AddDependencyInjection(builder.Configuration);

var app = builder.Build();

app.UseForwardedHeaders();
app.ConfigureHealthCheck();

app.UseHttpsRedirection();

app.UseWhen(
    context => context.Request.Path.StartsWithSegments("/api"),
    applicationBuilder => applicationBuilder.UseHttpLogging());

app.ConfigureExceptionHandler(builder.Configuration);

app.UseCors();

app.ConfigureSwagger(builder.Configuration);

app.UseRouting();

app.UseAuthorization();

app.MapGet("/", () => "ONEHub is running...");

app.UseEndpoints(_ => { });

app.UseRequestLocalization();

app.MapEndpoints();

app.Run();
