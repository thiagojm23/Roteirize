using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Roteirize.Common.Exceptions;
using Roteirize.Common.Results;
using Roteirize.Domain.Entities;
using Roteirize.Infrastructure.Data;

namespace Roteirize.Features.Auth;

// --- Command ---
public record ResetPasswordCommand(string Token, string NewPassword, string ConfirmPassword) : IRequest<Result>;

// --- Validator ---
public class ResetPasswordCommandValidator : AbstractValidator<ResetPasswordCommand>
{
    public ResetPasswordCommandValidator()
    {
        RuleFor(x => x.Token).NotEmpty();
        RuleFor(x => x.NewPassword).NotEmpty().MinimumLength(8)
            .Matches(@"[A-Z]").WithMessage("Password must contain at least one uppercase letter.")
            .Matches(@"[0-9]").WithMessage("Password must contain at least one number.");
        RuleFor(x => x.ConfirmPassword)
            .Equal(x => x.NewPassword).WithMessage("Passwords do not match.");
    }
}

// --- Handler ---
public class ResetPasswordHandler(AppDbContext db) : IRequestHandler<ResetPasswordCommand, Result>
{
    public async Task<Result> Handle(ResetPasswordCommand request, CancellationToken ct)
    {
        var token = await db.AuthTokens
            .Include(t => t.User)
            .FirstOrDefaultAsync(t =>
                t.Token == request.Token &&
                t.Type == AuthTokenType.PasswordReset, ct);

        if (token is null || !token.IsValid())
            return Result.Failure(AppException.BadRequest("Invalid or expired reset token."));

        token.User.UpdatePassword(BCrypt.Net.BCrypt.HashPassword(request.NewPassword));
        token.Revoke();

        await db.SaveChangesAsync(ct);

        return Result.Success();
    }
}

// --- Endpoint ---
public static class ResetPasswordEndpoint
{
    public static IEndpointRouteBuilder MapResetPasswordEndpoint(this IEndpointRouteBuilder app)
    {
        app.MapPost("/auth/reset-password", async (ResetPasswordCommand command, ISender sender) =>
        {
            var result = await sender.Send(command);
            return result.ToHttpResult();
        })
        .WithName("ResetPassword")
        .AllowAnonymous();

        return app;
    }
}
