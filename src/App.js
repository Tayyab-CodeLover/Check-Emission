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
import Calculator from "./pages/Comparison";
import Results from "./pages/Results";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/calculate" element={<Calculator />} />
                    <Route path="/results" element={<Results />} />
                    <Route path="/about" element={<About />} />
                  </Routes>
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
