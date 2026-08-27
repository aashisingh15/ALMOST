from itertools import product

from models import TestCondition, FailureResult
from runner import run_test


def generate_conditions():
    """Generate combinations of conditions to test."""

    inputs = [10, 42, 100]
    delays = [0, 50, 173, 200]
    execution_orders = ["A-B-C", "A-C-B", "B-A-C"]
    loads = ["Low", "Medium", "High"]

    conditions = []

    for input_value, delay, order, load in product(
        inputs,
        delays,
        execution_orders,
        loads,
    ):
        conditions.append(
            TestCondition(
                input_value=input_value,
                delay_ms=delay,
                execution_order=order,
                load=load,
            )
        )

    return conditions


def search_for_failure(target_function):
    """Search for conditions that cause a failure."""

    conditions = generate_conditions()

    results = []

    print(f"Testing {len(conditions)} conditions...\n")

    for condition in conditions:
        result = run_test(condition, target_function)
        results.append(result)

        if result.failed:
            print("💥 Failure found!")
            print(f"Condition: {condition}")
            print(f"Error: {result.error_message}")
            print()

    return results