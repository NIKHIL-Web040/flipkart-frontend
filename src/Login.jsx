import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    const res = await fetch(
      "https://flipkart-backend-2zw8.onrender.com/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-type": "application/json" },
      }
    );
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } else {
      setError(data.error || "Login failed");
    }
  };
  return (
    <Box maxWidth={400} mx="auto" p={2}>
      <TextField
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        margin="normal"
        variant="outlined"
      />
      <TextField
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        margin="normal"
        variant="outlined"
      />
      {error && (
        <Box color="red" my={1}>
          {error}
        </Box>
      )}
      <Button
        onClick={handleLogin}
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Login
      </Button>
      <Box mt={2}>
        Don't have an account? <Link to="/Signup">Signup</Link>
      </Box>
    </Box>
  );
}
