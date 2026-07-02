from datetime import datetime

def health_status():

    return {
        "status": "Healthy",
        "model": "XGBoost",
        "version": "1.0.0",
        "timestamp": datetime.utcnow().isoformat()
    }