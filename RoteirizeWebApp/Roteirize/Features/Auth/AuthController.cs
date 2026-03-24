using InertiaCore;
using Microsoft.AspNetCore.Mvc;

namespace Roteirize.Features.Auth;

// Inertia page rendering only — auth API logic is in MinimalAPI endpoints (Login.cs, Register.cs, etc.)
public class AuthController : Controller
{
    [HttpGet("/login")]
    public IActionResult Login() => Inertia.Render("Auth/Login");

    [HttpGet("/cadastro")]
    public IActionResult Register() => Inertia.Render("Auth/Register");

    [HttpGet("/esqueci-senha")]
    public IActionResult ForgotPassword() => Inertia.Render("Auth/ForgotPassword");

    [HttpGet("/redefinir-senha")]
    public IActionResult ResetPassword([FromQuery] string token)
        => Inertia.Render("Auth/ResetPassword", new { token });
}
