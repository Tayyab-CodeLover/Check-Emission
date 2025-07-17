import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
  Card,
} from "@mui/material";
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Person,
  Phone,
} from "@mui/icons-material";
import { Alert } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { handleSignUp } from "../InvokeApi";
import { enqueueSnackbar } from "notistack";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [phone, setphone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  // const [errors, setErrors] = useState({});
  // const [alert, setAlert] = useState({
  //   open: false,
  //   message: "",
  //   severity: "success",
  // });
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const validationErrors = validateForm();
  //   if (Object.keys(validationErrors).length === 0) {
  //     console.log("Signup submitted:", { username, phone, email, password });
  //     // API call will go here
  //     const dataToSend = {
  //       userName: username,
  //       phone: phone,
  //       email: email,
  //       password: password,
  //     };
  //     const resp = await handleSignUp(dataToSend);
  //     console.log(resp, "adfsadfsf");
  //     if (resp?.statusCode == 200 || resp?.statusCode == 201) {
  //       navigate("/login");
  //     } else {
  //       console.log("issues made");
  //     }
  //   } else {
  //     setErrors(validationErrors);
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Clear previous errors
  //   setErrors({});

  //   const validationErrors = validateForm();
  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //     return;
  //   }

  //   console.log("Signup submitted:", { username, phone, email, password });

  //   try {
  //     const dataToSend = {
  //       userName: username,
  //       phone: phone,
  //       email: email,
  //       password: password,
  //     };

  //     const resp = await handleSignUp(dataToSend);
  //     console.log(resp, "API Response");

  //     if (resp?.statusCode === 200 || resp?.statusCode === 201) {
  //       enqueueSnackbar("Registration successful! Redirecting to login...", {
  //         variant: "success",
  //         autoHideDuration: 2000,
  //       });
  //       setTimeout(() => navigate("/login"), 2000);
  //     } else {
  //       enqueueSnackbar(
  //         resp?.message || "Registration failed. Please try again.",
  //         { variant: "error" }
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Signup Error:", error);

  //     let errorMessage = "Registration failed. Please try again.";
  //     if (error.response?.status === 409) {
  //       errorMessage = "Email or username already exists";
  //     } else if (error.response?.message) {
  //       errorMessage = error.response.message;
  //     } else if (error.message) {
  //       errorMessage = error.message;
  //     }

  //     enqueueSnackbar(errorMessage, { variant: "error" });
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const dataToSend = {
        userName: username,
        phone: phone,
        email: email,
        password: password,
      };

      const { status, data } = await handleSignUp(dataToSend);

      if (status === 200 || status === 201) {
        enqueueSnackbar(data.message || "Registration successful!", {
          variant: "success",
          autoHideDuration: 2000,
        });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        enqueueSnackbar(
          data.message || "Registration completed with warnings",
          {
            variant: "warning",
            autoHideDuration: 2000,
          }
        );
      }
    } catch (error) {
      let errorMessage = error.message || "Registration failed";

      // Special handling for conflict (409) status
      if (error.status === 409) {
        errorMessage = "Email or username already exists";
      }

      enqueueSnackbar(errorMessage, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!username) errors.username = "Username is required";
    if (!phone) errors.phone = "Contact Number is required";
    else if (!/^\d{10,15}$/.test(phone)) errors.phone = "Invalid phone number";
    if (!email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";
    if (!password) errors.password = "Password is required";
    else if (password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    return errors;
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #8f29d0 0%, #6467da 50%, #0aebee 100%)",
          p: 3,
          gap: 3,
        }}
      >
        {/* <Box sx={{ display: "flex", bottom: "20px" }}>
          {alert.open && (
            <Alert
              severity={alert.severity}
              onClose={() => setAlert({ ...alert, open: false })}
              // sx={{ mb: 2 }}
              sx={{ paddingtop: "20px" }}
            >
              {alert.message}
            </Alert>
          )}
        </Box> */}
        <Card
          sx={{
            width: "100%",
            maxWidth: 480,
            p: 4,
            borderRadius: 3,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              mb: 3,
              fontWeight: 700,
              textAlign: "center",
              background:
                "linear-gradient(to right, #8f29d0, #6467da, #0aebee)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Create Account
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* Username */}
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (errors.username) setErrors({ ...errors, username: "" });
              }}
              error={!!errors.username}
              helperText={errors.username}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                },
              }}
            />

            {/* Contact Number */}
            <TextField
              fullWidth
              label="Contact Number"
              type="number"
              variant="outlined"
              value={phone}
              onChange={(e) => {
                setphone(e.target.value);
                if (errors.phone) setErrors({ ...errors, phone: "" });
              }}
              error={!!errors.phone}
              helperText={errors.phone}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                },
              }}
            />

            {/* Email */}
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: "" });
              }}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                },
              }}
            />

            {/* Password */}
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: "" });
              }}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                },
              }}
            />

            {/* Confirm Password */}
            <TextField
              fullWidth
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword)
                  setErrors({ ...errors, confirmPassword: "" });
              }}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                },
              }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                background:
                  "linear-gradient(to right, #8f29d0, #6467da, #0aebee)",
                p: 1.5,
                borderRadius: 2,
                fontSize: "1rem",
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "0 4px 10px rgba(142, 41, 208, 0.3)",
                "&:hover": {
                  background:
                    "linear-gradient(to right, #7e1fc0, #5557c5, #09d4d6)",
                  boxShadow: "0 6px 15px rgba(142, 41, 208, 0.4)",
                },
              }}
            >
              Sign Up
            </Button>

            {/* Already have account link */}
            <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
              Already have an account?{" "}
              <Link
                component={RouterLink}
                to="/login"
                sx={{
                  fontWeight: 600,
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Login here
              </Link>
            </Typography>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default Signup;
