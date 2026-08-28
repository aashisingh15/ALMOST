from flask import Flask, jsonify
from .analyzer import analyze_failure
from target_app.bug import run_bug

app = Flask(__name__)


@app.route("/api/analyze", methods=["GET"])
def analyze():
    report = analyze_failure(run_bug)
    return jsonify(report)


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ALMOST backend is running"})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
