import { Box } from "@mui/material";
import ModalInputNumber from "./ModalInputNumber";

export default function GasBillModalInputRow({
  handleChange,
  rowId,
}: {
  handleChange: Function;
  rowId: number;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <ModalInputNumber
        inputLabel="Therms"
        rowName="therms"
        handleChange={handleChange}
        rowId={rowId}
      />
      <ModalInputNumber
        inputLabel="Dist Cost"
        rowName="dist_cost"
        handleChange={handleChange}
        rowId={rowId}
      />
      <ModalInputNumber
        inputLabel="Adj Cost"
        rowName="adj_cost"
        handleChange={handleChange}
        rowId={rowId}
      />
      <ModalInputNumber
        inputLabel="Gas Cost"
        rowName="gas_cost"
        handleChange={handleChange}
        rowId={rowId}
      />
      <ModalInputNumber
        inputLabel="Service Fee"
        rowName="service_fee"
        handleChange={handleChange}
        rowId={rowId}
      />
    </Box>
  );
}
