from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..crud import crud
from ..schemas import schemas
from ..database import get_db

router = APIRouter(prefix="/ttps", tags=["ttps"])

@router.get("/", response_model=List[schemas.TTP])
def read_ttps(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    ttps = crud.get_ttps(db, skip=skip, limit=limit)
    return ttps

@router.post("/", response_model=schemas.TTP)
def create_ttp(ttp: schemas.TTPCreate, db: Session = Depends(get_db)):
    db_ttp = crud.get_ttp(db, ttp_id=ttp.id) if hasattr(ttp, 'id') else None
    if db_ttp:
        raise HTTPException(status_code=400, detail="TTP already exists")
    return crud.create_ttp(db=db, ttp=ttp)

@router.get("/{ttp_id}", response_model=schemas.TTP)
def read_ttp(ttp_id: int, db: Session = Depends(get_db)):
    db_ttp = crud.get_ttp(db, ttp_id=ttp_id)
    if db_ttp is None:
        raise HTTPException(status_code=404, detail="TTP not found")
    return db_ttp 