from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import joblib
from pathlib import Path

from ml.load_data import load_dataset

BASE_DIR = Path(__file__).resolve().parent.parent
MODELS_DIR = BASE_DIR / "models"

MODELS_DIR.mkdir(exist_ok=True)


def preprocess_data():

    df = load_dataset()

    print("=" * 60)
    print("Original Dataset")
    print("=" * 60)

    print(f"Dataset Shape : {df.shape}")

    # Encode Gender
    df["Gender"] = df["Gender"].map({
        "male": 0,
        "female": 1
    })

    # Keep ALL features
    X = df.drop(
        columns=[
            "User_ID",
            "Calories"
        ]
    )

    y = df["Calories"]

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.10,
        random_state=22
    )

    scaler = StandardScaler()

    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)

    joblib.dump(
        scaler,
        MODELS_DIR / "scaler.pkl"
    )

    print("\nScaler Saved")

    print("\nTraining Shape:", X_train.shape)
    print("Testing Shape :", X_test.shape)

    return X_train, X_test, y_train, y_test, scaler


if __name__ == "__main__":
    preprocess_data()