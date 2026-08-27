from dataclasses import dataclass
from typing import Any


@dataclass
class TestCondition:
    input_value: Any
    delay_ms: int
    execution_order: str
    load: str


@dataclass
class FailureResult:
    failed: bool
    condition: TestCondition | None
    error_message: str
    attempts: int
    failure_count: int
    confidence: float