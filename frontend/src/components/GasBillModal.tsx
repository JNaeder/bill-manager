import {
  Box,
  Modal,
  Typography,
  Select,
  MenuItem,
  FormLabel,
  Button,
} from "@mui/material";
import { useState } from "react";
import { Months } from "../helperStuff";
// import axios from "axios";
import GasBillModalInputRow from "./GasBillModalInputRow";
import { gasBill } from "../types";
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
  const [thermRows, setThermRows] = useState<gasBill[]>([]);
  const [idCounter, setIdCounter] = useState(0);

  const addThermRow = () => {
    setThermRows([
      ...thermRows,
      {
        id: idCounter,
        month,
        year,
        therms: 0,
        dist_cost: 0,
        adj_cost: 0,
        gas_cost: 0,
        service_fee: 0,
      },
    ]);

    setIdCounter(idCounter + 1);
  };

  const removeThermRow = (rowId: number) => {
    setThermRows(thermRows.filter((row: gasBill) => row.id !== rowId));
  };

  const handleChange = (id: number, field: keyof gasBill, value: any) => {
    setThermRows(
      thermRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const onSubmit = async () => {
    for (let i = 0; i < thermRows.length; i++) {
      const gasData = {
        month,
        year,
        therms: thermRows[i].therms,
        dist_cost: thermRows[i].dist_cost,
        adj_cost: thermRows[i].adj_cost,
        gas_cost: thermRows[i].gas_cost,
        service_fee: thermRows[i].service_fee,
      };

      console.log(gasData);
      // const response = await axios.post("http://localhost:8000/gas", gasData);
      // console.log(response);
    }
    //   handleClose();
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
          <Typography variant="h4">New Gas Bill</Typography>
          {/* Month and Year */}
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
