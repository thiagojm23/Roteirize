using InertiaCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Roteirize.Features.Itinerary;

[Authorize]
public class ItineraryController : Controller
{
    [HttpGet("/app/itineraries")]
    public IActionResult List()
    {
        var itineraries = new List<string>();
        return Inertia.Render("Itinerary/List", new { itineraries });
    }

    [HttpGet("/app/itineraries/new")]
    public IActionResult Create()
    {
        return Inertia.Render("Itinerary/Create");
    }

    [HttpPost("/app/itineraries")]
    public IActionResult Store()
    {
        return Redirect("/app/itineraries");
    }

    [HttpGet("/app/itineraries/{id}")]
    public IActionResult Plan(string id)
    {
        var itinerary = new List<string>();
        var dayPlans = new List<string>();
        var costSummary = new List<string>();
        var budget = 0m;
        
        return Inertia.Render("Itinerary/Plan", new
        {
            itinerary,
            dayPlans,
            costSummary,
            budget
        });
    }

    [HttpPost("/app/itineraries/{id}/days/{dayNumber}/entries")]
    public IActionResult AddEntry(string id, int dayNumber)
    {
        // TODO: Implement real entry creation
        return Redirect($"/app/itineraries/{id}");
    }

    [HttpDelete("/app/itineraries/{id}/days/{dayNumber}/entries/{entryId}")]
    public IActionResult RemoveEntry(string id, int dayNumber, string entryId)
    {
        // TODO: Implement real entry removal
        return Redirect($"/app/itineraries/{id}");
    }
}
