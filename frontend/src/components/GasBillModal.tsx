import {
  Box,
  Modal,
  Typography,
  Select,
  MenuItem,
  FormLabel,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Months } from "../helperStuff";
import axios from "axios";
import GasBillModalInputRow from "./GasBillModalInputRow";
import { thermRow } from "../types";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
export default function GasBillModal({
  modalOpen,
  handleClose,
}: {
  modalOpen: boolean;
  handleClose: () => void;
}) {
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2025);
  const [dist_cost, setDistCost] = useState(0);
  const [adj_cost, setAdjCost] = useState(0);
  const [service_fee, setServiceFee] = useState(0);
  const [thermRows, setThermRows] = useState<thermRow[]>([]);
  const [idCounter, setIdCounter] = useState(0);

  const addThermRow = () => {
    setThermRows([
      ...thermRows,
      {
        id: idCounter,
        bill_id: 0,
        therms: 0,
        gas_cost: 0,
      },
    ]);

    setIdCounter(idCounter + 1);
  };

  const removeThermRow = (rowId: number) => {
    setThermRows(thermRows.filter((row: thermRow) => row.id !== rowId));
  };

  const handleChange = (id: number, field: keyof thermRow, value: any) => {
    setThermRows(
      thermRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const onSubmit = async () => {
    // console.log(month, year, dist_cost, adj_cost, service_fee, thermRows);
    // Create Bill
    const response = await axios.post("http://localhost:8000/gas-bill", {
      month,
      year,
      dist_cost,
      adj_cost,
      service_fee,
    });

    const billID = response.data;

    for (let i = 0; i < thermRows.length; i++) {
      const row = thermRows[i];
      await axios.post("http://localhost:8000/gas-therm", {
        bill_id: billID,
        therms: row.therms,
        gas_cost: row.gas_cost,
      });
    }
    handleClose();
  };

  return (
    <>
      <Modal open={modalOpen} onClose={handleClose}>
        <Box
          sx={{
            width: "80%",
            padding: "50px",
            backgroundColor: "white",
            borderRadius: 2,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Gas Bill</Typography>
          {/* Top Items */}
          <Box sx={{ display: "flex", gap: 2 }}>
            {/* Year */}
            <Box>
              <FormLabel sx={{ marginRight: "10px" }}>Year</FormLabel>
              <Select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              >
                <MenuItem value={2025}>2025</MenuItem>
                <MenuItem value={2024}>2024</MenuItem>
                <MenuItem value={2023}>2023</MenuItem>
                <MenuItem value={2022}>2022</MenuItem>
                <MenuItem value={2021}>2021</MenuItem>
                <MenuItem value={2020}>2020</MenuItem>
                <MenuItem value={2019}>2019</MenuItem>
              </Select>
            </Box>
            {/* Month */}
            <Box>
              <FormLabel sx={{ marginRight: "10px" }}>Month</FormLabel>
              <Select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
              >
                {Object.entries(Months).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            {/* Dist Cost */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FormLabel sx={{ marginRight: "10px" }}>Dist Cost</FormLabel>
              <TextField
                type="number"
                sx={{ width: "100px", marginLeft: "5px" }}
                value={dist_cost}
                onChange={(e) => setDistCost(Number(e.target.value))}
              />
            </Box>
            {/* Adj Cost */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FormLabel sx={{ marginRight: "10px" }}>Adj Cost Cost</FormLabel>
              <TextField
                type="number"
                sx={{ width: "100px", marginLeft: "5px" }}
                value={adj_cost}
                onChange={(e) => setAdjCost(Number(e.target.value))}
              />
            </Box>
            {/* Service Fee */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FormLabel sx={{ marginRight: "10px" }}>Service Fee</FormLabel>
              <TextField
                type="number"
                sx={{ width: "100px", marginLeft: "5px" }}
                value={service_fee}
                onChange={(e) => setServiceFee(Number(e.target.value))}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <Typography variant="h6">Therms</Typography>
            <Button onClick={addThermRow}>
              <AddCircleOutlineIcon />
            </Button>
          </Box>
          {thermRows.map((data, index) => {
            return (
              <GasBillModalInputRow
                key={index}
                handleChange={handleChange}
                removeThermRow={removeThermRow}
                data={data}
              />
            );
          })}
          <Button variant="contained" onClick={onSubmit} sx={{ marginTop: 2 }}>
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
}
