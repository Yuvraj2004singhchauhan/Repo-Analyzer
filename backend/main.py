from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.repository import router as repository_router


app = FastAPI(
    title="AI GitHub Repository Analyzer",
    description="Analyze GitHub repositories using AI",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(repository_router)


@app.get("/")
def root():
    return {
        "message": "AI GitHub Repository Analyzer API is running"
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy"
    }