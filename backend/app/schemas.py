from pydantic import BaseModel
from typing import List, Optional

class TTPBase(BaseModel):
    name: str
    description: Optional[str] = None
    mitre_id: Optional[str] = None

class TTPCreate(TTPBase):
    pass

class TTP(TTPBase):
    id: int
    class Config:
        orm_mode = True

class IOCBase(BaseModel):
    type: str
    value: str

class IOCCreate(IOCBase):
    threat_actor_id: int

class IOC(IOCBase):
    id: int
    threat_actor_id: int
    class Config:
        orm_mode = True

class ThreatActorBase(BaseModel):
    name: str
    aliases: Optional[str] = None
    description: Optional[str] = None
    country: Optional[str] = None
    motivations: Optional[str] = None

class ThreatActorCreate(ThreatActorBase):
    pass

class ThreatActor(ThreatActorBase):
    id: int
    ttps: List[TTP] = []
    iocs: List[IOC] = []
    class Config:
        orm_mode = True 