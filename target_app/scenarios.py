from dataclasses import dataclass


@dataclass
class TestCondition:
    input_value: int
    delay_ms: int
    concurrency: int
    execution_order: str

    def to_dict(self):
        return {
            "input": self.input_value,
            "delay": self.delay_ms,
            "concurrency": self.concurrency,
            "order": self.execution_order,
        }


EXECUTION_ORDERS = [
    "A-B-C",
    "A-C-B",
    "B-A-C",
    "B-C-A",
    "C-A-B",
    "C-B-A",
]


def generate_scenarios():
    """
    Generate many possible test conditions.

    This function does not know which combination
    causes the hidden failure.
    """

    scenarios = []

    for input_value in [10, 42, 82, 100]:
        for delay_ms in [50, 100, 150, 170, 180, 200]:
            for concurrency in [1, 2, 3, 4, 6, 8]:
                for order in EXECUTION_ORDERS:
                    scenarios.append(
                        TestCondition(
                            input_value=input_value,
                            delay_ms=delay_ms,
                            concurrency=concurrency,
                            execution_order=order,
                        )
                    )

    return scenarios