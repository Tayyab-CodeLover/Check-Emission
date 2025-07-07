import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { DirectionsCar, Nature, LocalFlorist } from "@mui/icons-material"; // Replaced Eco with LocalFlorist

const Home = () => {
  return (
    <Box sx={{ p: { xs: 4, md: 10 } }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Welcome to Green Transportation Planner
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <DirectionsCar color="primary" sx={{ fontSize: 50, mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Compare Emissions
              </Typography>
              <Typography sx={{ mb: 2 }}>
                See how different routes and vehicles affect your carbon
                footprint
              </Typography>
              <Button
                variant="contained"
                component={Link}
                to="/calculate"
                fullWidth
                sx={{
                  background:
                    "linear-gradient(to right, #8f29d0, #6467da, #0aebee)",
                  p: 1.5,
                }}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Nature color="primary" sx={{ fontSize: 50, mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Eco-Friendly Choices
              </Typography>
              <Typography sx={{ mb: 2 }}>
                Discover the most sustainable travel options for your journey
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <LocalFlorist color="primary" sx={{ fontSize: 50, mb: 2 }} />{" "}
              {/* Updated icon */}
              <Typography variant="h5" gutterBottom>
                Save the Planet
              </Typography>
              <Typography sx={{ mb: 2 }}>
                Reduce your carbon footprint one trip at a time
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        How It Works
      </Typography>
      <ol>
        <li>
          <Typography>Enter your start and destination locations</Typography>
        </li>
        <li>
          <Typography>Select your vehicle type</Typography>
        </li>
        <li>
          <Typography>Compare emissions for different routes</Typography>
        </li>
        <li>
          <Typography>Choose the most eco-friendly option!</Typography>
        </li>
      </ol>
    </Box>
  );
};

export default Home;
