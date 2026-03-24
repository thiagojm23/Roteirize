using Roteirize.Common.Exceptions;

namespace Roteirize.Common.Results;

public class Result<T>
{
    public bool IsSuccess { get; }
    public T? Value { get; }
    public string? Error { get; }
    public AppException? Exception { get; }

    private Result(T value)
    {
        IsSuccess = true;
        Value = value;
    }

    private Result(string error, AppException? exception = null)
    {
        IsSuccess = false;
        Error = error;
        Exception = exception;
    }

    public static Result<T> Success(T value) => new(value);
    public static Result<T> Failure(string error) => new(error);
    public static Result<T> Failure(AppException exception) => new(exception.Message, exception);
    public static Result<T> Failure(string error, int statusCode) => new(error, new AppException(error, statusCode));
}

public class Result
{
    public bool IsSuccess { get; }
    public string? Error { get; }
    public AppException? Exception { get; }

    private Result(bool success, string? error = null, AppException? exception = null)
    {
        IsSuccess = success;
        Error = error;
        Exception = exception;
    }

    public static Result Success() => new(true);
    public static Result Failure(string error) => new(false, error);
    public static Result Failure(AppException exception) => new(false, exception.Message, exception);
    public static Result Failure(string error, int statusCode) => new(false, error, new AppException(error, statusCode));
}
