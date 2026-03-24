using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace Roteirize.Infrastructure.Email;

public class GmailEmailService(IOptions<EmailOptions> options) : IEmailService
{
    private readonly EmailOptions _options = options.Value;

    public async Task SendPasswordResetEmailAsync(string toEmail, string toName, string resetToken, CancellationToken ct = default)
    {
        var resetLink = $"{_options.AppBaseUrl}/redefinir-senha?token={Uri.EscapeDataString(resetToken)}";

        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(_options.FromName, _options.FromAddress));
        message.To.Add(new MailboxAddress(toName, toEmail));
        message.Subject = "Redefinição de senha - Roteirize";

        var body = new BodyBuilder
        {
            HtmlBody = $"""
                <h2>Redefinição de senha</h2>
                <p>Olá, {toName}!</p>
                <p>Você solicitou a redefinição da sua senha. Clique no link abaixo para criar uma nova senha:</p>
                <p><a href="{resetLink}">Redefinir senha</a></p>
                <p>Este link expira em 1 hora.</p>
                <p>Se você não solicitou a redefinição, ignore este e-mail.</p>
                """,
            TextBody = $"Acesse o link para redefinir sua senha: {resetLink}\nEste link expira em 1 hora."
        };

        message.Body = body.ToMessageBody();

        using var client = new SmtpClient();
        await client.ConnectAsync(_options.SmtpHost, _options.SmtpPort, SecureSocketOptions.StartTls, ct);
        await client.AuthenticateAsync(_options.Username, _options.Password, ct);
        await client.SendAsync(message, ct);
        await client.DisconnectAsync(true, ct);
    }
}
