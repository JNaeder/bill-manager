import uuid

from pydantic import BaseModel

class GasBill(BaseModel):
    month: int
    year: int
    dist_cost: float
    adj_cost: float
    service_fee: float

class GasTherm(BaseModel):
    bill_id: uuid.UUID
    therms: float
    gas_cost: float