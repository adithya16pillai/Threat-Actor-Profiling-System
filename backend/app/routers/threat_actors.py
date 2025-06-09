from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..crud import crud
from ..schemas import schemas
from ..database import get_db

router = APIRouter(prefix="/threat-actors", tags=["threat-actors"])

@router.get("/", response_model=List[schemas.ThreatActor])
def read_threat_actors(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    threat_actors = crud.get_threat_actors(db, skip=skip, limit=limit)
    return threat_actors

@router.post("/", response_model=schemas.ThreatActor)
def create_threat_actor(threat_actor: schemas.ThreatActorCreate, db: Session = Depends(get_db)):
    db_threat_actor = crud.get_threat_actor(db, threat_actor_id=threat_actor.id) if hasattr(threat_actor, 'id') else None
    if db_threat_actor:
        raise HTTPException(status_code=400, detail="Threat actor already exists")
    return crud.create_threat_actor(db=db, threat_actor=threat_actor)

@router.get("/{threat_actor_id}", response_model=schemas.ThreatActor)
def read_threat_actor(threat_actor_id: int, db: Session = Depends(get_db)):
    db_threat_actor = crud.get_threat_actor(db, threat_actor_id=threat_actor_id)
    if db_threat_actor is None:
        raise HTTPException(status_code=404, detail="Threat actor not found")
    return db_threat_actor 