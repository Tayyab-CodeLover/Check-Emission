import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
  Card,
  Divider,
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log("Login submitted:", { email, password });
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";
    if (!password) errors.password = "Password is required";
    return errors;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #8f29d0 0%, #6467da 50%, #0aebee 100%)",
        p: 3,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 450,
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
            background: "linear-gradient(to right, #8f29d0, #6467da, #0aebee)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Welcome Back
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
        >
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

          {/* Login Button */}
          <Button
            type="submit"
            variant="contained"
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
            Login
          </Button>

          {/* Forgot password link */}
          {/* <Box sx={{ textAlign: "right" }}>
            <Link
              component={RouterLink}
              to="/forgot-password"
              sx={{
                fontSize: "0.875rem",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Forgot password?
            </Link>
          </Box> */}

          {/* Divider */}
          <Divider
            sx={{
              my: 2,
              "&::before, &::after": {
                borderColor: "rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <Typography variant="body2" sx={{ px: 2, color: "text.secondary" }}>
              Or Register your account
            </Typography>
          </Divider>

          {/* Signup Button */}
          <Button
            component={RouterLink}
            to="/signup"
            variant="outlined"
            fullWidth
            sx={{
              p: 1.5,
              borderRadius: 2,
              fontSize: "1rem",
              fontWeight: 600,
              textTransform: "none",
              borderColor: "rgba(142, 41, 208, 0.5)",
              color: "primary.main",
              "&:hover": {
                borderColor: "primary.main",
                backgroundColor: "rgba(142, 41, 208, 0.05)",
              },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default Login;
