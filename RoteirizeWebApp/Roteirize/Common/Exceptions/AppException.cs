namespace Roteirize.Common.Exceptions;

public class AppException(string message, int statusCode = 400) : Exception(message)
{
    public int StatusCode { get; } = statusCode;

    public static AppException BadRequest(string message = "Requisição inválida.")
        => new(message, 400);

    public static AppException Unauthorized(string message = "Não autorizado.")
        => new(message, 401);

    public static AppException Forbidden(string message = "Acesso negado.")
        => new(message, 403);

    public static AppException NotFound(string message = "Recurso não encontrado.")
        => new(message, 404);

    public static AppException Conflict(string message = "Conflito.")
        => new(message, 409);

    public static AppException InternalError(string message = "Erro interno do servidor.")
        => new(message, 500);
}
