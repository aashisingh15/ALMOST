from .analyzer import analyze_failure
from target_app.bug import run_bug


def main():
    print("================================")
    print("        ALMOST v0.1")
    print("================================")

    print("\nAnalyzing target application...\n")

    report = analyze_failure(run_bug)

    print(f"Total conditions tested: {report['conditions_tested']}")
    print(f"Total failures found: {report['failures_found']}")

    if report["failures_found"] == 0:
        print("\nNo failures found.")
        return

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