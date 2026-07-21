from pathlib import Path

from flask import Flask, jsonify, render_template, request, send_from_directory
import joblib
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent
DIST_DIR = BASE_DIR / "frontend" / "dist"

app = Flask(
    __name__,
    static_folder=str(DIST_DIR),
    static_url_path="",
)

MODEL_PATH = BASE_DIR / "titanic_model.pkl"
ENCODER_PATH = BASE_DIR / "encoder.pkl"
FEATURE_COLUMNS = ["Pclass", "Sex", "Age", "SibSp", "Parch", "Fare", "Embarked"]

model = None
encoder = None
model_load_error = None


def load_artifacts():
    global model, encoder, model_load_error

    if model is not None and encoder is not None:
        return model, encoder

    try:
        model = joblib.load(MODEL_PATH)
        encoder = joblib.load(ENCODER_PATH)
        model_load_error = None
        return model, encoder
    except Exception as exc:
        model_load_error = str(exc)
        raise RuntimeError(
            "Prediction model could not be loaded. Regenerate the model artifacts "
            "with `python train_model.py`."
        ) from exc


@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    return response


def wants_json_response():
    return request.is_json or "application/json" in request.headers.get("Accept", "")


def value_for(raw_data, *keys):
    for key in keys:
        value = raw_data.get(key)
        if value not in (None, ""):
            return value
    return None


def normalize_prediction_input(raw_data):
    errors = {}

    try:
        pclass = int(value_for(raw_data, "Pclass", "pclass"))
        if pclass not in (1, 2, 3):
            errors["pclass"] = "Passenger class must be 1, 2, or 3."
    except (TypeError, ValueError):
        pclass = None
        errors["pclass"] = "Passenger class is required."

    sex = str(value_for(raw_data, "Sex", "sex") or "").strip().lower()
    if sex not in {"male", "female"}:
        errors["sex"] = "Sex must be male or female."

    try:
        age = float(value_for(raw_data, "Age", "age"))
        if not 0 <= age <= 120:
            errors["age"] = "Age must be between 0 and 120."
    except (TypeError, ValueError):
        age = None
        errors["age"] = "Age is required."

    try:
        sibsp = int(value_for(raw_data, "SibSp", "sibsp"))
        if not 0 <= sibsp <= 10:
            errors["sibsp"] = "Siblings/spouse count must be between 0 and 10."
    except (TypeError, ValueError):
        sibsp = None
        errors["sibsp"] = "Siblings/spouse count is required."

    try:
        parch = int(value_for(raw_data, "Parch", "parch"))
        if not 0 <= parch <= 10:
            errors["parch"] = "Parents/children count must be between 0 and 10."
    except (TypeError, ValueError):
        parch = None
        errors["parch"] = "Parents/children count is required."

    try:
        fare = float(value_for(raw_data, "Fare", "fare"))
        if not 0 <= fare <= 600:
            errors["fare"] = "Fare must be between 0 and 600."
    except (TypeError, ValueError):
        fare = None
        errors["fare"] = "Fare is required."

    embarked = str(value_for(raw_data, "Embarked", "embarked") or "").strip().upper()
    if embarked not in {"S", "C", "Q"}:
        errors["embarked"] = "Port of embarkation must be S, C, or Q."

    if errors:
        return None, errors

    return {
        "Pclass": pclass,
        "Sex": sex,
        "Age": age,
        "SibSp": sibsp,
        "Parch": parch,
        "Fare": fare,
        "Embarked": embarked,
    }, {}


def format_inputs(features):
    class_labels = {1: "1st Class", 2: "2nd Class", 3: "3rd Class"}
    embarked_labels = {"S": "Southampton", "C": "Cherbourg", "Q": "Queenstown"}

    return {
        "Passenger Class": class_labels[features["Pclass"]],
        "Sex": features["Sex"].capitalize(),
        "Age": f"{features['Age']:g}",
        "Siblings/Spouse": str(features["SibSp"]),
        "Parents/Children": str(features["Parch"]),
        "Fare": f"${features['Fare']:.2f}",
        "Embarked": embarked_labels[features["Embarked"]],
    }


def run_prediction(features):
    loaded_model, loaded_encoder = load_artifacts()
    dataframe = pd.DataFrame([features], columns=FEATURE_COLUMNS)
    encoded = loaded_encoder.transform(dataframe)
    prediction = int(loaded_model.predict(encoded)[0])

    probability = None
    if hasattr(loaded_model, "predict_proba"):
        probabilities = loaded_model.predict_proba(encoded)[0]
        classes = list(getattr(loaded_model, "classes_", []))
        if 1 in classes:
            probability = round(float(probabilities[classes.index(1)]) * 100)

    survived = prediction == 1

    return {
        "survived": survived,
        "prediction": prediction,
        "label": "Passenger is predicted to survive" if survived else "Passenger is predicted not to survive",
        "probability": probability,
        "inputs": format_inputs(features),
    }


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def home(path):
    if path and (DIST_DIR / path).exists():
        return send_from_directory(str(DIST_DIR), path)
    return send_from_directory(str(DIST_DIR), "index.html")


@app.route("/api/health")
def health():
    try:
        load_artifacts()
        return jsonify({"status": "ok", "modelLoaded": True})
    except RuntimeError:
        return jsonify({
            "status": "model_unavailable",
            "modelLoaded": False,
            "error": model_load_error,
        }), 503


@app.route("/predict", methods=["POST", "OPTIONS"])
def predict():
    if request.method == "OPTIONS":
        return "", 204

    raw_data = request.get_json(silent=True) if request.is_json else request.form
    features, errors = normalize_prediction_input(raw_data or {})

    if errors:
        payload = {"message": "Please correct the highlighted fields.", "errors": errors}
        if wants_json_response():
            return jsonify(payload), 400
        return payload["message"], 400

    try:
        result = run_prediction(features)
    except RuntimeError as exc:
        payload = {"message": str(exc)}
        if wants_json_response():
            return jsonify(payload), 503
        return payload["message"], 503

    if wants_json_response():
        return jsonify(result)

    return result["label"]


if __name__ == "__main__":
    app.run(debug=True)
