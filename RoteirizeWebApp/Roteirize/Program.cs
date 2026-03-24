using System.Text;
using FluentValidation;
using InertiaCore.Extensions;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Roteirize.Common.Behaviors;
using Roteirize.Features.Auth;
using Roteirize.Infrastructure.Auth;
using Roteirize.Infrastructure.Data;
using Roteirize.Infrastructure.Data.QueryBuilders;
using Roteirize.Infrastructure.Email;
using Vite.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("appsettings.Local.json", optional: true, reloadOnChange: true);

builder.Services.AddControllersWithViews();
builder.Services.AddInertia();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var jwtSection = builder.Configuration.GetSection("Jwt");
var secretKey = jwtSection["SecretKey"]
    ?? throw new InvalidOperationException("Jwt:SecretKey is not configured. Add it to appsettings.Local.json.");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
            ValidateIssuer = true,
            ValidIssuer = jwtSection["Issuer"],
            ValidateAudience = true,
            ValidAudience = jwtSection["Audience"],
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = ctx =>
            {
                ctx.Token = ctx.Request.Cookies["access_token"];
                return Task.CompletedTask;
            }
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddHttpContextAccessor();

builder.Services.AddMediatR(cfg =>
    cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));

builder.Services.AddValidatorsFromAssembly(typeof(Program).Assembly);
builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

builder.Services.Configure<JwtOptions>(jwtSection);
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<ICookieService, CookieService>();

builder.Services.Configure<EmailOptions>(builder.Configuration.GetSection("Email"));
builder.Services.AddScoped<IEmailService, GmailEmailService>();

builder.Services.AddScoped<UserQueryBuilder>();

builder.Services.AddViteServices(options =>
{
    options.Server.AutoRun = false;
    options.Server.Port = 5173;
    options.Server.PackageDirectory = "ClientApp";
    options.Manifest = ".vite/manifest.json";
});

var app = builder.Build();

app.UseExceptionHandler(errApp => errApp.Run(async ctx =>
{
    ctx.Response.ContentType = "application/json";

    var feature = ctx.Features.Get<IExceptionHandlerFeature>();
    if (feature?.Error is ValidationException ve)
    {
        ctx.Response.StatusCode = 422;
        var errors = ve.Errors
            .GroupBy(e => e.PropertyName)
            .ToDictionary(g => g.Key, g => g.Select(e => e.ErrorMessage).ToArray());
        await ctx.Response.WriteAsJsonAsync(new { errors });
        return;
    }

    ctx.Response.StatusCode = 500;
    await ctx.Response.WriteAsJsonAsync(new { error = "Internal server error." });
}));

if (!app.Environment.IsDevelopment())
    app.UseHsts();

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseInertia();
app.MapStaticAssets();

app.MapLoginEndpoint();
app.MapRegisterEndpoint();
app.MapLogoutEndpoint();
app.MapRefreshTokenEndpoint();
app.MapForgotPasswordEndpoint();
app.MapResetPasswordEndpoint();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
