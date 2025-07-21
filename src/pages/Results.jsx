// import React from "react";
// import { Grid, Typography, Box } from "@mui/material";
// import RouteCard from "../Components/RouteCard";
// import { useLocation } from "react-router-dom";

// const Results = () => {
//   const routes = [
//     {
//       id: 1,
//       name: "Fastest Route",
//       distance: 15.5,
//       duration: 25,
//       vehicle: "car",
//       emissions: 3875,
//     },
//     {
//       id: 2,
//       name: "Eco Route",
//       distance: 18.2,
//       duration: 32,
//       vehicle: "bike",
//       emissions: 0,
//     },
//     {
//       id: 3,
//       name: "Public Transport",
//       distance: 20.1,
//       duration: 35,
//       vehicle: "train",
//       emissions: 1005,
//     },
//   ];

//   return (
//     <Box sx={{ p: 3, margin: "0 auto", width: "70%" }}>
//       <Typography variant="h4" gutterBottom>
//         Route Comparison
//       </Typography>
//       <Grid container spacing={3}>
//         {routes.map((route) => (
//           <Grid item xs={12} sm={6} md={4} key={route.id}>
//             <RouteCard route={route} />
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default Results;

// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   Chip,
//   Button,
//   CircularProgress,
// } from "@mui/material";
// import { MapContainer, TileLayer, Polyline } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// const Results = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const routes = state?.routes || [];
//   const [selectedRoute, setSelectedRoute] = useState(null);
//   const [mapReady, setMapReady] = useState(false);

//   useEffect(() => {
//     if (routes.length > 0) {
//       setSelectedRoute(routes[0]);
//       setMapReady(true);
//     }
//   }, [routes]);

//   if (!routes.length) {
//     return (
//       <Box sx={{ p: 3, textAlign: "center" }}>
//         <Typography variant="h6" gutterBottom>
//           No routes calculated
//         </Typography>
//         <Button
//           variant="contained"
//           onClick={() => navigate("/")}
//           sx={{ mt: 2 }}
//         >
//           Back to Calculator
//         </Button>
//       </Box>
//     );
//   }

//   const getCenter = (coordinates) => {
//     if (!coordinates || coordinates.length === 0) return [51.505, -0.09];
//     const firstCoord = coordinates[0];
//     return [firstCoord[1], firstCoord[0]]; // [lat, lng]
//   };

//   return (
//     <Box sx={{ p: 3, maxWidth: 1200, margin: "0 auto" }}>
//       <Typography variant="h4" gutterBottom>
//         Route Comparison
//       </Typography>

//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         {routes.map((route) => (
//           <Grid item xs={12} md={6} key={route.id}>
//             <Card
//               sx={{
//                 cursor: "pointer",
//                 border:
//                   selectedRoute?.id === route.id
//                     ? "2px solid #2e7d32"
//                     : "1px solid #e0e0e0",
//                 height: "100%",
//                 transition: "border 0.3s ease",
//               }}
//               onClick={() => setSelectedRoute(route)}
//             >
//               <CardContent>
//                 <Typography variant="h6" color="primary" gutterBottom>
//                   {route.name}
//                 </Typography>
//                 <Typography>Distance: {route.distance}</Typography>
//                 <Typography>Duration: {route.duration}</Typography>
//                 <Typography>Emissions: {route.emissions}</Typography>
//                 {route.airQuality && (
//                   <Chip
//                     label={`Air Quality: ${route.airQuality}`}
//                     color={
//                       route.airQuality.includes("unavailable")
//                         ? "default"
//                         : parseFloat(route.airQuality) > 35
//                         ? "error"
//                         : parseFloat(route.airQuality) > 12
//                         ? "warning"
//                         : "success"
//                     }
//                     sx={{ mt: 1 }}
//                   />
//                 )}
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {mapReady && selectedRoute && (
//         <Box sx={{ height: "500px", borderRadius: 2, overflow: "hidden" }}>
//           <Typography variant="h6" gutterBottom>
//             {selectedRoute.name} - Map View
//           </Typography>
//           <MapContainer
//             center={getCenter(selectedRoute.coordinates)}
//             zoom={selectedRoute.coordinates?.length ? 12 : 8}
//             style={{ height: "100%", width: "100%" }}
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//             />
//             {selectedRoute.coordinates?.length > 0 && (
//               <Polyline
//                 positions={selectedRoute.coordinates.map((c) => [c[1], c[0]])}
//                 color="#2e7d32"
//                 weight={4}
//               />
//             )}
//           </MapContainer>
//         </Box>
//       )}

//       <Box sx={{ mt: 3, textAlign: "center" }}>
//         <Button variant="outlined" onClick={() => navigate("/")} sx={{ mr: 2 }}>
//           New Calculation
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default Results;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
} from "@mui/material";
import RouteMap from "./Routemap";

const Results = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const routes = state?.routes || [];
  const [selectedRoute, setSelectedRoute] = useState(null);

  if (!routes.length) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6">No routes calculated</Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{ mt: 2 }}
        >
          New Calculation
        </Button>
      </Box>
    );
  }

  if (selectedRoute) {
    return (
      <RouteMap
        route={selectedRoute}
        start={state.startCoord}
        end={state.endCoord}
        onBack={() => setSelectedRoute(null)}
      />
    );
  }

  return (
  <Box sx={{ p: 3, maxWidth: 1200, margin: "40px auto" }}>
  <Typography variant="h4" gutterBottom sx={{ marginBottom: "20px" }}>
    Recommended Routes
  </Typography>

  <Grid
    container
    spacing={3}
    sx={{ display: "flex", justifyContent: "space-between" }}
  >
    {routes.map((route) => (
      <Grid item xs={12} md={6} key={route.id}>
        <Card
          sx={{
            height: "100%",
            backgroundColor: route.name === "Eco Route" ? "#e6f4ea" : "white", // light green background for eco
            border: route.name === "Eco Route" ? "2px solid #4caf50" : "1px solid #ccc", // green border
          }}
        >
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
          >
            <Typography
              variant="h6"
              color={route.name === "Eco Route" ? "success.main" : "primary"}
            >
              {route.name}
            </Typography>
            <Typography>Distance: {route.distance}</Typography>
            <Typography>Duration: {route.duration}</Typography>
            <Typography>
              Estimated Emissions: {route.emissions}
            </Typography>

            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => setSelectedRoute(route)}
            >
              View This Route
            </Button>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>

  <Box sx={{ mt: 4, textAlign: "center" }}>
    <Button variant="contained" onClick={() => navigate("/")}>
      Calculate New Route
    </Button>
  </Box>
</Box>

  );
};

export default Results;
