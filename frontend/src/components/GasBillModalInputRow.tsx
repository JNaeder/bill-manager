import { Box, IconButton } from "@mui/material";
import ModalInputNumber from "./ModalInputNumber";
import DeleteIcon from "@mui/icons-material/Delete";
import { thermRow } from "../types";

export default function GasBillModalInputRow({
  data,
  handleChange,
  removeThermRow,
}: {
  data: thermRow;
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
      <IconButton onClick={() => removeThermRow(data.id)}>
        <DeleteIcon />
      </IconButton>
      <ModalInputNumber
        inputLabel="Therms"
        rowName="therms"
        handleChange={handleChange}
        rowId={data.id}
        value={data.therms}
      />
      <ModalInputNumber
        inputLabel="Gas Cost"
        rowName="gas_cost"
        handleChange={handleChange}
        rowId={data.id}
        value={data.gas_cost}
      />
    </Box>
  );
}
