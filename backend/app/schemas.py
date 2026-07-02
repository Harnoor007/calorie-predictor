from enum import Enum

from pydantic import BaseModel, Field


class Gender(str, Enum):
    male = "male"
    female = "female"


class PredictionRequest(BaseModel):

    gender: Gender = Field(
        ...,
        description="Gender of the person"
    )

    age: int = Field(
        ...,
        ge=1,
        le=120,
        description="Age in years",
        examples=[25]
    )

    height: float = Field(
        ...,
        ge=50,
        le=250,
        description="Height in centimeters",
        examples=[175]
    )

    weight: float = Field(
        ...,
        ge=10,
        le=300,
        description="Weight in kilograms",
        examples=[70]
    )

    duration: float = Field(
        ...,
        ge=1,
        le=600,
        description="Workout duration in minutes",
        examples=[30]
    )

    heart_rate: float = Field(
        ...,
        ge=30,
        le=250,
        description="Heart rate (BPM)",
        examples=[120]
    )

    body_temp: float = Field(
        ...,
        ge=30,
        le=45,
        description="Body temperature in Celsius",
        examples=[39]
    )

class Prediction(BaseModel):
    calories_burned: float
    unit: str

class PredictionResponse(BaseModel):
    status: str
    model: str
    prediction: Prediction