using InertiaCore;
using Microsoft.AspNetCore.Mvc;

namespace Roteirize.Features.Auth;

public class AuthController : Controller
{
    [HttpGet("/login")]
    public IActionResult Login()
    {
        return Inertia.Render("Auth/Login");
    }

    [HttpPost("/auth/login")]
    public IActionResult LoginPost([FromForm] LoginRequest request)
    {
        // TODO: Implement real authentication
        // For now, redirect to dashboard on any login attempt
        return RedirectToAction("Index", "Dashboard");
    }

    [HttpGet("/cadastro")]
    public IActionResult Register()
    {
        return Inertia.Render("Auth/Register");
    }

    [HttpPost("/auth/register")]
    public IActionResult RegisterPost([FromForm] RegisterRequest request)
    {
        // TODO: Implement real registration
        return RedirectToAction("Index", "Dashboard");
    }

    [HttpGet("/esqueci-senha")]
    public IActionResult ForgotPassword()
    {
        return Inertia.Render("Auth/ForgotPassword");
    }

    [HttpPost("/auth/forgot-password")]
    public IActionResult ForgotPasswordPost([FromForm] ForgotPasswordRequest request)
    {
        // TODO: Implement real password recovery
        return Inertia.Render("Auth/ForgotPassword");
    }

    [HttpPost("/auth/logout")]
    public IActionResult Logout()
    {
        // TODO: Implement real logout
        return Redirect("/");
    }
}

public record LoginRequest(string Email, string Password);
public record RegisterRequest(string Name, string Email, string Cpf, string Password);
public record ForgotPasswordRequest(string Email);
