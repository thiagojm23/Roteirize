using InertiaCore;
using Microsoft.AspNetCore.Mvc;

namespace Roteirize.Features.Home;

public class HomeController : Controller
{
    [HttpGet("/")]
    public IActionResult Index()
    {
        return Inertia.Render("Home/Index", new { title = "Roteirize" });
    }
}
