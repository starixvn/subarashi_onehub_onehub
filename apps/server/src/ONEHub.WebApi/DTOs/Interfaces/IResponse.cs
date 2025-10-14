namespace ONEHub.WebApi.DTOs.Interfaces;

public interface IResponse<T> where T : class
{
    public int ErrorCode { get; set; }

    public string ErrorMessage { get; set; }

    public T Result { get; set; }
}

public interface IResponse
{
    public int ErrorCode { get; set; }

    public string ErrorMessage { get; set; }
}
