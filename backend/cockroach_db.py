import os

from psycopg2 import connect
from dotenv import load_dotenv

from my_types import GasBill, GasTherm


class CockroachDB:
    def __init__(self):
        load_dotenv()
        self._conn = connect(os.getenv("DB_URL"))
        self._conn.autocommit = True

    def test(self):
        with self._conn.cursor() as cur:
            cur.execute("SELECT current_database();")
            return cur.fetchone()[0]


    def get_gas_bill_list(self):
        with self._conn.cursor() as cur:
            sql = """
            SELECT b.id, b.month, b.year,
            SUM((t.therms * t.gas_cost) + (t.therms * b.adj_cost) + (t.therms * b.dist_cost)) + b.service_fee AS total_cost,
            SUM(t.therms) AS total_therms
            FROM gas_bills b
            INNER JOIN gas_therms t ON b.id =t.bill_id
            GROUP BY b.id, b.month, b.year, b.service_fee;
            """
            cur.execute(sql)
            columns = [desc[0] for desc in cur.description]
            rows = cur.fetchall()
            result = [dict(zip(columns, row)) for row in rows]
            return result


    def get_gas_info(self):
        with self._conn.cursor() as cur:
            cur.execute("SELECT * FROM gas_bills;")
            columns = [desc[0] for desc in cur.description]
            rows = cur.fetchall()
            result = [dict(zip(columns, row)) for row in rows]
            return result

    def get_gas_bill_one(self, bill_id:str):
        with self._conn.cursor() as cur:
            sql = f"SELECT * FROM gas_bills WHERE gas_bills.id='{bill_id}'"
            cur.execute(sql)
            columns = [desc[0] for desc in cur.description]
            rows = cur.fetchall()
            result = [dict(zip(columns, row)) for row in rows]
            return result

    def get_all_therm_rows_by_bill_id(self, bill_id: str):
        with self._conn.cursor() as cur:
            sql = f"SELECT * FROM gas_therms WHERE gas_therms.bill_id='{bill_id}'"
            cur.execute(sql)
            columns = [desc[0] for desc in cur.description]
            rows = cur.fetchall()
            result = [dict(zip(columns, row)) for row in rows]
            return result

    def create_gas_bill(self, gas_bill: GasBill):
        sql = f"""
        INSERT INTO
        gas_bills (month, year, dist_cost, adj_cost, service_fee)
        VALUES ({gas_bill.month}, {gas_bill.year}, {gas_bill.dist_cost}, {gas_bill.adj_cost},{gas_bill.service_fee})
        RETURNING id;
        """
        with self._conn.cursor() as cur:
            cur.execute(sql)
            row_id = cur.fetchall()[0][0]
            return row_id


    def create_gas_therm(self, gas_therm: GasTherm):
        sql = f"""
        INSERT INTO
        gas_therms (bill_id, therms, gas_cost)
        VALUES ('{gas_therm.bill_id}', {gas_therm.therms}, {gas_therm.gas_cost});
        """
        with self._conn.cursor() as cur:
            cur.execute(sql)
