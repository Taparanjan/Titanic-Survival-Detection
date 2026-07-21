from pathlib import Path

import joblib
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import AdaBoostClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, f1_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder

BASE_DIR = Path(__file__).resolve().parent
DATASET_PATH = BASE_DIR / "titanic dataset.csv"
MODEL_PATH = BASE_DIR / "titanic_model.pkl"
ENCODER_PATH = BASE_DIR / "encoder.pkl"
FEATURE_COLUMNS = ["Pclass", "Sex", "Age", "SibSp", "Parch", "Fare", "Embarked"]


def build_training_data():
    dataframe = pd.read_csv(DATASET_PATH)
    dataframe = dataframe.dropna(subset=["Survived"]).copy()
    dataframe["Age"] = pd.to_numeric(dataframe["Age"], errors="coerce")
    dataframe["Fare"] = pd.to_numeric(dataframe["Fare"], errors="coerce")
    dataframe["Age"] = dataframe["Age"].fillna(dataframe["Age"].median())
    dataframe["Fare"] = dataframe["Fare"].fillna(dataframe["Fare"].median())
    dataframe["Embarked"] = dataframe["Embarked"].fillna(dataframe["Embarked"].mode()[0])

    features = dataframe[FEATURE_COLUMNS]
    target = dataframe["Survived"].astype(int)
    return features, target


def train():
    features, target = build_training_data()
    x_train, x_test, y_train, y_test = train_test_split(
        features,
        target,
        test_size=0.2,
        random_state=42,
        stratify=target,
    )

    encoder = ColumnTransformer(
        transformers=[
            ("categorical", OneHotEncoder(handle_unknown="ignore"), ["Sex", "Embarked"]),
        ],
        remainder="passthrough",
    )

    x_train_encoded = encoder.fit_transform(x_train)
    x_test_encoded = encoder.transform(x_test)

    base_model = DecisionTreeClassifier(
        max_depth=3,
        random_state=42,
    )
    model = AdaBoostClassifier(
        estimator=base_model,
        n_estimators=120,
        learning_rate=0.2,
        random_state=42,
    )
    model.fit(x_train_encoded, y_train)

    predictions = model.predict(x_test_encoded)
    metrics = {
        "accuracy": round(accuracy_score(y_test, predictions), 4),
        "f1": round(f1_score(y_test, predictions), 4),
    }

    joblib.dump(model, MODEL_PATH)
    joblib.dump(encoder, ENCODER_PATH)
    return metrics


if __name__ == "__main__":
    results = train()
    print(f"Model saved to {MODEL_PATH}")
    print(f"Encoder saved to {ENCODER_PATH}")
    print(f"Accuracy: {results['accuracy']}")
    print(f"F1 score: {results['f1']}")
