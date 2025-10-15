namespace ONEHub.WebApi.Extensions;

public static class HttpResponseExtensions
{
    public static void SetAuthCookies(this HttpResponse response, string accessToken, string refreshToken)
    {
        // Set HTTP-only cookie with access token
        response.Cookies.Append("AuthToken", accessToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Path = "/"
        });

        // Set HTTP-only cookie with refresh token
        response.Cookies.Append("RefreshToken", refreshToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Path = "/"
        });
    }

    public static void ClearAuthCookies(this HttpResponse response)
    {
        // Clear authentication cookies by deleting them
        response.Cookies.Delete("AuthToken");
        response.Cookies.Delete("RefreshToken");
    }
}
