using MediatR;
using Microsoft.EntityFrameworkCore;
using Roteirize.Common.Exceptions;
using Roteirize.Common.Results;
using Roteirize.Domain.Entities;
using Roteirize.Infrastructure.Auth;
using Roteirize.Infrastructure.Data;

namespace Roteirize.Features.Auth;

// --- Command ---
public record RefreshTokenCommand : IRequest<Result<RefreshTokenResponse>>;

public record RefreshTokenResponse(Guid UserId, string Name, string Email);

// --- Handler ---
public class RefreshTokenHandler(
    AppDbContext db,
    IJwtService jwtService,
    ICookieService cookieService,
    IHttpContextAccessor httpContextAccessor
) : IRequestHandler<RefreshTokenCommand, Result<RefreshTokenResponse>>
{
    public async Task<Result<RefreshTokenResponse>> Handle(RefreshTokenCommand request, CancellationToken ct)
    {
        var ctx = httpContextAccessor.HttpContext!;
        var refreshTokenValue = cookieService.GetRefreshToken(ctx);

        if (string.IsNullOrEmpty(refreshTokenValue))
            return Result<RefreshTokenResponse>.Failure(AppException.Unauthorized("Refresh token not found."));

        var token = await db.AuthTokens
            .Include(t => t.User)
            .FirstOrDefaultAsync(t => t.Token == refreshTokenValue && t.Type == AuthTokenType.RefreshToken, ct);

        if (token is null || !token.IsValid())
            return Result<RefreshTokenResponse>.Failure(AppException.Unauthorized("Invalid or expired refresh token."));

        token.Revoke();

        var newAccessToken = jwtService.GenerateAccessToken(token.User);
        var (newRefreshTokenValue, newRefreshTokenExpiry) = jwtService.GenerateRefreshToken();

        var newRefreshToken = AuthToken.Create(
            token.UserId,
            newRefreshTokenValue,
            AuthTokenType.RefreshToken,
            newRefreshTokenExpiry);

        db.AuthTokens.Add(newRefreshToken);
        await db.SaveChangesAsync(ct);

        cookieService.SetAccessToken(ctx, newAccessToken);
        cookieService.SetRefreshToken(ctx, newRefreshTokenValue);

        return Result<RefreshTokenResponse>.Success(
            new RefreshTokenResponse(token.User.Id, token.User.Name, token.User.Email));
    }
}

// --- Endpoint ---
public static class RefreshTokenEndpoint
{
    public static IEndpointRouteBuilder MapRefreshTokenEndpoint(this IEndpointRouteBuilder app)
    {
        app.MapPost("/auth/refresh", async (ISender sender) =>
        {
            var result = await sender.Send(new RefreshTokenCommand());
            return result.ToHttpResult();
        })
        .WithName("RefreshToken")
        .AllowAnonymous();

        return app;
    }
}
