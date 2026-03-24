using Microsoft.EntityFrameworkCore;

namespace Roteirize.Infrastructure.Data.QueryBuilders;

public abstract class BaseQueryBuilder<TEntity>(DbContext context) where TEntity : class
{
    public IQueryable<TEntity> Query { get; protected set; } = context.Set<TEntity>();

    public async Task<TEntity?> GetByIdAsync(Guid id, CancellationToken ct = default)
        => await Query.FirstOrDefaultAsync(e => EF.Property<Guid>(e, "Id") == id, ct);

    public async Task<List<TEntity>> ToListAsync(CancellationToken ct = default)
        => await Query.ToListAsync(ct);
}
