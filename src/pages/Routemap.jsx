// import React from "react";
// import { Box, Typography, Button } from "@mui/material";
// import {
//   MapContainer,
//   TileLayer,
//   Polyline,
//   Marker,
//   Popup,
// } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // Fix leaflet icons
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
//   iconUrl: require("leaflet/dist/images/marker-icon.png"),
//   shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
// });

// const RouteMap = ({ route, start, end, onBack }) => {
//   const routeCenter =
//     route.coordinates.length > 0
//       ? [route.coordinates[0][1], route.coordinates[0][0]]
//       : [51.505, -0.09];

//   return (
//     <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
//       <Box sx={{ p: 2, bgcolor: "background.paper", zIndex: 1 }}>
//         <Typography variant="h6">{route.name}</Typography>
//         <Typography>
//           {route.distance} • {route.duration} • {route.emissions}
//         </Typography>
//         <Button onClick={onBack} sx={{ mt: 1 }}>
//           Back to Results
//         </Button>
//       </Box>

//       <MapContainer
//         center={routeCenter}
//         zoom={13}
//         style={{ flex: 1, width: "100%" }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//         />

//         <Polyline
//           positions={route.coordinates.map((c) => [c[1], c[0]])}
//           color="#2e7d32"
//           weight={6}
//         />

//         <Marker position={[start.lat, start.lng]}>
//           <Popup>Start: {start.name}</Popup>
//         </Marker>

//         <Marker position={[end.lat, end.lng]}>
//           <Popup>Destination: {end.name}</Popup>
//         </Marker>
//       </MapContainer>
//     </Box>
//   );
// };

// export default RouteMap;

// import React, { useEffect } from "react";
// import { Box, Typography, Button } from "@mui/material";
// import {
//   MapContainer,
//   TileLayer,
//   Polyline,
//   Marker,
//   Popup,
// } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // Fix leaflet icons
// const DefaultIcon = L.icon({
//   iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png").default,
//   iconUrl: require("leaflet/dist/images/marker-icon.png").default,
//   shadowUrl: require("leaflet/dist/images/marker-shadow.png").default,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41],
// });

// L.Marker.prototype.options.icon = DefaultIcon;

// const RouteMap = ({ route, start, end, onBack }) => {
//   const routeCenter =
//     route.coordinates.length > 0
//       ? [route.coordinates[0][1], route.coordinates[0][0]]
//       : [51.505, -0.09];

//   return (
//     <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
//       <Box sx={{ p: 2, bgcolor: "background.paper", zIndex: 1 }}>
//         <Typography variant="h6">{route.name}</Typography>
//         <Typography>
//           {route.distance} • {route.duration} • {route.emissions}
//         </Typography>
//         <Button onClick={onBack} sx={{ mt: 1 }}>
//           Back to Results
//         </Button>
//       </Box>

//       <MapContainer
//         center={routeCenter}
//         zoom={13}
//         style={{ flex: 1, width: "100%" }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//         />

//         <Polyline
//           positions={route.coordinates.map((c) => [c[1], c[0]])}
//           color="#2e7d32"
//           weight={6}
//         />

//         <Marker position={[start.lat, start.lng]}>
//           <Popup>Start: {start.name}</Popup>
//         </Marker>

//         <Marker position={[end.lat, end.lng]}>
//           <Popup>Destination: {end.name}</Popup>
//         </Marker>
//       </MapContainer>
//     </Box>
//   );
// };

// export default RouteMap;

import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom component to handle map view centering
const MapCenterHandler = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

const RouteMap = ({ route, start, end, onBack }) => {
  // Initialize Leaflet icon settings
  useEffect(() => {
    // Fix for default marker icons disappearing in production
    const defaultIcon = L.icon({
      iconRetinaUrl: "/images/marker-icon-2x.png",
      iconUrl: "/images/marker-icon.png",
      shadowUrl: "/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    L.Marker.prototype.options.icon = defaultIcon;
  }, []);

  // Calculate center point of the route
  const routeCenter =
    route.coordinates?.length > 0
      ? [route.coordinates[0][1], route.coordinates[0][0]]
      : [start.lat, start.lng] || [51.505, -0.09]; // Default to London if no coordinates

  // Convert coordinates for Leaflet Polyline
  const polylinePositions =
    route.coordinates?.map((coord) => [coord[1], coord[0]]) || [];

  return (
    <Box
      sx={{
        height: "78vh",
        display: "flex",
        flexDirection: "column",
        width: "85%",
        margin: "0 auto",
        // marginTop: "10px",
        overflow: "hidden",
      }}
    >
      {/* Header with route info and back button */}
      <Box
        sx={{
          p: 2,
          bgcolor: "background.paper",
          zIndex: 1000,
          boxShadow: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight="bold">
            {route.name}
          </Typography>
          <Typography variant="body2">
            {route.distance} • {route.duration} • {route.emissions}
          </Typography>
        </Box>
        <Button variant="contained" onClick={onBack} sx={{ ml: 2 }}>
          Back to Results
        </Button>
      </Box>

      {/* Leaflet Map Container */}
      <MapContainer
        center={routeCenter}
        zoom={14}
        style={{ flex: 1, width: "100%" }}
        scrollWheelZoom={false}
      >
        <MapCenterHandler center={routeCenter} />

        {/* OpenStreetMap Tile Layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Route Polyline */}
        {polylinePositions.length > 0 && (
          <Polyline
            positions={polylinePositions}
            color="#3f51b5"
            weight={5}
            opacity={0.7}
          />
        )}

        {/* Start Marker */}
        <Marker position={[start.lat, start.lng]}>
          <Popup>
            <Typography variant="subtitle2">Start Point</Typography>
            <Typography variant="body2">{start.name}</Typography>
          </Popup>
        </Marker>

        {/* End Marker */}
        <Marker position={[end.lat, end.lng]}>
          <Popup>
            <Typography variant="subtitle2">Destination</Typography>
            <Typography variant="body2">{end.name}</Typography>
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

export default RouteMap;
