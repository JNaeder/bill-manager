import os

from psycopg2 import connect
from dotenv import load_dotenv

from my_types import GasBill


class CockroachDB:
    def __init__(self):
        load_dotenv()
        self._conn = connect(os.getenv("DB_URL"))
        self._conn.autocommit = True

    def test(self):
        with self._conn.cursor() as cur:
            cur.execute("SELECT current_database();")
            return cur.fetchone()[0]

    def get_gas_info(self):
        with self._conn.cursor() as cur:
            cur.execute("SELECT * FROM gas;")
            columns = [desc[0] for desc in cur.description]
            rows = cur.fetchall()
            result = [dict(zip(columns, row)) for row in rows]
            return result

    def create_gas_info(self, gas_bill: GasBill):
        with self._conn.cursor() as cur:
            cur.execute(f"INSERT INTO gas (month, year, therms, dist_cost, adj_cost, gas_cost, service_fee) VALUES ({gas_bill.month}, {gas_bill.year}, {gas_bill.therms}, {gas_bill.dist_cost}, {gas_bill.adj_cost},{gas_bill.gas_cost},{gas_bill.service_fee})")