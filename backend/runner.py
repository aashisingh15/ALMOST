from .models import TestCondition, FailureResult


def run_test(
    condition: TestCondition,
    target_function,
    attempts: int = 10,
) -> FailureResult:
    """
    Run the target function multiple times to detect intermittent failures.
    """

    failure_count = 0
    last_error = ""

    for _ in range(attempts):
        try:
            target_function(condition)

        except Exception as error:
            failure_count += 1
            last_error = str(error)

    failed = failure_count > 0

    confidence = failure_count / attempts

    return FailureResult(
        failed=failed,
        condition=condition,
        error_message=last_error,
        attempts=attempts,
        failure_count=failure_count,
        confidence=confidence,
    )