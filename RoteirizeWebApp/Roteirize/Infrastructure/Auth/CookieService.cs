namespace Roteirize.Infrastructure.Auth;

public class CookieService : ICookieService
{
    private const string AccessTokenCookie = "access_token";
    private const string RefreshTokenCookie = "refresh_token";

    public void SetAccessToken(HttpContext context, string token)
    {
        context.Response.Cookies.Append(AccessTokenCookie, token, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTimeOffset.UtcNow.AddMinutes(45),
            Path = "/"
        });
    }

    public void SetRefreshToken(HttpContext context, string token)
    {
        context.Response.Cookies.Append(RefreshTokenCookie, token, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTimeOffset.UtcNow.AddDays(2),
            Path = "/auth"   // refresh token only sent on /auth/* requests
        });
    }

    public void ClearAuthCookies(HttpContext context)
    {
        context.Response.Cookies.Delete(AccessTokenCookie, new CookieOptions { Path = "/" });
        context.Response.Cookies.Delete(RefreshTokenCookie, new CookieOptions { Path = "/auth" });
    }

    public string? GetRefreshToken(HttpContext context)
        => context.Request.Cookies[RefreshTokenCookie];
}
