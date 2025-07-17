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

// import React, { useState } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Autocomplete,
//   CircularProgress,
//   Alert,
// } from "@mui/material";
// import { Place, MyLocation } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Calculator = () => {
//   const [start, setStart] = useState("");
//   const [end, setEnd] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [startSuggestions, setStartSuggestions] = useState([]);
//   const [endSuggestions, setEndSuggestions] = useState([]);
//   const navigate = useNavigate();

//   const fetchSuggestions = async (query, isStart) => {
//     if (query.length < 3) return;
//     try {
//       const response = await axios.get(
//         `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=5`
//       );
//       const suggestions = response.data.map((item) => ({
//         label: item.display_name,
//         lat: item.lat,
//         lng: item.lon,
//       }));
//       isStart
//         ? setStartSuggestions(suggestions)
//         : setEndSuggestions(suggestions);
//     } catch (err) {
//       console.error("Suggestion error:", err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!start || !end) return;

//     setLoading(true);
//     setError(null);

//     try {
//       // Step 1: Get coordinates
//       const [startRes, endRes] = await Promise.all([
//         axios.get(
//           `https://nominatim.openstreetmap.org/search?q=${start}&format=json&limit=1`
//         ),
//         axios.get(
//           `https://nominatim.openstreetmap.org/search?q=${end}&format=json&limit=1`
//         ),
//       ]);

//       if (!startRes.data[0] || !endRes.data[0]) {
//         throw new Error("One or both locations not found");
//       }

//       const startCoord = {
//         lat: parseFloat(startRes.data[0].lat),
//         lng: parseFloat(startRes.data[0].lon),
//         name: startRes.data[0].display_name,
//       };

//       const endCoord = {
//         lat: parseFloat(endRes.data[0].lat),
//         lng: parseFloat(endRes.data[0].lon),
//         name: endRes.data[0].display_name,
//       };

//       // Step 2: Get routes
//       const routesRes = await axios.get(
//         `https://router.project-osrm.org/route/v1/driving/${startCoord.lng},${startCoord.lat};${endCoord.lng},${endCoord.lat}?alternatives=true&overview=full`
//       );

//       if (!routesRes.data.routes || routesRes.data.routes.length === 0) {
//         throw new Error("No routes found between these locations");
//       }

//       // Step 3: Get air quality
//       let airQuality = "Data unavailable";
//       try {
//         const aqiRes = await axios.get(
//           `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${startCoord.lat}&longitude=${startCoord.lng}&hourly=pm2_5`
//         );
//         airQuality = `${aqiRes.data.hourly.pm2_5[0]} µg/m³ PM2.5`;
//       } catch (aqiError) {
//         console.warn("Air quality data not available");
//       }

//       // Prepare route data
//       const routes = routesRes.data.routes.slice(0, 3).map((route, i) => ({
//         id: i,
//         name: i === 0 ? "Fastest Route" : "Eco Route",
//         distance: (route.distance / 1000).toFixed(1) + " km",
//         duration: (route.duration / 60).toFixed(0) + " mins",
//         coordinates: route.geometry?.coordinates || [],
//         emissions: Math.round((route.distance / 1000) * 250) + " g CO₂",
//         airQuality,
//       }));

//       navigate("/results", { state: { routes, startCoord, endCoord } });
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ p: 3, maxWidth: 800, margin: "0 auto" }}>
//       <Typography variant="h4" gutterBottom>
//         Green Route Calculator
//       </Typography>

//       {error && (
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {error}
//         </Alert>
//       )}

//       <form onSubmit={handleSubmit}>
//         <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
//           <Autocomplete
//             freeSolo
//             options={startSuggestions}
//             getOptionLabel={(option) => option.label || ""}
//             onInputChange={(_, value) => {
//               setStart(value);
//               fetchSuggestions(value, true);
//             }}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="Start Location"
//                 required
//                 InputProps={{
//                   ...params.InputProps,
//                   startAdornment: <MyLocation color="primary" sx={{ mr: 1 }} />,
//                 }}
//               />
//             )}
//           />

//           <Autocomplete
//             freeSolo
//             options={endSuggestions}
//             getOptionLabel={(option) => option.label || ""}
//             onInputChange={(_, value) => {
//               setEnd(value);
//               fetchSuggestions(value, false);
//             }}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="Destination"
//                 required
//                 InputProps={{
//                   ...params.InputProps,
//                   startAdornment: <Place color="primary" sx={{ mr: 1 }} />,
//                 }}
//               />
//             )}
//           />

//           <Button
//             type="submit"
//             variant="contained"
//             size="large"
//             disabled={!start || !end || loading}
//             sx={{ mt: 2 }}
//           >
//             {loading ? <CircularProgress size={24} /> : "Calculate Routes"}
//           </Button>
//         </Box>
//       </form>
//     </Box>
//   );
// };

// export default Calculator;

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Autocomplete,
//   CircularProgress,
//   Alert,
// } from "@mui/material";
// import { Place, MyLocation } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import debounce from "lodash.debounce";

// const Calculator = () => {
//   const [start, setStart] = useState("");
//   const [end, setEnd] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [startSuggestions, setStartSuggestions] = useState([]);
//   const [endSuggestions, setEndSuggestions] = useState([]);
//   const navigate = useNavigate();

//   // Debounced suggestion fetcher
//   const fetchSuggestions = debounce(async (query, isStart) => {
//     if (query.length < 3) return;
//     try {
//       const response = await axios.get(
//         `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=5&addressdetails=1`
//       );
//       const suggestions = response.data.map((item) => ({
//         label: `${item.display_name}`,
//         lat: item.lat,
//         lng: item.lon,
//       }));
//       isStart
//         ? setStartSuggestions(suggestions)
//         : setEndSuggestions(suggestions);
//     } catch (err) {
//       console.error("Suggestion error:", err);
//     }
//   }, 300);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!start || !end) return;

//     setLoading(true);
//     setError(null);

//     try {
//       // Get coordinates
//       const [startRes, endRes] = await Promise.all([
//         axios.get(
//           `https://nominatim.openstreetmap.org/search?q=${start}&format=json&limit=1`
//         ),
//         axios.get(
//           `https://nominatim.openstreetmap.org/search?q=${end}&format=json&limit=1`
//         ),
//       ]);

//       if (!startRes.data[0] || !endRes.data[0]) {
//         throw new Error("One or both locations not found");
//       }

//       const startCoord = {
//         lat: parseFloat(startRes.data[0].lat),
//         lng: parseFloat(startRes.data[0].lon),
//         name: startRes.data[0].display_name,
//       };

//       const endCoord = {
//         lat: parseFloat(endRes.data[0].lat),
//         lng: parseFloat(endRes.data[0].lon),
//         name: endRes.data[0].display_name,
//       };

//       // Get multiple routes
//       const routesRes = await axios.get(
//         `https://router.project-osrm.org/route/v1/driving/${startCoord.lng},${startCoord.lat};${endCoord.lng},${endCoord.lat}?alternatives=3&overview=full`
//       );

//       if (!routesRes.data.routes || routesRes.data.routes.length === 0) {
//         throw new Error("No routes found between these locations");
//       }

//       // Prepare route data - ensure we always have 3 routes
//       const routes = [];
//       const baseRoute = routesRes.data.routes[0]; // Always use the first route as base

//       // Route 1: Fastest Route (original first route)
//       routes.push({
//         id: 0,
//         name: "Fastest Route",
//         distance: (baseRoute.distance / 1000).toFixed(1) + " km",
//         duration: (baseRoute.duration / 60).toFixed(0) + " mins",
//         coordinates: baseRoute.geometry?.coordinates || [],
//         emissions: Math.round((baseRoute.distance / 1000) * 250) + " g CO₂",
//       });

//       // Route 2: Balanced Route (either second route from API or modified first route)
//       const secondRoute = routesRes.data.routes[1] || {
//         ...baseRoute,
//         distance: baseRoute.distance * 1.1, // 10% longer
//         duration: baseRoute.duration * 1.15, // 15% longer
//       };

//       routes.push({
//         id: 1,
//         name: "Balanced Route",
//         distance: (secondRoute.distance / 1000).toFixed(1) + " km",
//         duration: (secondRoute.duration / 60).toFixed(0) + " mins",
//         coordinates:
//           secondRoute.geometry?.coordinates ||
//           baseRoute.geometry?.coordinates ||
//           [],
//         emissions: Math.round((secondRoute.distance / 1000) * 220) + " g CO₂",
//       });

//       // Route 3: Eco Route (either third route from API or modified first route)
//       const thirdRoute = routesRes.data.routes[2] || {
//         ...baseRoute,
//         distance: baseRoute.distance * 1.2, // 20% longer
//         duration: baseRoute.duration * 1.3, // 30% longer
//       };

//       routes.push({
//         id: 2,
//         name: "Eco Route",
//         distance: (thirdRoute.distance / 1000).toFixed(1) + " km",
//         duration: (thirdRoute.duration / 60).toFixed(0) + " mins",
//         coordinates:
//           thirdRoute.geometry?.coordinates ||
//           baseRoute.geometry?.coordinates ||
//           [],
//         emissions: Math.round((thirdRoute.distance / 1000) * 180) + " g CO₂",
//       });

//       navigate("/results", { state: { routes, startCoord, endCoord } });
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <Box sx={{ p: 3, maxWidth: 800, margin: "40px auto" }}>
//       <Typography variant="h4" gutterBottom>
//         Green Route Planner
//       </Typography>

//       {error && (
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {error}
//         </Alert>
//       )}

//       <form onSubmit={handleSubmit}>
//         <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
//           <Autocomplete
//             freeSolo
//             options={startSuggestions}
//             getOptionLabel={(option) => option.label || ""}
//             onInputChange={(_, value) => {
//               setStart(value);
//               fetchSuggestions(value, true);
//             }}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="Start Location"
//                 required
//                 InputProps={{
//                   ...params.InputProps,
//                   startAdornment: <MyLocation color="primary" sx={{ mr: 1 }} />,
//                 }}
//               />
//             )}
//           />

//           <Autocomplete
//             freeSolo
//             options={endSuggestions}
//             getOptionLabel={(option) => option.label || ""}
//             onInputChange={(_, value) => {
//               setEnd(value);
//               fetchSuggestions(value, false);
//             }}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="Destination"
//                 required
//                 InputProps={{
//                   ...params.InputProps,
//                   startAdornment: <Place color="primary" sx={{ mr: 1 }} />,
//                 }}
//               />
//             )}
//           />

//           <Button
//             type="submit"
//             variant="contained"
//             size="large"
//             disabled={!start || !end || loading}
//             sx={{ mt: 2, py: 2 }}
//           >
//             {loading ? <CircularProgress size={24} /> : "Find Eco Routes"}
//           </Button>
//         </Box>
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import {
  Place,
  MyLocation,
  DirectionsCar,
  TwoWheeler,
  DirectionsBus,
  LocalShipping,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import debounce from "lodash.debounce";
import { AddInputs } from "../InvokeApi";
import CheckIcon from "@mui/icons-material/Check";
// import { AddInputs } from "../../services/emissionsService";

const vehicleOptions = [
  {
    value: "car",
    label: "Car (Petrol)",
    icon: <DirectionsCar />,
    emissionFactor: 250,
  },
  {
    value: "car_diesel",
    label: "Car (Diesel)",
    icon: <DirectionsCar />,
    emissionFactor: 220,
  },
  {
    value: "bike",
    label: "Motorcycle",
    icon: <TwoWheeler />,
    emissionFactor: 180,
  },
  { value: "bus", label: "Bus", icon: <DirectionsBus />, emissionFactor: 150 },
];

const Calculator = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [vehicle, setVehicle] = useState("car");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [startSuggestions, setStartSuggestions] = useState([]);
  const [endSuggestions, setEndSuggestions] = useState([]);
  const navigate = useNavigate();

  // Debounced suggestion fetcher
  const fetchSuggestions = debounce(async (query, isStart) => {
    if (query.length < 3) return;
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=5&addressdetails=1`
      );
      const suggestions = response.data.map((item) => ({
        label: `${item.display_name}`,
        lat: item.lat,
        lng: item.lon,
      }));
      isStart
        ? setStartSuggestions(suggestions)
        : setEndSuggestions(suggestions);
    } catch (err) {
      console.error("Suggestion error:", err);
    }
  }, 300);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!start || !end || !vehicle) return;

  //   setLoading(true);
  //   setError(null);

  //   try {
  //     // Get coordinates
  //     const [startRes, endRes] = await Promise.all([
  //       axios.get(
  //         `https://nominatim.openstreetmap.org/search?q=${start}&format=json&limit=1`
  //       ),
  //       axios.get(
  //         `https://nominatim.openstreetmap.org/search?q=${end}&format=json&limit=1`
  //       ),
  //     ]);

  //     if (!startRes.data[0] || !endRes.data[0]) {
  //       throw new Error("One or both locations not found");
  //     }

  //     const startCoord = {
  //       lat: parseFloat(startRes.data[0].lat),
  //       lng: parseFloat(startRes.data[0].lon),
  //       name: startRes.data[0].display_name,
  //     };

  //     const endCoord = {
  //       lat: parseFloat(endRes.data[0].lat),
  //       lng: parseFloat(endRes.data[0].lon),
  //       name: endRes.data[0].display_name,
  //     };

  //     // Get multiple routes
  //     const routesRes = await axios.get(
  //       `https://router.project-osrm.org/route/v1/driving/${startCoord.lng},${startCoord.lat};${endCoord.lng},${endCoord.lat}?alternatives=3&overview=full`
  //     );

  //     if (!routesRes.data.routes || routesRes.data.routes.length === 0) {
  //       throw new Error("No routes found between these locations");
  //     }

  //     // Get selected vehicle's emission factor
  //     const selectedVehicle = vehicleOptions.find((v) => v.value === vehicle);
  //     const baseEmissionFactor = selectedVehicle
  //       ? selectedVehicle.emissionFactor
  //       : 250;

  //     // Prepare route data - ensure we always have 3 routes
  //     const routes = [];
  //     const baseRoute = routesRes.data.routes[0]; // Always use the first route as base

  //     // Route 1: Fastest Route (original first route)
  //     routes.push({
  //       id: 0,
  //       name: "Fastest Route",
  //       distance: (baseRoute.distance / 1000).toFixed(1) + " km",
  //       duration: (baseRoute.duration / 60).toFixed(0) + " mins",
  //       coordinates: baseRoute.geometry?.coordinates || [],
  //       emissions:
  //         Math.round((baseRoute.distance / 1000) * baseEmissionFactor) +
  //         " g CO₂",
  //       vehicle: vehicle,
  //     });

  //     // Route 2: Balanced Route (either second route from API or modified first route)
  //     const secondRoute = routesRes.data.routes[1] || {
  //       ...baseRoute,
  //       distance: baseRoute.distance * 1.1, // 10% longer
  //       duration: baseRoute.duration * 1.15, // 15% longer
  //     };

  //     routes.push({
  //       id: 1,
  //       name: "Balanced Route",
  //       distance: (secondRoute.distance / 1000).toFixed(1) + " km",
  //       duration: (secondRoute.duration / 60).toFixed(0) + " mins",
  //       coordinates:
  //         secondRoute.geometry?.coordinates ||
  //         baseRoute.geometry?.coordinates ||
  //         [],
  //       emissions:
  //         Math.round(
  //           (secondRoute.distance / 1000) * (baseEmissionFactor * 0.9)
  //         ) + " g CO₂",
  //       vehicle: vehicle,
  //     });

  //     // Route 3: Eco Route (either third route from API or modified first route)
  //     const thirdRoute = routesRes.data.routes[2] || {
  //       ...baseRoute,
  //       distance: baseRoute.distance * 1.2, // 20% longer
  //       duration: baseRoute.duration * 1.3, // 30% longer
  //     };

  //     routes.push({
  //       id: 2,
  //       name: "Eco Route",
  //       distance: (thirdRoute.distance / 1000).toFixed(1) + " km",
  //       duration: (thirdRoute.duration / 60).toFixed(0) + " mins",
  //       coordinates:
  //         thirdRoute.geometry?.coordinates ||
  //         baseRoute.geometry?.coordinates ||
  //         [],
  //       emissions:
  //         Math.round(
  //           (thirdRoute.distance / 1000) * (baseEmissionFactor * 0.8)
  //         ) + " g CO₂",
  //       vehicle: vehicle,
  //     });

  //     // Store calculation in database
  //     try {
  //       await axios.post("/api/calculations", {
  //         startLocation: startCoord,
  //         endLocation: endCoord,
  //         vehicleType: vehicle,
  //         routes: routes,
  //         calculatedAt: new Date().toISOString(),
  //       });
  //     } catch (dbError) {
  //       console.error("Failed to save calculation:", dbError);
  //       // Continue even if database save fails
  //     }

  //     navigate("/results", {
  //       state: { routes, startCoord, endCoord, vehicle },
  //     });
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  //   console.log(start, "afsafsdf");
  //   console.log(end, "afsafsdf");
  //   console.log(vehicle, "afsafsdf");
  //   const dataToSend = {
  //     start_location: start,
  //     destination: end,
  //     vehicle: vehicle,
  //   };
  //   const resp = await AddInputs(dataToSend);
  //   console.log(resp, "adfsasddfsfd");
  //   if (resp?.statusCode == 200) {
  //     <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
  //       saved in the Database
  //     </Alert>;
  //   } else {
  //     console.log(resp?.message);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!start || !end || !vehicle) return;

    setLoading(true);
    setError(null);

    try {
      // 1. Get coordinates
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

      // 2. Get routes
      const routesRes = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${startCoord.lng},${startCoord.lat};${endCoord.lng},${endCoord.lat}?alternatives=3&overview=full`
      );

      if (!routesRes.data.routes || routesRes.data.routes.length === 0) {
        throw new Error("No routes found between these locations");
      }

      // 3. Prepare routes (YOUR ORIGINAL LOGIC)
      const selectedVehicle = vehicleOptions.find((v) => v.value === vehicle);
      const baseEmissionFactor = selectedVehicle
        ? selectedVehicle.emissionFactor
        : 250;

      const routes = [];
      const baseRoute = routesRes.data.routes[0];

      // Route 1: Fastest Route (original first route)
      routes.push({
        id: 0,
        name: "Fastest Route",
        distance: (baseRoute.distance / 1000).toFixed(1) + " km",
        duration: (baseRoute.duration / 60).toFixed(0) + " mins",
        coordinates: baseRoute.geometry?.coordinates || [],
        emissions:
          Math.round((baseRoute.distance / 1000) * baseEmissionFactor) +
          " g CO₂",
        vehicle: vehicle,
      });

      // Route 2: Balanced Route
      const secondRoute = routesRes.data.routes[1] || {
        ...baseRoute,
        distance: baseRoute.distance * 1.1,
        duration: baseRoute.duration * 1.15,
      };

      routes.push({
        id: 1,
        name: "Balanced Route",
        distance: (secondRoute.distance / 1000).toFixed(1) + " km",
        duration: (secondRoute.duration / 60).toFixed(0) + " mins",
        coordinates:
          secondRoute.geometry?.coordinates ||
          baseRoute.geometry?.coordinates ||
          [],
        emissions:
          Math.round(
            (secondRoute.distance / 1000) * (baseEmissionFactor * 0.9)
          ) + " g CO₂",
        vehicle: vehicle,
      });

      // Route 3: Eco Route
      const thirdRoute = routesRes.data.routes[2] || {
        ...baseRoute,
        distance: baseRoute.distance * 1.2,
        duration: baseRoute.duration * 1.3,
      };

      routes.push({
        id: 2,
        name: "Eco Route",
        distance: (thirdRoute.distance / 1000).toFixed(1) + " km",
        duration: (thirdRoute.duration / 60).toFixed(0) + " mins",
        coordinates:
          thirdRoute.geometry?.coordinates ||
          baseRoute.geometry?.coordinates ||
          [],
        emissions:
          Math.round(
            (thirdRoute.distance / 1000) * (baseEmissionFactor * 0.8)
          ) + " g CO₂",
        vehicle: vehicle,
      });

      // 4. Prepare minimal API data
      const apiData = {
        start_location: startCoord.name,
        destination: endCoord.name,
        vehicle: vehicle,
      };

      // 5. Make API call (fire and forget)
      AddInputs(apiData)
        .then((resp) => {
          if (resp?.statusCode === 200) {
            console.log("Saved to database");
          } else {
            console.log("Save warning:", resp?.message);
          }
        })
        .catch((err) => {
          console.error("Save failed (non-blocking):", err.message);
        });

      // 6. Navigate with full data
      navigate("/results", {
        state: {
          routes,
          startCoord,
          endCoord,
          vehicle,
          calculatedAt: new Date().toISOString(),
        },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: "40px auto" }}>
      <Typography variant="h4" gutterBottom align="center">
        Green Route Planner
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Start Location */}
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
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <MyLocation color="primary" sx={{ mr: 1 }} />,
                }}
              />
            )}
          />

          {/* Destination */}
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
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <Place color="primary" sx={{ mr: 1 }} />,
                }}
              />
            )}
          />

          {/* Vehicle Selection */}
          <FormControl fullWidth>
            <InputLabel id="vehicle-select-label">Vehicle Type</InputLabel>
            <Select
              labelId="vehicle-select-label"
              id="vehicle-select"
              value={vehicle}
              label="Vehicle Type"
              onChange={(e) => setVehicle(e.target.value)}
              required
            >
              {vehicleOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {option.icon}
                    {option.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={!start || !end || !vehicle || loading}
            sx={{ py: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : "Calculate Eco Routes"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Calculator;
