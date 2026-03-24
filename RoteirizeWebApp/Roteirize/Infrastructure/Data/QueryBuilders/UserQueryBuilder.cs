using Microsoft.EntityFrameworkCore;
using Roteirize.Domain.Entities;

namespace Roteirize.Infrastructure.Data.QueryBuilders;

public class UserFilter
{
    public string? Email { get; init; }
    public string? Name { get; init; }
}

public class UserQueryBuilder(AppDbContext context) : BaseQueryBuilder<User>(context)
{
    public UserQueryBuilder AsNoTracking() { Query = Query.AsNoTracking(); return this; }

    public UserQueryBuilder WithAuthTokens() { Query = Query.Include(u => u.AuthTokens); return this; }

    public UserQueryBuilder WithActiveRefreshTokens()
    {
        Query = Query.Include(u => u.AuthTokens
            .Where(t => t.Type == AuthTokenType.RefreshToken && !t.IsRevoked && t.ExpiresAt > DateTime.UtcNow));
        return this;
    }

    public UserQueryBuilder ApplyFilter(UserFilter? filter)
    {
        if (filter is null) return this;

        if (!string.IsNullOrWhiteSpace(filter.Email))
            Query = Query.Where(u => u.Email == filter.Email);

        if (!string.IsNullOrWhiteSpace(filter.Name))
            Query = Query.Where(u => u.Name.Contains(filter.Name));

        return this;
    }

    public async Task<User?> GetByEmailAsync(string email, CancellationToken ct = default)
        => await Query.FirstOrDefaultAsync(u => u.Email == email, ct);
}
