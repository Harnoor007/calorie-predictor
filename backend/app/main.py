from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
from app.logger import logger
import time
#for backend only done analytics changes
from app.schemas import PredictionRequest, PredictionResponse
from app.predictor import predictor
from app.utils import health_status
from app.analytics import get_analytics



app = FastAPI(
    title="Calories Burnt Prediction API",
    description="""
Predict the number of calories burned during a workout using a trained XGBoost Machine Learning model.

Features:
- FastAPI Backend
- XGBoost Model
- Data Validation
- Automatic API Documentation
""",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # We'll tighten this later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def add_process_time(request, call_next):

    start_time = time.perf_counter()

    response = await call_next(request)

    process_time = time.perf_counter() - start_time

    response.headers["X-Process-Time"] = f"{process_time:.4f}s"

    return response

@app.get(
        "/",
        tags=["General"]
    )
def root():
    return {
        "message": "Calories Burnt Prediction API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health"
    }


@app.get(
        "/health",
        tags=["General"]
    )
def health():
    return health_status()

@app.get(
    "/model-info",
    tags=["General"]
)
def model_info():

    return {
        "model_name": "Calories Burnt Prediction",
        "algorithm": "XGBoost Regressor",
        "version": "1.0.0",
        "trained_features": 7,
        "target": "Calories Burned",
        "best_model": "XGBoost"
    }

@app.get(
    "/analytics",
    tags=["Analytics"]
)
def analytics():

    return get_analytics()

@app.post(
    "/predict",
    tags=["Prediction"],
    response_model=PredictionResponse
)
def predict(data: PredictionRequest):
    
    try:

        prediction = predictor.predict(data)

        return {
            "status": "success",
            "model": "XGBoost",
            "prediction": {
                "calories_burned": prediction,
                "unit": "kcal"
            }
        }

    except Exception:

        logger.exception("Prediction Failed")

        raise HTTPException(
            status_code=500,
            detail="Prediction failed."
        )