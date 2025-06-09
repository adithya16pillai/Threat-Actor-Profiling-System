from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..crud import crud
from ..schemas import schemas
from ..database import get_db

router = APIRouter(prefix="/iocs", tags=["iocs"])

@router.get("/", response_model=List[schemas.IOC])
def read_iocs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    iocs = crud.get_iocs(db, skip=skip, limit=limit)
    return iocs

@router.post("/", response_model=schemas.IOC)
def create_ioc(ioc: schemas.IOCCreate, db: Session = Depends(get_db)):
    db_ioc = crud.get_ioc(db, ioc_id=ioc.id) if hasattr(ioc, 'id') else None
    if db_ioc:
        raise HTTPException(status_code=400, detail="IOC already exists")
    return crud.create_ioc(db=db, ioc=ioc)

@router.get("/{ioc_id}", response_model=schemas.IOC)
def read_ioc(ioc_id: int, db: Session = Depends(get_db)):
    db_ioc = crud.get_ioc(db, ioc_id=ioc_id)
    if db_ioc is None:
        raise HTTPException(status_code=404, detail="IOC not found")
    return db_ioc 