import {
  Alert,
  Button,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useUsersApi";
import { theme } from "../../theme/theme";
import styles from "./style.module.css";

export const LoginScreen = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login, error } = useLogin();

  sessionStorage.clear();

  const HandleOnClick = (event: any) => {
    event.preventDefault();
    login({ username: username, password });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className={styles.main}>
          <Card
            variant="outlined"
            sx={{ maxWidth: 300 }}
            className={styles.cardField}
          >
            <Typography variant="h4" color="info" className={styles.heading}>
              Welcome
            </Typography>
            <img
              src="./images/Varicon-logo.png.webp"
              width="150"
              height={"150"}
              className={styles.logo}
            ></img>
            <TextField
              required
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              required
              label="Password"
              type="password"
              value={password}
              size="medium"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className={styles.buttonField}>
              <Button
                variant="contained"
                type="reset"
                color="secondary"
                onClick={HandleOnClick}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate(`/signUp`)}
              >
                Sign Up
              </Button>
            </div>
            {error !== null && (
              <Alert severity="error" className={styles.alertBox}>
                {error.message}
              </Alert>
            )}
          </Card>
        </div>
      </ThemeProvider>
    </>
  );
};
