namespace ONEHub.WebApi.Endpoints;

public interface IEndpoints
{
    string GroupName { get; }

    void Map(IEndpointRouteBuilder app);
}
