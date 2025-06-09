from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship
from .database import Base

# Association table for many-to-many relationship between ThreatActor and TTP
threat_actor_ttp = Table(
    "threat_actor_ttp",
    Base.metadata,
    Column("threat_actor_id", Integer, ForeignKey("threat_actors.id")),
    Column("ttp_id", Integer, ForeignKey("ttps.id"))
)

class ThreatActor(Base):
    __tablename__ = "threat_actors"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    aliases = Column(String)
    description = Column(String)
    country = Column(String)
    motivations = Column(String)
    ttps = relationship("TTP", secondary=threat_actor_ttp, back_populates="threat_actors")
    iocs = relationship("IOC", back_populates="threat_actor")

class TTP(Base):
    __tablename__ = "ttps"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    description = Column(String)
    mitre_id = Column(String)
    threat_actors = relationship("ThreatActor", secondary=threat_actor_ttp, back_populates="ttps")

class IOC(Base):
    __tablename__ = "iocs"
    id = Column(Integer, primary_key=True, index=True)
    type = Column(String)  # e.g., "ip", "hash", "domain", "url"
    value = Column(String, index=True)
    threat_actor_id = Column(Integer, ForeignKey("threat_actors.id"))
    threat_actor = relationship("ThreatActor", back_populates="iocs") 