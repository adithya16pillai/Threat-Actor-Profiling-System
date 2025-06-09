from sqlalchemy.orm import Session
from ..models import models
from ..schemas import schemas

# ThreatActor CRUD
def get_threat_actor(db: Session, threat_actor_id: int):
    return db.query(models.ThreatActor).filter(models.ThreatActor.id == threat_actor_id).first()

def get_threat_actors(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.ThreatActor).offset(skip).limit(limit).all()

def create_threat_actor(db: Session, threat_actor: schemas.ThreatActorCreate):
    db_threat_actor = models.ThreatActor(**threat_actor.dict())
    db.add(db_threat_actor)
    db.commit()
    db.refresh(db_threat_actor)
    return db_threat_actor

# TTP CRUD
def get_ttp(db: Session, ttp_id: int):
    return db.query(models.TTP).filter(models.TTP.id == ttp_id).first()

def get_ttps(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.TTP).offset(skip).limit(limit).all()

def create_ttp(db: Session, ttp: schemas.TTPCreate):
    db_ttp = models.TTP(**ttp.dict())
    db.add(db_ttp)
    db.commit()
    db.refresh(db_ttp)
    return db_ttp

# IOC CRUD
def get_ioc(db: Session, ioc_id: int):
    return db.query(models.IOC).filter(models.IOC.id == ioc_id).first()

def get_iocs(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.IOC).offset(skip).limit(limit).all()

def create_ioc(db: Session, ioc: schemas.IOCCreate):
    db_ioc = models.IOC(**ioc.dict())
    db.add(db_ioc)
    db.commit()
    db.refresh(db_ioc)
    return db_ioc 