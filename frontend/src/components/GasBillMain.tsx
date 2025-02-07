import { useState, useEffect } from "react";
import axios from "axios";
import { gasBillInfo } from "../types";
import { Months } from "../helperStuff";
import { Box, Typography, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import GasBillModal from "./GasBillModal";

export default function GasBillMain() {
  const [gasBillInfo, setGasBillInfo] = useState<gasBillInfo[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentBillId, setCurrentBillId] = useState<string | null>(null);

  const handleOpen = () => {
    setCurrentBillId(null);
    setModalOpen(true);
  };
  const handleClose = () => setModalOpen(false);

  useEffect(() => {
    const getGasBillInfo = async () => {
      const response = await axios.get("http://localhost:8000/gas-list");
      setGasBillInfo(response.data);
    };

    getGasBillInfo();
  }, []);

  const columns: GridColDef<gasBillInfo>[] = [
    { field: "year", headerName: "Year", flex: 1 },
    {
      field: "month",
      headerName: "Month",
      flex: 1,
      valueGetter: (_: any, row: gasBillInfo) => {
        return Months[row.month];
      },
    },
    {
      field: "total_cost",
      headerName: "Total Cost",
      flex: 1,
      valueGetter: (_: any, row: gasBillInfo) => {
        return `$${row.total_cost.toFixed(2)}`;
      },
    },
    {
      field: "total_therms",
      headerName: "Total Therms",
      flex: 1,
      valueGetter: (_: any, row: gasBillInfo) => {
        return row.total_therms.toFixed(2);
      },
    },
    {
      field: "view_bill",
      headerName: "View Bill",
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            onClick={() => {
              setCurrentBillId(params.row.id);
              setModalOpen(true);
            }}
          >
            View
          </Button>
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Gas Bills</Typography>
          <Button onClick={handleOpen}>
            <AddCircleOutlineIcon />
          </Button>
        </Box>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <DataGrid rows={gasBillInfo} columns={columns} />
        </Box>
        <GasBillModal
          modalOpen={modalOpen}
          handleClose={handleClose}
          currentBillId={currentBillId}
        />
      </Box>
    </>
  );
}
