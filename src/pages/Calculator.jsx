// import React, { useState } from "react";
// import { Grid, TextField, Button, Box, Typography } from "@mui/material";
// import { Place, MyLocation } from "@mui/icons-material";
// import VehicleSelector from "../Components/VehicleSelector";
// import { useNavigate } from "react-router-dom";

// const Calculator = () => {
//   const [origin, setOrigin] = useState("");
//   const [destination, setDestination] = useState("");
//   const [vehicle, setVehicle] = useState("car");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     navigate("/results");
//   };

//   return (
//     <Box sx={{ p: 3, width: "60%", margin: "0 auto", marginTop: "10vh" }}>
//       <Typography variant="h4" gutterBottom>
//         Emission Calculator
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6}>
//             <TextField
//               fullWidth
//               label="Start Location"
//               value={origin}
//               onChange={(e) => setOrigin(e.target.value)}
//               InputProps={{
//                 startAdornment: <MyLocation color="primary" sx={{ mr: 1 }} />,
//               }}
//               inputProps={{
//                 maxlength: 30,
//               }}
//             />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TextField
//               fullWidth
//               label="Destination"
//               value={destination}
//               onChange={(e) => setDestination(e.target.value)}
//               InputProps={{
//                 startAdornment: <Place color="primary" sx={{ mr: 1 }} />,
//               }}
//               inputProps={{
//                 maxlength: 30,
//               }}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <VehicleSelector value={vehicle} onChange={setVehicle} />
//           </Grid>
//           <Grid item xs={12}>
//             <Button
//               type="submit"
//               variant="contained"
//               size="large"
//               fullWidth
//               disabled={!origin || !destination}
//               sx={{
//                 background:
//                   "linear-gradient(to right, #8f29d0, #6467da, #0aebee)",
//                 p: 1.8,
//               }}
//             >
//               Calculate Emissions
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </Box>
//   );
// };

// export default Calculator;

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Autocomplete,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Place, MyLocation } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Calculator = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [startSuggestions, setStartSuggestions] = useState([]);
  const [endSuggestions, setEndSuggestions] = useState([]);
  const navigate = useNavigate();

  const fetchSuggestions = async (query, isStart) => {
    if (query.length < 3) return;
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=5`
      );
      const suggestions = response.data.map((item) => ({
        label: item.display_name,
        lat: item.lat,
        lng: item.lon,
      }));
      isStart
        ? setStartSuggestions(suggestions)
        : setEndSuggestions(suggestions);
    } catch (err) {
      console.error("Suggestion error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!start || !end) return;

    setLoading(true);
    setError(null);

    try {
      // Step 1: Get coordinates
      const [startRes, endRes] = await Promise.all([
        axios.get(
          `https://nominatim.openstreetmap.org/search?q=${start}&format=json&limit=1`
        ),
        axios.get(
          `https://nominatim.openstreetmap.org/search?q=${end}&format=json&limit=1`
        ),
      ]);

      if (!startRes.data[0] || !endRes.data[0]) {
        throw new Error("One or both locations not found");
      }

      const startCoord = {
        lat: parseFloat(startRes.data[0].lat),
        lng: parseFloat(startRes.data[0].lon),
        name: startRes.data[0].display_name,
      };

      const endCoord = {
        lat: parseFloat(endRes.data[0].lat),
        lng: parseFloat(endRes.data[0].lon),
        name: endRes.data[0].display_name,
      };

      // Step 2: Get routes
      const routesRes = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${startCoord.lng},${startCoord.lat};${endCoord.lng},${endCoord.lat}?alternatives=true&overview=full`
      );

      if (!routesRes.data.routes || routesRes.data.routes.length === 0) {
        throw new Error("No routes found between these locations");
      }

      // Step 3: Get air quality
      let airQuality = "Data unavailable";
      try {
        const aqiRes = await axios.get(
          `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${startCoord.lat}&longitude=${startCoord.lng}&hourly=pm2_5`
        );
        airQuality = `${aqiRes.data.hourly.pm2_5[0]} µg/m³ PM2.5`;
      } catch (aqiError) {
        console.warn("Air quality data not available");
      }

      // Prepare route data
      const routes = routesRes.data.routes.slice(0, 2).map((route, i) => ({
        id: i,
        name: i === 0 ? "Fastest Route" : "Eco Route",
        distance: (route.distance / 1000).toFixed(1) + " km",
        duration: (route.duration / 60).toFixed(0) + " mins",
        coordinates: route.geometry?.coordinates || [],
        emissions: Math.round((route.distance / 1000) * 250) + " g CO₂",
        airQuality,
      }));

      navigate("/results", { state: { routes, startCoord, endCoord } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        Green Route Calculator
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Autocomplete
            freeSolo
            options={startSuggestions}
            getOptionLabel={(option) => option.label || ""}
            onInputChange={(_, value) => {
              setStart(value);
              fetchSuggestions(value, true);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Start Location"
                required
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <MyLocation color="primary" sx={{ mr: 1 }} />,
                }}
              />
            )}
          />

          <Autocomplete
            freeSolo
            options={endSuggestions}
            getOptionLabel={(option) => option.label || ""}
            onInputChange={(_, value) => {
              setEnd(value);
              fetchSuggestions(value, false);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Destination"
                required
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <Place color="primary" sx={{ mr: 1 }} />,
                }}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={!start || !end || loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : "Calculate Routes"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Calculator;
