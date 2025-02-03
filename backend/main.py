from cockroach_db import CockroachDB
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from my_types import GasBill

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
    gas_info = db.get_gas_info()
    return gas_info

@app.post("/gas")
async def create_new_gas_info(gas_bill: GasBill):
    db.create_gas_info(gas_bill)
    return 201