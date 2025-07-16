// import { ThemeProvider } from "@mui/material/styles";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import CssBaseline from "@mui/material/CssBaseline";
// import Calculator from "./pages/Calculator";
// import theme from "./theme";
// import Header from "./Components/Headers";
// import Footer from "./Components/Footer";
// import Home from "./pages/Home";
// import Results from "./pages/Results";
// import About from "./pages/About";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";

// function App() {
//   return (
//     <>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <BrowserRouter>
//           <Header />
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/calculate" element={<Calculator />} />
//             <Route path="/results" element={<Results />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//           </Routes>
//           <Footer />
//         </BrowserRouter>
//       </ThemeProvider>
//     </>
//   );
// }

// export default App;

import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import Header from "./Components/Headers";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Results from "./pages/Results";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Box } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        {/* Header and Footer won't show on login/signup */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Other routes */}
          <Route
            path="*"
            element={
              <>
                <Header />
                <Routes>
                  {/* <Box sx={{ backgroundColor: "black" }}> */}
                  <Route path="/" element={<Home />} />
                  <Route path="/calculate" element={<Calculator />} />
                  <Route path="/results" element={<Results />} />
                  <Route path="/about" element={<About />} />
                  {/* </Box> */}
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
