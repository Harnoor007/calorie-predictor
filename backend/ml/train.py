from pathlib import Path

import joblib
import numpy as np
import pandas as pd

from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score,
)
from xgboost import XGBRegressor

from ml.preprocess import preprocess_data


BASE_DIR = Path(__file__).resolve().parent.parent
MODELS_DIR = BASE_DIR / "models"

MODELS_DIR.mkdir(exist_ok=True)


def train_models():

    X_train, X_test, y_train, y_test, scaler = preprocess_data()

    models = {
        "Linear Regression": LinearRegression(),
        "Ridge Regression": Ridge(),
        "Lasso Regression": Lasso(),
        "Random Forest": RandomForestRegressor(
            n_estimators=100,
            random_state=42,
        ),
        "XGBoost": XGBRegressor(
            n_estimators=300,
            learning_rate=0.05,
            max_depth=5,
            random_state=42,
            objective="reg:squarederror",
        ),
    }

    results = []

    best_model = None
    best_model_name = ""
    best_mae = float("inf")

    print("\nTraining Models...\n")

    for name, model in models.items():

        model.fit(X_train, y_train)

        predictions = model.predict(X_test)

        mae = mean_absolute_error(y_test, predictions)
        rmse = np.sqrt(
            mean_squared_error(
                y_test,
                predictions
            )
        )
        r2 = r2_score(
            y_test,
            predictions,
        )

        results.append(
            {
                "Model": name,
                "MAE": round(mae, 4),
                "RMSE": round(rmse, 4),
                "R² Score": round(r2, 4),
            }
        )

        if mae < best_mae:
            best_mae = mae
            best_model = model
            best_model_name = name

    results_df = pd.DataFrame(results)

    print("=" * 70)
    print(results_df)
    print("=" * 70)

    print(f"\nBest Model : {best_model_name}")
    print(f"MAE        : {best_mae:.4f}")

    model_path = MODELS_DIR / "calories_model.pkl"

    joblib.dump(best_model, model_path)

    print(f"\nModel saved to:\n{model_path}")


if __name__ == "__main__":
    train_models()