import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setError("");
    try {
      const res = await fetch(
        "https://flipkart-backend-2zw8.onrender.com/auth/signup",
        {
          method: "POST",
          body: JSON.stringify({ name, email, password }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userId", data.user?._id || "");
        navigate("/");
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Box maxWidth={400} mx="auto" p={2}>
      <TextField
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Name"
        margin="normal"
        variant="outlined"
        fullWidth
      />
      <TextField
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        margin="normal"
        variant="outlined"
        fullWidth
      />
      <TextField
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        margin="normal"
        variant="outlined"
        fullWidth
      />
      {error && (
        <Box color="red" my={1}>
          {error}
        </Box>
      )}
      <Button
        onClick={handleSignUp}
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Sign Up
      </Button>
      <Box mt={2}>
        Already have an account? <Link to="/login">Login</Link>
      </Box>
    </Box>
  );
}
