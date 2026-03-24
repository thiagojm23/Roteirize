namespace Roteirize.Domain.Entities;

public class AuthToken
{
    public Guid Id { get; private set; }
    public Guid UserId { get; private set; }
    public string Token { get; private set; } = string.Empty;
    public AuthTokenType Type { get; private set; }
    public DateTime ExpiresAt { get; private set; }
    public bool IsRevoked { get; private set; }
    public DateTime CreatedAt { get; private set; }

    public User User { get; private set; } = null!;

    private AuthToken() { }

    public static AuthToken Create(Guid userId, string token, AuthTokenType type, DateTime expiresAt)
    {
        return new AuthToken
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            Token = token,
            Type = type,
            ExpiresAt = expiresAt,
            IsRevoked = false,
            CreatedAt = DateTime.UtcNow
        };
    }

    public void Revoke() => IsRevoked = true;

    public bool IsValid() => !IsRevoked && ExpiresAt > DateTime.UtcNow;
}

public enum AuthTokenType
{
    RefreshToken = 1,
    PasswordReset = 2
}
