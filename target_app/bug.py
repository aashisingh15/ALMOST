import random
import time


def run_bug(condition):
    """
    Simulated target application containing an intermittent race condition.
    """

    if condition.delay_ms == 173 and condition.execution_order == "A-C-B":
        time.sleep(0.001)

        # The bug occurs intermittently.
        if random.random() < 0.4:
            raise RuntimeError("Intermittent race condition detected")

    return "Success"
