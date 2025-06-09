from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import threat_actors, ttps, iocs
from .database.database import engine
from .models.models import Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Threat Actor Profiling System")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(threat_actors.router)
app.include_router(ttps.router)
app.include_router(iocs.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Threat Actor Profiling System API"} 