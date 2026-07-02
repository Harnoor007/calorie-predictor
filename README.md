# 🔥 Calories Burnt Prediction using Machine Learning

A full-stack Machine Learning web application that predicts the number of calories burned during exercise based on a person's physical attributes and workout information.

The project combines a trained **XGBoost Regression model**, a **FastAPI backend**, and a modern **React + Tailwind CSS frontend**.

---

# 📷 Project Overview

This application allows a user to enter workout information such as:

- Gender
- Age
- Height
- Weight
- Exercise Duration
- Heart Rate
- Body Temperature

The Machine Learning model predicts the approximate calories burned during that workout.

---

# 🚀 Technologies Used

## Machine Learning

- Python
- Pandas
- NumPy
- Scikit-Learn
- XGBoost
- Joblib

## Backend

- FastAPI
- Uvicorn
- Pydantic

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Hot Toast
- Lucide React Icons

---

# 📂 Project Structure

```
calories_prediction/

│
├── backend/
│   │
│   ├── app/
│   │   ├── main.py
│   │   ├── predictor.py
│   │   ├── schemas.py
│   │   └── utils.py
│   │
│   ├── ml/
│   │   ├── load_data.py
│   │   ├── explore.py
│   │   ├── preprocess.py
│   │   ├── train.py
│   │   └── evaluate.py
│   │
│   ├── dataset/
│   │
│   ├── models/
│   │
│   └── requirements.txt
│
├── frontend/
│
└── README.md
```

---

# 📊 Machine Learning Workflow

The complete ML pipeline consists of five major stages.

```
Load Dataset
      ↓
Explore Dataset
      ↓
Preprocess Dataset
      ↓
Train Models
      ↓
Evaluate Models
      ↓
Save Best Model
      ↓
FastAPI Prediction API
      ↓
React Frontend
```

---

# Step 1 — Loading the Dataset

The original dataset consists of two CSV files.

```
exercise.csv
```

Contains

- User ID
- Gender
- Age
- Height
- Weight
- Exercise Duration
- Heart Rate
- Body Temperature

```
calories.csv
```

Contains

- User ID
- Calories Burned

These two datasets are merged using the common column:

```
User_ID
```

After merging:

```
Gender
Age
Height
Weight
Duration
Heart_Rate
Body_Temp
Calories
```

---

# Step 2 — Exploratory Data Analysis (EDA)

Before training the model, the dataset is explored to understand relationships between variables.

Several visualizations are generated:

- Height vs Weight
- Age vs Calories
- Height vs Calories
- Weight vs Calories
- Duration vs Calories
- Distribution of numerical features
- Correlation Heatmap

EDA helps answer questions like:

- Which feature has the strongest relationship with calories?
- Are there any unusual values?
- Is the data balanced?

---

# Step 3 — Data Preprocessing

Machine Learning algorithms cannot directly understand text values.

The Gender column contains:

```
Male
Female
```

These values are converted into numbers.

```
Male   → 0
Female → 1
```

This process is called **Label Encoding**.

---

## Feature Selection

The model uses the following input features:

```
Gender
Age
Height
Weight
Duration
Heart_Rate
Body_Temp
```

Target variable:

```
Calories
```

---

## Train-Test Split

The dataset is divided into two parts.

```
90% → Training Data

10% → Testing Data
```

Training data is used to learn patterns.

Testing data is used to check how well the model performs on unseen data.

---

## Feature Scaling

Features have different ranges.

Example

```
Age = 25

Height = 180

Heart Rate = 160
```

Large numerical differences can affect training.

Therefore,

```
StandardScaler
```

is used to normalize the numerical features.

The scaler is saved as

```
models/scaler.pkl
```

---

# Step 4 — Model Training

Multiple regression algorithms are trained.

```
Linear Regression

Ridge Regression

Lasso Regression

Random Forest Regressor

XGBoost Regressor
```

Each model learns patterns between

```
Input Features

↓

Calories Burned
```

---

# Why Multiple Models?

Different algorithms perform differently on the same dataset.

Instead of assuming one is best,

all models are trained and compared.

The model with the lowest prediction error is selected.

---

# Step 5 — Model Evaluation

Three evaluation metrics are used.

---

## Mean Absolute Error (MAE)

Measures the average prediction error.

Example

```
Actual

100

Prediction

108

Error = 8
```

Lower MAE is better.

---

## Root Mean Squared Error (RMSE)

Similar to MAE,

but larger mistakes receive a bigger penalty.

Lower RMSE is better.

---

## R² Score

Shows how well the model explains the dataset.

Range:

```
0 → Poor

1 → Perfect
```

Higher R² is better.

---

# Best Model

After comparing all models,

the model with the lowest error is saved.

Example output:

| Model | MAE |
|------|------|
| Linear Regression | 18.00 |
| Ridge | 18.00 |
| Lasso | 17.99 |
| Random Forest | 10.44 |
| XGBoost | **10.12** |

Therefore,

```
XGBoost
```

becomes the final model.

The trained model is stored as

```
models/calories_model.pkl
```

---

# How Prediction Works

When the user clicks

```
Predict Calories
```

the following process occurs.

```
React Form

↓

FastAPI

↓

Pydantic Validation

↓

DataFrame Creation

↓

StandardScaler

↓

XGBoost Model

↓

Predicted Calories

↓

JSON Response

↓

React UI
```

---

# Backend API

## Health Check

```
GET /health
```

Returns backend status.

---

## Model Information

```
GET /model-info
```

Returns

- Model Name
- Algorithm
- Features Used
- Target Variable

---

## Prediction Endpoint

```
POST /predict
```

Example Request

```json
{
  "gender": "male",
  "age": 25,
  "height": 180,
  "weight": 80,
  "duration": 45,
  "heart_rate": 140,
  "body_temp": 39
}
```

Example Response

```json
{
  "status": "success",
  "model": "XGBoost",
  "prediction": {
    "calories_burned": 412.36,
    "unit": "kcal"
  }
}
```

---

# Running the Project

## Clone Repository

```
git clone <repository-url>

cd calories_prediction
```

---

# Backend Setup

Move to backend.

```
cd backend
```

Create virtual environment.

Windows

```
python -m venv venv
```

Activate environment.

Windows

```
venv\Scripts\activate
```

Install dependencies.

```
pip install -r requirements.txt
```

---

## Train the Model

Training is required only if you want to generate a new model.

```
python -m ml.train
```

This creates:

```
models/calories_model.pkl

models/scaler.pkl
```

> **Note:** If these files are already present in the `models/` folder (as they are in this repository), you do **not** need to run training again.

---

## Start Backend

```
uvicorn app.main:app --reload
```

Open Swagger UI

```
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

Open another terminal.

```
cd frontend
```

Install packages.

```
npm install
```

Start React.

```
npm run dev
```

Open

```
http://localhost:5173
```

---

# Features

- Modern React UI
- Machine Learning Prediction
- FastAPI REST API
- Swagger Documentation
- Input Validation
- Interactive Graphs (EDA)
- Responsive Design
- Toast Notifications
- Glassmorphism UI
- Gradient Theme

---

# Future Improvements

- User Authentication
- Prediction History
- Database Integration
- Docker Deployment
- Cloud Deployment
- Model Retraining API
- Admin Dashboard
- Model Performance Charts

---

# Learning Outcomes

This project demonstrates:

- Machine Learning Workflow
- Data Preprocessing
- Exploratory Data Analysis
- Regression Algorithms
- Model Evaluation
- Model Serialization
- REST API Development
- FastAPI
- React Integration
- Full Stack Machine Learning Deployment

---

# Author

Developed as a Full Stack Machine Learning project for academic training using:

- React
- FastAPI
- XGBoost
- Scikit-Learn
- Tailwind CSS

---

# 📊 Interactive Data Visualization & Analytics Dashboard

One of the major highlights of this project is the **Interactive Analytics Dashboard**, which provides visual insights into the dataset used for training the Machine Learning model. Instead of generating static images, the project uses **Plotly** to create interactive visualizations that are served through the FastAPI backend and rendered dynamically in the React frontend.

This allows users to explore the dataset, understand feature relationships, and gain insights into how the Machine Learning model makes predictions.

---

## 🎯 Why Data Visualization?

Before training any Machine Learning model, it is important to understand the dataset.

Data visualization helps to:

- Understand relationships between different variables.
- Detect trends and patterns.
- Identify highly influential features.
- Discover possible outliers.
- Explain the Machine Learning model in a more intuitive way.

Rather than treating the model as a "black box", these visualizations provide transparency into the learning process.

---

## 🛠️ Technologies Used

- **Plotly Express** – Interactive graph generation
- **FastAPI** – Serves graph data through REST APIs
- **React.js** – Displays graphs dynamically
- **react-plotly.js** – Renders Plotly charts in the frontend

---

## 📡 Analytics API

The backend exposes a dedicated endpoint:

```http
GET /analytics
```

Instead of returning static HTML files, the endpoint generates Plotly figures, converts them into JSON format, and sends them to the React frontend.

The frontend then renders the graphs interactively using Plotly.

This architecture keeps the backend and frontend completely independent while enabling real-time visualization.

---

# 📈 Visualizations Included

---

## 1. Height vs Weight

**Type:** Scatter Plot

### Purpose

This graph visualizes the relationship between a person's height and weight.

### Observation

- Taller individuals generally tend to have higher body weight.
- Both male and female samples are shown using different colors.
- The distribution helps understand the physical characteristics of the dataset.

### Importance

This graph verifies that the dataset follows realistic biological relationships.

---

## 2. Age vs Calories Burned

**Type:** Scatter Plot

### Purpose

Shows how calories burned vary across different age groups.

### Observation

- Age alone does not determine calorie expenditure.
- Individuals of similar ages may burn significantly different calories depending on workout characteristics.

### Importance

This demonstrates that calorie prediction depends on multiple features rather than age alone.

---

## 3. Duration vs Calories Burned

**Type:** Scatter Plot

### Purpose

Shows the relationship between exercise duration and calories burned.

### Observation

- Longer workout durations generally result in higher calorie expenditure.
- A clear positive trend is visible.

### Importance

Duration is one of the strongest predictors used by the Machine Learning model.

---

## 4. Heart Rate vs Calories Burned

**Type:** Scatter Plot

### Purpose

Visualizes how heart rate changes with calories burned.

### Observation

- Higher heart rates generally correspond to more intense physical activity.
- Higher exercise intensity usually leads to greater calorie burn.

### Importance

Heart Rate provides valuable physiological information that improves prediction accuracy.

---

## 5. Correlation Heatmap

**Type:** Heatmap

### Purpose

Displays correlation values between all numerical features.

### Observation

The heatmap helps identify:

- Strong positive correlations
- Weak relationships
- Feature dependencies

Darker colors indicate stronger relationships.

### Importance

Correlation analysis helps determine whether features are useful for prediction and whether highly correlated features may introduce redundancy.

---

## 6. Feature Importance

**Type:** Horizontal Bar Chart

### Purpose

Displays how much each feature contributes to the final XGBoost prediction.

### Observation

Features with larger importance values have greater influence on the prediction.

Typically, variables such as:

- Duration
- Heart Rate
- Body Temperature

have higher importance because they are directly related to workout intensity.

### Importance

Feature Importance improves model interpretability by explaining which inputs the model considers most significant.

---

# 🔄 Data Visualization Workflow

The visualization pipeline follows these steps:

```text
Dataset
      │
      ▼
Load Dataset (Pandas)
      │
      ▼
Generate Plotly Figures
      │
      ▼
Convert Figures to JSON
      │
      ▼
FastAPI /analytics Endpoint
      │
      ▼
React API Request
      │
      ▼
Render Interactive Graphs using Plotly
```

This architecture ensures a clean separation between the backend (data processing) and the frontend (visualization).

---

# 💡 Benefits of Interactive Graphs

Compared to static images, interactive Plotly graphs provide:

- Zoom in and out
- Pan across the graph
- Hover tooltips displaying exact values
- Responsive resizing
- Better readability
- Improved user experience
- Professional dashboard appearance

These features make data exploration significantly easier and more engaging.

---

# 🎓 Educational Value

The analytics dashboard is designed not only to present predictions but also to demonstrate the complete Machine Learning workflow.

It allows users to understand:

- How the dataset is distributed
- Which variables influence calorie prediction
- Relationships between different biological measurements
- Why certain features contribute more to the model's decisions

This transforms the application from a simple prediction tool into a comprehensive educational dashboard for Machine Learning and Data Analysis.

---

# 🚀 Summary

The Interactive Analytics Dashboard enhances the project by combining:

- Exploratory Data Analysis (EDA)
- Interactive Data Visualization
- Feature Relationship Analysis
- Model Interpretability
- Modern Full-Stack Development

The integration of **FastAPI**, **Plotly**, and **React** demonstrates how Machine Learning models can be deployed with rich, interactive visualizations, making predictions transparent, explainable, and easier to understand.