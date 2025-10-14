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

app.ConfigureSwagger(builder.Configuration);

app.UseRouting();

app.UseCors();

app.UseRequestLocalization();

// Serve static files from wwwroot
app.UseDefaultFiles();
app.UseStaticFiles();

app.MapEndpoints();

// SPA fallback - serve index.html for client-side routing
app.MapFallbackToFile("index.html");

app.Run();
