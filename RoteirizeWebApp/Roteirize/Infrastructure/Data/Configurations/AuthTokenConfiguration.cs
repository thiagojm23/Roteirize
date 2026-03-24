using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Roteirize.Domain.Entities;

namespace Roteirize.Infrastructure.Data.Configurations;

public class AuthTokenConfiguration : IEntityTypeConfiguration<AuthToken>
{
    public void Configure(EntityTypeBuilder<AuthToken> builder)
    {
        builder.ToTable("AuthTokens");
        builder.HasKey(t => t.Id);

        builder.Property(t => t.Token).IsRequired().HasMaxLength(500);
        builder.HasIndex(t => t.Token);
        builder.Property(t => t.Type).IsRequired();
        builder.Property(t => t.ExpiresAt).IsRequired();
        builder.Property(t => t.IsRevoked).IsRequired().HasDefaultValue(false);
        builder.Property(t => t.CreatedAt).IsRequired();
    }
}
