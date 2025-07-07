import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Grid,
} from "@mui/material";
import { DirectionsCar, DirectionsBike, Train } from "@mui/icons-material";

const vehicleIcons = {
  car: <DirectionsCar />,
  bike: <DirectionsBike />,
  train: <Train />,
};

const RouteCard = ({ route }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {route.name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          {vehicleIcons[route.vehicle] || <DirectionsCar />}
          <Typography variant="body1" sx={{ ml: 1 }}>
            {route.vehicle}
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2">Distance</Typography>
            <Typography>{route.distance} km</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">Duration</Typography>
            <Typography>{route.duration} mins</Typography>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Box
              sx={{
                bgcolor:
                  route.emissions > 2000 ? "error.light" : "success.light",
                p: 2,
                borderRadius: 1,
                textAlign: "center",
              }}
            >
              <Typography variant="h6">{route.emissions} g CO₂</Typography>
              <Typography variant="caption">Total Emissions</Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RouteCard;
