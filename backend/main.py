from .analyzer import analyze_failure


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

    report = analyze_failure(demo_bug)

    if report["failures_found"] == 0:
        print("No failures found.")
        return

    print(f"Total conditions tested: {report['conditions_tested']}")
    print(f"Total failures found: {report['failures_found']}")

    print("\n" + "=" * 40)
    print("FAILURE ANALYSIS")
    print("=" * 40)

    print(f"\nError: {report['error']}")
    print(f"Occurrences: {report['occurrences']}")
    print(f"Confidence: {report['confidence']:.0%}")

    recipe = report["minimal_recipe"]

    print("\n" + "=" * 40)
    print("MINIMAL FAILURE RECIPE")
    print("=" * 40)

    print(f"Input: {recipe['input_value']}")
    print(f"Delay: {recipe['delay_ms']}ms")
    print(f"Execution order: {recipe['execution_order']}")
    print(f"Load: {recipe['load']}")


if __name__ == "__main__":
    main()