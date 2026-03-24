using MediatR;
using Microsoft.EntityFrameworkCore;
using Roteirize.Common.Results;
using Roteirize.Infrastructure.Auth;
using Roteirize.Infrastructure.Data;

namespace Roteirize.Features.Auth;

// --- Command ---
public record LogoutCommand : IRequest<Result>;

// --- Handler ---
public class LogoutHandler(
    AppDbContext db,
    ICookieService cookieService,
    IHttpContextAccessor httpContextAccessor
) : IRequestHandler<LogoutCommand, Result>
{
    public async Task<Result> Handle(LogoutCommand request, CancellationToken ct)
    {
        var ctx = httpContextAccessor.HttpContext!;
        var refreshTokenValue = cookieService.GetRefreshToken(ctx);

        if (refreshTokenValue is not null)
        {
            var token = await db.AuthTokens
                .FirstOrDefaultAsync(t => t.Token == refreshTokenValue, ct);

            if (token is not null)
            {
                token.Revoke();
                await db.SaveChangesAsync(ct);
            }
        }

        cookieService.ClearAuthCookies(ctx);
        return Result.Success();
    }
}

// --- Endpoint ---
public static class LogoutEndpoint
{
    public static IEndpointRouteBuilder MapLogoutEndpoint(this IEndpointRouteBuilder app)
    {
        app.MapPost("/auth/logout", async (ISender sender) =>
        {
            var result = await sender.Send(new LogoutCommand());
            return result.ToHttpResult();
        })
        .WithName("Logout")
        .RequireAuthorization();

        return app;
    }
}
