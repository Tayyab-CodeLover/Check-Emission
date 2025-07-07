import React, { useState } from "react";
import { Grid, TextField, Button, Box, Typography } from "@mui/material";
import { Place, MyLocation } from "@mui/icons-material";
import VehicleSelector from "../Components/VehicleSelector";

const Calculator = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicle, setVehicle] = useState("car");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigation to results will be handled after API integration
  };

  return (
    <Box sx={{ p: 3, width: "60%", margin: "0 auto", marginTop: "10vh" }}>
      <Typography variant="h4" gutterBottom>
        Emission Calculator
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Start Location"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              InputProps={{
                startAdornment: <MyLocation color="primary" sx={{ mr: 1 }} />,
              }}
              inputProps={{
                maxlength: 30,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              InputProps={{
                startAdornment: <Place color="primary" sx={{ mr: 1 }} />,
              }}
              inputProps={{
                maxlength: 30,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <VehicleSelector value={vehicle} onChange={setVehicle} />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={!origin || !destination}
              sx={{
                background:
                  "linear-gradient(to right, #8f29d0, #6467da, #0aebee)",
                p: 1.8,
              }}
            >
              Calculate Emissions
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Calculator;
