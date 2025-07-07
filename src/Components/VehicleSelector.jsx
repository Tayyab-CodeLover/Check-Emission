import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import { DirectionsCar, DirectionsBike, Train } from "@mui/icons-material";

const VehicleSelector = ({ value, onChange }) => {
  const vehicles = [
    { value: "car", label: "Car (Petrol)", icon: <DirectionsCar /> },
    { value: "electric-car", label: "Electric Car", icon: <DirectionsCar /> },
    // { value: "bike", label: "Bicycle", icon: <DirectionsBike /> },
    { value: "motorcycle", label: "Motorcycle", icon: <DirectionsBike /> },
    { value: "bus", label: "Bus", icon: <DirectionsCar /> },
    // { value: "train", label: "Train", icon: <Train /> },
  ];

  return (
    <FormControl fullWidth>
      <InputLabel>Vehicle Type</InputLabel>
      <Select
        value={value}
        label="Vehicle Type"
        onChange={(e) => onChange(e.target.value)}
      >
        {vehicles.map((vehicle) => (
          <MenuItem key={vehicle.value} value={vehicle.value}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {vehicle.icon}
              <Typography sx={{ ml: 1 }}>{vehicle.label}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default VehicleSelector;
