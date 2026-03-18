using InertiaCore.Extensions;
using Vite.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddInertia();
builder.Services.AddViteServices(options =>
{
    options.Server.AutoRun = false;
    options.Server.Port = 5173;
    options.Server.PackageDirectory = "ClientApp";
    options.Manifest = ".vite/manifest.json";
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
else
{
    app.UseViteDevelopmentServer(true);
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();
app.UseInertia();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
