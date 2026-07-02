from pathlib import Path

import joblib
import pandas as pd

from app.schemas import PredictionRequest

BASE_DIR = Path(__file__).resolve().parent.parent
MODELS_DIR = BASE_DIR / "models"

MODEL_PATH = MODELS_DIR / "calories_model.pkl"
SCALER_PATH = MODELS_DIR / "scaler.pkl"

# Load once when the application starts
model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)
print("Model loaded successfully.")
print(type(model))
print(model)


class CaloriePredictor:

    def predict(self, data: PredictionRequest) -> float:

        gender = 0 if data.gender.value == "male" else 1

        # IMPORTANT:
        # These features must match preprocess.py exactly.
        features = pd.DataFrame(
            [[
                gender,
                data.age,
                data.height,
                data.weight,
                data.duration,
                data.heart_rate,
                data.body_temp,
            ]],
            columns=[
                "Gender",
                "Age",
                "Height",
                "Weight",
                "Duration",
                "Heart_Rate",
                "Body_Temp",
            ],
        )

        scaled = scaler.transform(features)

        prediction = model.predict(scaled)

        return round(float(prediction[0]), 2)


predictor = CaloriePredictor()