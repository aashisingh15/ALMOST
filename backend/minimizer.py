from models import TestCondition, FailureResult
from runner import run_test


def minimize_failure(condition, target_function):
    """
    Find the smallest set of conditions that still reproduces the failure.
    """

    current = condition

    # Try removing each condition one at a time.
    candidates = [
        TestCondition(
            input_value=None,
            delay_ms=current.delay_ms,
            execution_order=current.execution_order,
            load=current.load,
        ),
        TestCondition(
            input_value=current.input_value,
            delay_ms=0,
            execution_order=current.execution_order,
            load=current.load,
        ),
        TestCondition(
            input_value=current.input_value,
            delay_ms=current.delay_ms,
            execution_order="A-B-C",
            load=current.load,
        ),
        TestCondition(
            input_value=current.input_value,
            delay_ms=current.delay_ms,
            execution_order=current.execution_order,
            load="Low",
        ),
    ]

    for candidate in candidates:
        result = run_test(candidate, target_function)

        if result.failed:
            current = candidate

    return current