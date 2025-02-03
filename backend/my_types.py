from pydantic import BaseModel

class GasBill(BaseModel):
    month: int
    year: int
    therms: float
    dist_cost: float
    adj_cost: float
    gas_cost: float
    service_fee: float