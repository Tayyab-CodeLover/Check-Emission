import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#a24fd6", // Green
      light: "#81C784",
      dark: "#1B5E20",
    },
    secondary: {
      main: "#a24fd6", // Blue
      light: "#B3E5FC",
      dark: "#01579B",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: "#6467da",
    },
    h5: {
      fontWeight: 550,
      color: "#6467da",
    },
  },
});

export default theme;
