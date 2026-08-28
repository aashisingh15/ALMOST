def get_scenarios():
    """
    Return the scenarios that the target application supports.
    """

    return {
        "inputs": [10, 42, 100],
        "delays": [0, 50, 173, 200],
        "execution_orders": [
            "A-B-C",
            "A-C-B",
            "B-A-C",
        ],
        "loads": [
            "Low",
            "Medium",
            "High",
        ],
    }
