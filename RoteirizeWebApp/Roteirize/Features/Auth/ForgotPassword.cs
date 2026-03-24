using System.Security.Cryptography;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Roteirize.Common.Results;
using Roteirize.Domain.Entities;
using Roteirize.Infrastructure.Data;
using Roteirize.Infrastructure.Data.QueryBuilders;
using Roteirize.Infrastructure.Email;

namespace Roteirize.Features.Auth;

// --- Command ---
public record ForgotPasswordCommand(string Email) : IRequest<Result>;

// --- Validator ---
public class ForgotPasswordCommandValidator : AbstractValidator<ForgotPasswordCommand>
{
    public ForgotPasswordCommandValidator()
    {
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
    }
}

// --- Handler ---
public class ForgotPasswordHandler(
    AppDbContext db,
    UserQueryBuilder userQueryBuilder,
    IEmailService emailService
) : IRequestHandler<ForgotPasswordCommand, Result>
{
    public async Task<Result> Handle(ForgotPasswordCommand request, CancellationToken ct)
    {
        var user = await userQueryBuilder
            .AsNoTracking()
            .GetByEmailAsync(request.Email, ct);

        // Always return success to prevent email enumeration attacks
        if (user is null)
            return Result.Success();

        // Revoke any existing password reset tokens
        var existingTokens = await db.AuthTokens
            .Where(t => t.UserId == user.Id && t.Type == AuthTokenType.PasswordReset && !t.IsRevoked)
            .ToListAsync(ct);

        foreach (var t in existingTokens)
            t.Revoke();

        var rawToken = Convert.ToBase64String(RandomNumberGenerator.GetBytes(48));
        var resetToken = AuthToken.Create(
            user.Id,
            rawToken,
            AuthTokenType.PasswordReset,
            DateTime.UtcNow.AddHours(1));

        db.AuthTokens.Add(resetToken);
        await db.SaveChangesAsync(ct);

        await emailService.SendPasswordResetEmailAsync(user.Email, user.Name, rawToken, ct);

        return Result.Success();
    }
}

// --- Endpoint ---
public static class ForgotPasswordEndpoint
{
    public static IEndpointRouteBuilder MapForgotPasswordEndpoint(this IEndpointRouteBuilder app)
    {
        app.MapPost("/auth/forgot-password", async (ForgotPasswordCommand command, ISender sender) =>
        {
            var result = await sender.Send(command);
            return result.ToHttpResult();
        })
        .WithName("ForgotPassword")
        .AllowAnonymous();

        return app;
    }
}
