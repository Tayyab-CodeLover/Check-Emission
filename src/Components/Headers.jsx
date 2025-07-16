import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { hover } from "@testing-library/user-event/dist/hover";
import { Link, useNavigate } from "react-router-dom";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import GrainIcon from "@mui/icons-material/Grain";
import HiveIcon from "@mui/icons-material/Hive";

const Header = () => {
  const navigate = useNavigate();
  const handlehome = () => {
    navigate("/");
  };
  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        background: "linear-gradient(to right, #8f29d0, #6467da, #0aebee)",
      }}
    >
      <Toolbar sx={{ width: "98%", margin: "0 auto" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              cursor: "pointer",
            }}
            onClick={handlehome}
          >
            <GrainIcon />
            <Typography variant="h6" component="div">
              Green Transit
            </Typography>
          </Box>
          <Box>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/calculate">
              Calculator
            </Button>
            <Button color="inherit" component={Link} to="/about">
              About
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
