from .bug import run_bug
from .scenarios import TestCondition


def run(
    input_value=10,
    delay=50,
    concurrency=1,
    order="A-B-C",
):
    """
    Run the target application with a set of conditions.
    """

    condition = TestCondition(
        input_value=input_value,
        delay_ms=delay,
        concurrency=concurrency,
        execution_order=order,
    )

    return run_bug(condition)


if __name__ == "__main__":
    result = run(
        input_value=10,
        delay=50,
        concurrency=2,
        order="A-B-C",
    )

    print(result)