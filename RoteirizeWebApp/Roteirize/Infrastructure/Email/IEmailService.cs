namespace Roteirize.Infrastructure.Email;

public interface IEmailService
{
    Task SendPasswordResetEmailAsync(string toEmail, string toName, string resetToken, CancellationToken ct = default);
}
