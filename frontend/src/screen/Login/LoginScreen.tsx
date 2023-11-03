import { Button, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
export const LoginScreen = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.main}>
        <Card
          variant="outlined"
          sx={{ maxWidth: 300 }}
          className={styles.cardField}
        >
          <Typography variant="h4" align="center" id={styles.heading}>
            Login
          </Typography>
          <TextField required label="Username" className={styles.textField} />
          <TextField
            required
            label="Password"
            type="password"
            className={styles.textField}
          />

          <div className={styles.buttonField}>
            <Button variant="contained" color="primary">
              Sign In
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/signUp")}
            >
              Sign Up
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};
