import {
  Box,
  Modal,
  Typography,
  Select,
  MenuItem,
  FormLabel,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import { Months } from "../helperStuff";
import axios from "axios";

export default function GasBillModal({
  modalOpen,
  handleClose,
}: {
  modalOpen: boolean;
  handleClose: () => void;
}) {
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2025);
  const [therms, setTherms] = useState(0);
  const [distCost, setDistCost] = useState(0);
  const [adjCost, setAdjCost] = useState(0);
  const [gasCost, setGasCost] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);

  const onSubmit = async () => {
    const gasData = {
      month,
      year,
      therms,
      dist_cost: distCost,
      adj_cost: adjCost,
      gas_cost: gasCost,
      service_fee: serviceFee,
    };
    const response = await axios.post("http://localhost:8000/gas", gasData);
    console.log(response);
    handleClose();
  };

  return (
    <>
      <Modal open={modalOpen} onClose={handleClose}>
        <Box
          sx={{
            // width: "50%",
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
          {/* Therms */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              marginTop: 2,
              alignItems: "center",
            }}
          >
            <FormLabel sx={{ marginRight: "10px" }}>Therms</FormLabel>
            <TextField
              type="number"
              value={therms}
              onChange={(e) => setTherms(Number(e.target.value))}
            />
          </Box>
          {/* Dist Charges */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              marginTop: 2,
              alignItems: "center",
            }}
          >
            <FormLabel sx={{ marginRight: "10px" }}>Dist Cost</FormLabel>
            <TextField
              type="number"
              value={distCost}
              onChange={(e) => setDistCost(Number(e.target.value))}
            />
          </Box>
          {/* Adj Cost */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              marginTop: 2,
              alignItems: "center",
            }}
          >
            <FormLabel sx={{ marginRight: "10px" }}>Adj Cost</FormLabel>
            <TextField
              type="number"
              value={adjCost}
              onChange={(e) => setAdjCost(Number(e.target.value))}
            />
          </Box>
          {/* Gas Cost */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              marginTop: 2,
              alignItems: "center",
            }}
          >
            <FormLabel sx={{ marginRight: "10px" }}>Gas Cost</FormLabel>
            <TextField
              type="number"
              value={gasCost}
              onChange={(e) => setGasCost(Number(e.target.value))}
            />
          </Box>
          {/* Service Fee*/}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              marginTop: 2,
              alignItems: "center",
            }}
          >
            <FormLabel sx={{ marginRight: "10px" }}>Service Fee</FormLabel>
            <TextField
              type="number"
              value={serviceFee}
              onChange={(e) => setServiceFee(Number(e.target.value))}
            />
          </Box>
          <Button variant="contained" onClick={onSubmit} sx={{ marginTop: 2 }}>
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
}
