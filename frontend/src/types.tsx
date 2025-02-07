export type gasBill = {
  id: number;
  month: number;
  year: number;
  dist_cost: number;
  adj_cost: number;
  service_fee: number;
};

export type gasBillInfo = {
  id: string;
  month: number;
  year: number;
  total_therms: number;
  total_cost: number;
};

export type thermRow = {
  id: string;
  bill_id: string;
  therms: number;
  gas_cost: number;
};
