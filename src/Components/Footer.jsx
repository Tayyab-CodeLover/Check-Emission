import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[300]
            : theme.palette.grey[800],
        bottom: 0,
        position: "fixed",
        right: 0,
        left: 0,
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} Green Transportation Planner - Reduce Your
        Carbon Footprint
      </Typography>
    </Box>
  );
};

export default Footer;
