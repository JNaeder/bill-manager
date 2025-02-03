import { useState, useEffect } from "react";
import axios from "axios";
import { gasBill } from "../types";
import { Months } from "../helperStuff";
import { Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import GasBillModal from "./GasBillModal";

export default function GasBillMain() {
  const [gasBillInfo, setGasBillInfo] = useState<gasBill[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  useEffect(() => {
    const getGasBillInfo = async () => {
      const response = await axios.get("http://localhost:8000/gas");
      setGasBillInfo(response.data);
    };

    getGasBillInfo();
  }, []);

  const columns = [
    { field: "year", headerName: "Year" },
    {
      field: "month",
      headerName: "Month",
      valueGetter: (_: any, row: gasBill) => {
        return Months[row.month];
      },
    },
    { field: "therms", headerName: "Therms" },
    { field: "dist_cost", headerName: "Distribution Cost" },
    { field: "adj_cost", headerName: "Adjustment Cost" },
    { field: "gas_cost", headerName: "Gas Cost" },
    { field: "service_fee", headerName: "Service Fee" },
    {
      field: "total_cost",
      headerName: "Total Cost",
      width: 150,
      valueGetter: (_: any, row: gasBill) => {
        return (
          Math.round(
            (row.dist_cost * row.therms +
              row.adj_cost * row.therms +
              row.gas_cost * row.therms +
              row.service_fee) *
              100
          ) / 100
        );
      },
    },
  ];

  return (
    <>
      <Box
        sx={{
          width: "80%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Gas Bill</Typography>
        <Button variant="outlined" onClick={handleOpen}>
          New
        </Button>
        <DataGrid rows={gasBillInfo} columns={columns} />
        <GasBillModal modalOpen={modalOpen} handleClose={handleClose} />
      </Box>
    </>
  );
}
