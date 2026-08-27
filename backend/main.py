from .search import search_for_failure
from .minimizer import minimize_failure


def demo_bug(condition):
    """
    Temporary bug used to test ALMOST.
    """

    if condition.delay_ms == 173 and condition.execution_order == "A-C-B":
        raise RuntimeError("Intermittent race condition detected")


def main():
    print("================================")
    print("        ALMOST v0.1")
    print("================================")

    print("\nSearching for intermittent failures...\n")

    results = search_for_failure(demo_bug)

    failures = [result for result in results if result.failed]

    if not failures:
        print("No failures found.")
        return

    print(f"Total failures found: {len(failures)}")

    # Use the first failure as the representative failure.
    representative = failures[0]

    print("\n" + "=" * 40)
    print("FAILURE ANALYSIS")
    print("=" * 40)

    print(f"\nError: {representative.error_message}")
    print(f"Occurrences: {len(failures)}")

    print("\nStarting minimization...")

    minimal = minimize_failure(
        representative.condition,
        demo_bug
    )

    print("\n" + "=" * 40)
    print("MINIMAL FAILURE RECIPE")
    print("=" * 40)

    print(f"Input: {minimal.input_value}")
    print(f"Delay: {minimal.delay_ms}ms")
    print(f"Execution order: {minimal.execution_order}")
    print(f"Load: {minimal.load}")


if __name__ == "__main__":
    main()
    