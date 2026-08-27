from models import TestCondition, FailureResult
from runner import run_test


def search_for_failure(target_function):
    conditions = [
        TestCondition(
            input_value=10,
            delay_ms=50,
            execution_order="A-B-C",
            load="Low",
        ),
        TestCondition(
            input_value=42,
            delay_ms=173,
            execution_order="A-C-B",
            load="High",
        ),
        TestCondition(
            input_value=100,
            delay_ms=200,
            execution_order="B-A-C",
            load="Medium",
        ),
    ]

    results = []

    for condition in conditions:
        result = run_test(condition, target_function)
        results.append(result)

        if result.failed:
            print("💥 Failure found!")
            print(f"Condition: {condition}")
            print(f"Error: {result.error_message}")

    return results