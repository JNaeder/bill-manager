import { Box, FormLabel, TextField } from "@mui/material";

export default function ModalInputNumber({
  inputLabel,
  handleChange,
  rowId,
  rowName,
}: {
  inputLabel: string;
  handleChange: Function;
  rowId: number;
  rowName: string;
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
        //   value={gasCost}
        onChange={(e) => handleChange(rowId, rowName, Number(e.target.value))}
      />
    </Box>
  );
}
