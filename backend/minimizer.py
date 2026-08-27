from models import TestCondition
from runner import run_test


def minimize_failure(condition, target_function):
    """
    Find the smallest set of conditions that still reproduces the failure.
    """

    current = condition

    # Neutral/default values for each parameter.
    neutral_values = {
        "input_value": 0,
        "delay_ms": 0,
        "execution_order": "A-B-C",
        "load": "Low",
    }

    parameters = [
        "input_value",
        "delay_ms",
        "execution_order",
        "load",
    ]

    for parameter in parameters:
        candidate_values = {
            "input_value": current.input_value,
            "delay_ms": current.delay_ms,
            "execution_order": current.execution_order,
            "load": current.load,
        }

        candidate_values[parameter] = neutral_values[parameter]

        candidate = TestCondition(**candidate_values)

        result = run_test(candidate, target_function)

        if result.failed:
            current = candidate

    return current