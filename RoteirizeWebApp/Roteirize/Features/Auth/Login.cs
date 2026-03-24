using FluentValidation;
using JetBrains.Annotations;
using MediatR;
using Roteirize.Common.Exceptions;
using Roteirize.Common.Results;
using Roteirize.Domain.Entities;
using Roteirize.Infrastructure.Auth;
using Roteirize.Infrastructure.Data;
using Roteirize.Infrastructure.Data.QueryBuilders;

namespace Roteirize.Features.Auth;

[UsedImplicitly]
public record LoginCommand(string Email, string Password) : IRequest<Result<LoginResponse>>;

[UsedImplicitly]
public record LoginResponse(Guid UserId, string Name, string Email);

[UsedImplicitly]
public class LoginCommandValidator : AbstractValidator<LoginCommand>
{
    public LoginCommandValidator()
    {
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.Password).NotEmpty();
    }
}

public class LoginHandler(
    AppDbContext db,
    UserQueryBuilder userQueryBuilder,
    IJwtService jwtService,
    ICookieService cookieService,
    IHttpContextAccessor httpContextAccessor
) : IRequestHandler<LoginCommand, Result<LoginResponse>>
{
    public async Task<Result<LoginResponse>> Handle(LoginCommand request, CancellationToken ct)
    {
        var user = await userQueryBuilder
            .AsNoTracking()
            .GetByEmailAsync(request.Email, ct);

        if (user is null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            return Result<LoginResponse>.Failure(AppException.Unauthorized("E-mail ou senha inválidos."));

        var accessToken = jwtService.GenerateAccessToken(user);
        var (refreshTokenValue, refreshTokenExpiry) = jwtService.GenerateRefreshToken();

        var refreshToken = AuthToken.Create(user.Id, refreshTokenValue, AuthTokenType.RefreshToken, refreshTokenExpiry);
        db.AuthTokens.Add(refreshToken);
        await db.SaveChangesAsync(ct);

        var ctx = httpContextAccessor.HttpContext!;
        cookieService.SetAccessToken(ctx, accessToken);
        cookieService.SetRefreshToken(ctx, refreshTokenValue);

        return Result<LoginResponse>.Success(new LoginResponse(user.Id, user.Name, user.Email));
    }
}

public static class LoginEndpoint
{
    public static void MapLoginEndpoint(this IEndpointRouteBuilder app)
    {
        app.MapPost("/auth/login", async (LoginCommand command, ISender sender) =>
        {
            var result = await sender.Send(command);
            return result.ToHttpResult();
        })
        .WithName("Login")
        .AllowAnonymous();
    }
}
