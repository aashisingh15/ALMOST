from search import search_for_failure
from minimizer import minimize_failure


def demo_bug(condition):
    """
    Temporary bug used to test ALMOST.
    The real target application will come from target_app/.
    """

    if condition.delay_ms == 173 and condition.execution_order == "A-C-B":
        raise RuntimeError("Intermittent race condition detected")


def main():
    print("================================")
    print("        ALMOST v0.1")
    print("================================")

    print("\nSearching for intermittent failures...\n")

    results = search_for_failure(demo_bug)

    for result in results:
        if result.failed:
            print("\nFailure found!")
            print("Starting minimization...\n")

            minimal = minimize_failure(
                result.condition,
                demo_bug
            )

            print("Minimal failure recipe:")
            print(f"Input: {minimal.input_value}")
            print(f"Delay: {minimal.delay_ms}ms")
            print(f"Execution order: {minimal.execution_order}")
            print(f"Load: {minimal.load}")


if __name__ == "__main__":
    main()
    