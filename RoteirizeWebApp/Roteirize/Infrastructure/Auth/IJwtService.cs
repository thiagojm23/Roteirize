using Roteirize.Domain.Entities;

namespace Roteirize.Infrastructure.Auth;

public interface IJwtService
{
    string GenerateAccessToken(User user);
    (string Token, DateTime ExpiresAt) GenerateRefreshToken();
    Guid? ValidateAccessToken(string token);
}
