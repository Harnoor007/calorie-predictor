from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent.parent

CALORIES_PATH = BASE_DIR / "dataset" / "calories.csv"
EXERCISE_PATH = BASE_DIR / "dataset" / "exercise.csv"


def load_dataset():
    """
    Load and merge the exercise and calories datasets.
    """

    calories_df = pd.read_csv(CALORIES_PATH)
    exercise_df = pd.read_csv(EXERCISE_PATH)

    # Merge both datasets on User_ID
    df = pd.merge(exercise_df, calories_df, on="User_ID")

    return df


if __name__ == "__main__":
    df = load_dataset()

    print("=" * 60)
    print("Dataset Loaded Successfully")
    print("=" * 60)

    print(df.head())

    print("\nColumns:")
    print(df.columns.tolist())

    print("\nShape:", df.shape)

    print("\nMissing Values:")
    print(df.isnull().sum())