import random
import time


def run_bug(condition):
    """
    Simulated target application containing a hidden
    intermittent race condition.
    """

    start_time = time.perf_counter()

    # Simulate application processing time.
    time.sleep(condition.delay_ms / 1000)

    result = {
        "status": "PASS",
        "execution_time": 0.0,
        "conditions": condition.to_dict(),
    }

    # Hidden intermittent failure.
    #
    # ALMOST should discover this through experimentation.
    hidden_trigger = (
        165 <= condition.delay_ms <= 175
        and condition.concurrency >= 6
        and condition.execution_order == "B-A-C"
    )

    if hidden_trigger and random.random() < 0.40:
        result["status"] = "FAIL"
        result["error"] = "Intermittent race condition detected"

    result["execution_time"] = round(
        time.perf_counter() - start_time,
        4,
    )

    return result