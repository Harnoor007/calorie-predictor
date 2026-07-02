import json
from plotly.utils import PlotlyJSONEncoder
from ml.load_data import load_dataset
import plotly.express as px
import pandas as pd
from xgboost import XGBRegressor

def create_graphs():

    df = load_dataset()

    sample = df.sample(1000, random_state=42)

    graphs = {}

    # --------------------------------------------------
    # Height vs Weight
    # --------------------------------------------------

    fig = px.scatter(
        df,
        x="Height",
        y="Weight",
        color="Gender",
        title="Height vs Weight",
    )

    graphs["height_weight"] = json.loads(
    json.dumps(fig, cls=PlotlyJSONEncoder)
)

    # --------------------------------------------------
    # Age vs Calories
    # --------------------------------------------------

    fig = px.scatter(
        sample,
        x="Age",
        y="Calories",
        color="Gender",
        title="Age vs Calories",
    )

    graphs["age_calories"] = json.loads(
        json.dumps(fig, cls=PlotlyJSONEncoder)
    )

    # --------------------------------------------------
    # Duration vs Calories
    # --------------------------------------------------

    fig = px.scatter(
        sample,
        x="Duration",
        y="Calories",
        color="Gender",
        title="Duration vs Calories",
    )

    graphs["duration_calories"] = json.loads(
        json.dumps(fig, cls=PlotlyJSONEncoder)  
    )

    # --------------------------------------------------
    # Heart Rate vs Calories
    # --------------------------------------------------

    fig = px.scatter(
        sample,
        x="Heart_Rate",
        y="Calories",
        color="Gender",
        title="Heart Rate vs Calories",
    )

    graphs["heart_rate"] = json.loads(
        json.dumps(fig, cls=PlotlyJSONEncoder)
    )

    # --------------------------------------------------
    # Correlation Heatmap
    # --------------------------------------------------

    encoded = df.copy()

    encoded["Gender"] = encoded["Gender"].map({
        "male":0,
        "female":1
    })

    corr = encoded.corr(numeric_only=True)

    fig = px.imshow(
        corr,
        text_auto=True,
        title="Correlation Heatmap",
    )

    graphs["heatmap"] = json.loads(
        json.dumps(fig, cls=PlotlyJSONEncoder)
    )

    # --------------------------------------------------
    # Feature Importance
    # --------------------------------------------------

    encoded = df.copy()

    encoded["Gender"] = encoded["Gender"].map({
        "male":0,
        "female":1
    })

    X = encoded.drop(columns=["User_ID","Calories"])

    y = encoded["Calories"]

    model = XGBRegressor(
        n_estimators=300,
        learning_rate=0.05,
        max_depth=5,
        random_state=42,
        objective="reg:squarederror"
    )

    model.fit(X,y)

    importance = pd.DataFrame({
        "Feature":X.columns,
        "Importance":model.feature_importances_
    }).sort_values(
        by="Importance",
        ascending=False
    )

    fig = px.bar(
        importance,
        x="Importance",
        y="Feature",
        orientation="h",
        title="Feature Importance",
    )

    graphs["feature_importance"] = json.loads(
        json.dumps(fig, cls=PlotlyJSONEncoder)
    )

    return graphs