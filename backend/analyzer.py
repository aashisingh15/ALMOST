from .search import search_for_failure
from .minimizer import minimize_failure


def analyze_failure(target_function):
    """
    Run the ALMOST failure analysis pipeline and return
    structured results for other parts of the application.
    """

    results = search_for_failure(target_function)

    failures = [result for result in results if result.failed]

    report = {
        "conditions_tested": len(results),
        "failures_found": len(failures),
        "error": "",
        "occurrences": 0,
        "confidence": 0.0,
        "minimal_recipe": None,
    }

    if not failures:
        return report

    representative = failures[0]

    minimal = minimize_failure(
        representative.condition,
        target_function,
    )

    report["error"] = representative.error_message
    report["occurrences"] = len(failures)
    report["confidence"] = representative.confidence

    report["minimal_recipe"] = {
        "input_value": minimal.input_value,
        "delay_ms": minimal.delay_ms,
        "execution_order": minimal.execution_order,
        "load": minimal.load,
    }

    return report