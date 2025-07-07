import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
// import theme from "./theme";
import Calculator from "./pages/Calculator";
import theme from "./theme";
import Header from "./Components/Headers";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import Results from "./pages/Results";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculate" element={<Calculator />} />
            <Route path="/results" element={<Results />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
