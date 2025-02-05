import { Box, FormLabel, TextField } from "@mui/material";

export default function ModalInputNumber({
  inputLabel,
  handleChange,
  rowId,
  rowName,
  value,
}: {
  inputLabel: string;
  handleChange: Function;
  rowId: number;
  rowName: string;
  value: number;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <FormLabel sx={{ marginLeft: "10px" }}>{inputLabel}</FormLabel>
      <TextField
        type="number"
        sx={{ width: "100px", marginLeft: "5px" }}
        value={value}
        onChange={(e) => handleChange(rowId, rowName, Number(e.target.value))}
      />
    </Box>
  );
}
