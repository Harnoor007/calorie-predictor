from pathlib import Path

import plotly.express as px

from ml.load_data import load_dataset

BASE_DIR = Path(__file__).resolve().parent.parent
OUTPUT_DIR = BASE_DIR / "visualizations"

OUTPUT_DIR.mkdir(exist_ok=True)

df = load_dataset()

sample = df.sample(1000, random_state=42)


def save_plot(fig, filename):
    path = OUTPUT_DIR / filename
    fig.write_html(path)
    print(f"Saved: {path}")


# Height vs Weight
fig = px.scatter(
    df,
    x="Height",
    y="Weight",
    color="Gender",
    title="Height vs Weight",
)
save_plot(fig, "height_vs_weight.html")


# Age vs Calories
fig = px.scatter(
    sample,
    x="Age",
    y="Calories",
    color="Gender",
    title="Age vs Calories",
)
save_plot(fig, "age_vs_calories.html")


# Height vs Calories
fig = px.scatter(
    sample,
    x="Height",
    y="Calories",
    color="Gender",
    title="Height vs Calories",
)
save_plot(fig, "height_vs_calories.html")


# Weight vs Calories
fig = px.scatter(
    sample,
    x="Weight",
    y="Calories",
    color="Gender",
    title="Weight vs Calories",
)
save_plot(fig, "weight_vs_calories.html")


# Duration vs Calories
fig = px.scatter(
    sample,
    x="Duration",
    y="Calories",
    color="Gender",
    title="Duration vs Calories",
)
save_plot(fig, "duration_vs_calories.html")


# Histograms
for column in [
    "Age",
    "Height",
    "Weight",
    "Duration",
    "Heart_Rate",
    "Body_Temp",
]:
    fig = px.histogram(
        df,
        x=column,
        nbins=40,
        title=f"{column} Distribution",
    )
    save_plot(fig, f"{column.lower()}_distribution.html")


# Heatmap
encoded = df.copy()
encoded["Gender"] = encoded["Gender"].map({"male": 0, "female": 1})

corr = encoded.corr(numeric_only=True)

fig = px.imshow(
    corr,
    text_auto=True,
    title="Correlation Matrix",
)

save_plot(fig, "correlation_heatmap.html")

print("\nAll visualizations generated successfully!")