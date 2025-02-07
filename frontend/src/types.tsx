export type gasBill = {
  id: number;
  month: number;
  year: number;
  therms: number;
  dist_cost: number;
  adj_cost: number;
  gas_cost: number;
  service_fee: number;
};

export type gasBillInfo = {
  id: number;
  month: number;
  year: number;
  total_therms: number;
  total_cost: number;
};

export type thermRow = {
  id: number;
  bill_id: number;
  therms: number;
  gas_cost: number;
};
