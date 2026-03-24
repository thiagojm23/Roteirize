using FluentValidation;
using MediatR;
using Roteirize.Common.Exceptions;
using Roteirize.Common.Results;
using Roteirize.Domain.Entities;
using Roteirize.Infrastructure.Auth;
using Roteirize.Infrastructure.Data;
using Roteirize.Infrastructure.Data.QueryBuilders;

namespace Roteirize.Features.Auth;

// --- Command ---
public record RegisterCommand(string Name, string Email, string Password) : IRequest<Result<RegisterResponse>>;

public record RegisterResponse(Guid UserId, string Name, string Email);

// --- Validator ---
public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
{
    public RegisterCommandValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Email).NotEmpty().EmailAddress().MaximumLength(200);
        RuleFor(x => x.Password).NotEmpty().MinimumLength(8)
            .Matches(@"[A-Z]").WithMessage("Password must contain at least one uppercase letter.")
            .Matches(@"[0-9]").WithMessage("Password must contain at least one number.");
    }
}

// --- Handler ---
public class RegisterHandler(
    AppDbContext db,
    UserQueryBuilder userQueryBuilder,
    IJwtService jwtService,
    ICookieService cookieService,
    IHttpContextAccessor httpContextAccessor
) : IRequestHandler<RegisterCommand, Result<RegisterResponse>>
{
    public async Task<Result<RegisterResponse>> Handle(RegisterCommand request, CancellationToken ct)
    {
        var existing = await userQueryBuilder
            .AsNoTracking()
            .GetByEmailAsync(request.Email, ct);

        if (existing is not null)
            return Result<RegisterResponse>.Failure(AppException.Conflict("This email is already in use."));

        var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
        var user = User.Create(request.Name, request.Email, passwordHash);
        db.Users.Add(user);

        var accessToken = jwtService.GenerateAccessToken(user);
        var (refreshTokenValue, refreshTokenExpiry) = jwtService.GenerateRefreshToken();

        var refreshToken = AuthToken.Create(user.Id, refreshTokenValue, AuthTokenType.RefreshToken, refreshTokenExpiry);
        db.AuthTokens.Add(refreshToken);
        await db.SaveChangesAsync(ct);

        var ctx = httpContextAccessor.HttpContext!;
        cookieService.SetAccessToken(ctx, accessToken);
        cookieService.SetRefreshToken(ctx, refreshTokenValue);

        return Result<RegisterResponse>.Success(new RegisterResponse(user.Id, user.Name, user.Email));
    }
}

// --- Endpoint ---
public static class RegisterEndpoint
{
    public static IEndpointRouteBuilder MapRegisterEndpoint(this IEndpointRouteBuilder app)
    {
        app.MapPost("/auth/register", async (RegisterCommand command, ISender sender) =>
        {
            var result = await sender.Send(command);
            return result.ToHttpResult();
        })
        .WithName("Register")
        .AllowAnonymous();

        return app;
    }
}
