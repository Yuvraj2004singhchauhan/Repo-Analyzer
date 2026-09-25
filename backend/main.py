from fastapi import FastAPI

app = FastAPI(
    title="AI GitHub Repository Analyzer",
    description="Analyze GitHub repositories using AI",
    version="1.0.0",
)


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