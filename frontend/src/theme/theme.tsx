// import { green, purple } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#233758",
    },
    secondary: {
      main: "#fcad36",
    },
    background: {
      default: "#f2f6ff",
    },
    info: {
      main: "#f2f6ff",
    },
  },

  typography: {
    fontFamily: "roboto, sans-serif",
    h4: {
      color: "secondary",
    },
  },

  components: {
    MuiTextField: {
      defaultProps: {
        color: "secondary",
        sx: {
          width: 250,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        color: "secondary",
        sx: {
          width: 120,
          ":hover": {
            bgcolor: "#f2f6ff",
          },
        },
      },
    },
  },
});

// export const useTextStyle: any = makeStyles({
//   input: {
//     backgroundColor: "#fcad36",
//     color: "#233758",
//     width: 250,

//     "&:hover": {
//       backgroundColor: "#f2f6ff",
//       color: "#233758",
//     },
//   },
// });
