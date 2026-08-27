from models import TestCondition, FailureResult


def run_test(condition: TestCondition, target_function) -> FailureResult:
    try:
        target_function(condition)

        return FailureResult(
            failed=False,
            condition=condition,
            error_message="",
            attempts=1,
            confidence=0.0,
        )

    except Exception as error:
        return FailureResult(
            failed=True,
            condition=condition,
            error_message=str(error),
            attempts=1,
            confidence=1.0,
        )