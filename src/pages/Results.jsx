import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import RouteCard from "../Components/RouteCard";
import { useLocation } from "react-router-dom";

const Results = () => {
  // const location = useLocation();
  // In real app, this would come from API via state or context
  const routes = [
    {
      id: 1,
      name: "Fastest Route",
      distance: 15.5,
      duration: 25,
      vehicle: "car",
      emissions: 3875,
    },
    {
      id: 2,
      name: "Eco Route",
      distance: 18.2,
      duration: 32,
      vehicle: "bike",
      emissions: 0,
    },
    {
      id: 3,
      name: "Public Transport",
      distance: 20.1,
      duration: 35,
      vehicle: "train",
      emissions: 1005,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Route Comparison
      </Typography>
      <Grid container spacing={3}>
        {routes.map((route) => (
          <Grid item xs={12} sm={6} md={4} key={route.id}>
            <RouteCard route={route} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Results;
