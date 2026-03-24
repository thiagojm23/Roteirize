using InertiaCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Roteirize.Features.Dashboard;

// [Authorize]
public class DashboardController : Controller
{
    [HttpGet("/app")]
    public IActionResult Index()
    {
        // Mock data for initial rendering
        var itineraries = new[]
        {
            new
            {
                id = "1",
                title = "Rio de Janeiro → Búzios",
                status = "planning",
                startDate = "2026-04-15",
                endDate = "2026-04-22",
                ownerId = "user-1",
                destinations = new[]
                {
                    new { id = "d1", name = "Rio de Janeiro", country = "Brasil", lat = -22.9068, lng = -43.1729, durationDays = 3, order = 1 },
                    new { id = "d2", name = "Búzios", country = "Brasil", lat = -22.7469, lng = -41.8817, durationDays = 4, order = 2 },
                }
            },
            new
            {
                id = "2",
                title = "Lisboa → Porto",
                status = "draft",
                startDate = "2026-06-01",
                endDate = "2026-06-10",
                ownerId = "user-1",
                destinations = new[]
                {
                    new { id = "d3", name = "Lisboa", country = "Portugal", lat = 38.7223, lng = -9.1393, durationDays = 5, order = 1 },
                    new { id = "d4", name = "Porto", country = "Portugal", lat = 41.1579, lng = -8.6291, durationDays = 4, order = 2 },
                }
            }
        };

        return Inertia.Render("Dashboard/Index", new
        {
            user = new { id = "user-1", name = "João", email = "joao@example.com" },
            itineraries,
            collaborations = 0
        });
    }
}
