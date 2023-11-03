import { Button, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import styles from "./style.module.css";

export const RegisterScreen = () => {
  return (
    <div className={styles.registerForm}>
      {/* <Box
        sx={{ bgcolor: "#cfe8fc", height: "700px", width: "600px" }}
        id="register-box-container"
      > */}
      <Card
        variant="outlined"
        sx={{ maxWidth: 900 }}
        className={styles.registerCard}
      >
        <Typography variant="h4">Register Now!</Typography>
        <TextField
          required
          className={styles.outlinedBasic}
          label="First Name"
          variant="outlined"
          // margin="normal"
        />
        <TextField
          required
          className={styles.outlinedBasic}
          label="Last Name"
          variant="outlined"
        />
        <TextField
          required
          className={styles.outlinedBasic}
          label="Email"
          variant="outlined"
        />
        <TextField
          required
          className={styles.outlinedBasic}
          label="User Name"
          variant="outlined"
        />
        <TextField
          required
          className={styles.outlinedBasic}
          label="Password"
          variant="outlined"
          type="password"
        />
        <TextField
          required
          className={styles.outlinedBasic}
          label="Confirm Password"
          variant="outlined"
          type="password"
        />
        <Button variant="contained" color="primary">
          Register
        </Button>
      </Card>
      {/* </Box> */}
    </div>
  );
};
