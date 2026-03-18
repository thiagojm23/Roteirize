using InertiaCore;
using Microsoft.AspNetCore.Mvc;

namespace Roteirize.Features.Itinerary;

public class ItineraryController : Controller
{
    [HttpGet("/app/itineraries")]
    public IActionResult List()
    {
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
        // TODO: Implement real itinerary creation
        // For now, redirect to the list
        return Redirect("/app/itineraries");
    }

    [HttpGet("/app/itineraries/{id}")]
    public IActionResult Plan(string id)
    {
        // Mock data for the itinerary plan view
        var itinerary = new
        {
            id,
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
        };

        var dayPlans = new[]
        {
            new
            {
                dayNumber = 1,
                date = "2026-04-15",
                entries = new[]
                {
                    new
                    {
                        id = "e1",
                        hourStart = "09:00",
                        hourEnd = "12:00",
                        locationName = "Cristo Redentor",
                        cost = 80.0,
                        classification = "tour",
                        photos = Array.Empty<string>(),
                        notes = "Chegar cedo para evitar filas"
                    },
                    new
                    {
                        id = "e2",
                        hourStart = "13:00",
                        hourEnd = "15:00",
                        locationName = "Almoço em Copacabana",
                        cost = 120.0,
                        classification = "food",
                        photos = Array.Empty<string>(),
                        notes = ""
                    }
                }
            },
            new
            {
                dayNumber = 2,
                date = "2026-04-16",
                entries = new[]
                {
                    new
                    {
                        id = "e3",
                        hourStart = "10:00",
                        hourEnd = "16:00",
                        locationName = "Pão de Açúcar",
                        cost = 130.0,
                        classification = "tour",
                        photos = Array.Empty<string>(),
                        notes = ""
                    }
                }
            }
        };

        var costSummary = new
        {
            totalSpent = 330.0,
            budgetRemaining = 4670.0,
            perDayAverage = 165.0,
            byCategory = new Dictionary<string, double>
            {
                { "food", 120.0 },
                { "tour", 210.0 },
                { "museum", 0.0 },
                { "transport", 0.0 },
                { "hotel", 0.0 },
                { "shopping", 0.0 },
                { "entertainment", 0.0 },
                { "other", 0.0 },
            }
        };

        var budget = new
        {
            totalBudget = 5000.0,
            maxPerDay = 500.0,
            travelers = 2,
            currency = "BRL"
        };

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
