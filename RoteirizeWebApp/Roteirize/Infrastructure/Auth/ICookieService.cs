namespace Roteirize.Infrastructure.Auth;

public interface ICookieService
{
    void SetAccessToken(HttpContext context, string token);
    void SetRefreshToken(HttpContext context, string token);
    void ClearAuthCookies(HttpContext context);
    string? GetRefreshToken(HttpContext context);
}
