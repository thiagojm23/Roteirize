using HttpResults = Microsoft.AspNetCore.Http.Results;

namespace Roteirize.Common.Results;

public static class ResultExtensions
{
    public static IResult ToHttpResult<T>(this Result<T> result)
    {
        if (result.IsSuccess)
            return HttpResults.Ok(result.Value);

        if (result.Exception is not null)
            return HttpResults.Problem(detail: result.Exception.Message, statusCode: result.Exception.StatusCode);

        return HttpResults.BadRequest(new { error = result.Error });
    }

    public static IResult ToHttpResult(this Result result)
    {
        if (result.IsSuccess)
            return HttpResults.Ok();

        if (result.Exception is not null)
            return HttpResults.Problem(detail: result.Exception.Message, statusCode: result.Exception.StatusCode);

        return HttpResults.BadRequest(new { error = result.Error });
    }

    public static IResult ToHttpResult<T>(this Result<T> result, Func<T, IResult> onSuccess)
    {
        if (result.IsSuccess)
            return onSuccess(result.Value!);

        if (result.Exception is not null)
            return HttpResults.Problem(detail: result.Exception.Message, statusCode: result.Exception.StatusCode);

        return HttpResults.BadRequest(new { error = result.Error });
    }
}
