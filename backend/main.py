from cockroach_db import CockroachDB
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from my_types import GasBill, GasTherm

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db = CockroachDB()

@app.get("/")
async def test():
    db_name = db.test()
    return {"message": f"Connected to DB: {db_name}"}

@app.get("/gas")
async def get_gas_info():
    return db.get_gas_info()

@app.get("/gas-bill-one")
async def get_gas_bill_one(bill_id: str):
    return db.get_gas_bill_one(bill_id)

@app.get("/gas-therms")
async def get_gas_therms_by_bill_id(bill_id: str):
    return db.get_all_therm_rows_by_bill_id(bill_id)

@app.get("/gas-list")
async def get_gas_bill_list():
    return db.get_gas_bill_list()

@app.post("/gas-bill")
async def create_new_gas_bill(gas_bill: GasBill):
    bill_id = db.create_gas_bill(gas_bill)
    return str(bill_id)


@app.post("/gas-therm")
async def create_new_gas_therm(gas_therm: GasTherm):
    return db.create_gas_therm(gas_therm)