import { Box, Button } from "@mui/material";
import ModalInputNumber from "./ModalInputNumber";
import { gasBill } from "../types";

export default function GasBillModalInputRow({
  data,
  handleChange,
  removeThermRow,
}: {
  data: gasBill;
  handleChange: Function;
  removeThermRow: Function;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "10px",
      }}
    >
      <Button onClick={() => removeThermRow(data.id)}>X-{data.id}</Button>
      <ModalInputNumber
        inputLabel="Therms"
        rowName="therms"
        handleChange={handleChange}
        rowId={data.id}
        value={data.therms}
      />
      <ModalInputNumber
        inputLabel="Dist Cost"
        rowName="dist_cost"
        handleChange={handleChange}
        rowId={data.id}
        value={data.dist_cost}
      />
      <ModalInputNumber
        inputLabel="Adj Cost"
        rowName="adj_cost"
        handleChange={handleChange}
        rowId={data.id}
        value={data.adj_cost}
      />
      <ModalInputNumber
        inputLabel="Gas Cost"
        rowName="gas_cost"
        handleChange={handleChange}
        rowId={data.id}
        value={data.gas_cost}
      />
      <ModalInputNumber
        inputLabel="Service Fee"
        rowName="service_fee"
        handleChange={handleChange}
        rowId={data.id}
        value={data.service_fee}
      />
    </Box>
  );
}
