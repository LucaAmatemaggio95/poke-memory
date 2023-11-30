import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import React from "react";
import Board from "./components/Board/Board";
import NavBar from "./components/NavBar/NavBar";

const App: React.FC = () => {
  let theme = createTheme({
    palette: {
      primary: {
        main: "#006AAB",
      },
      secondary: {
        main: "#D3C77D",
      },
      background: {
        default: "#2F87B9",
      },
    },
    typography: {
      fontFamily: "'Montserrat', sans-serif",
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600
      },
      body1: {
        fontWeight: 600,
      },
      button: {
        fontWeight: 600
      }
    },
  });

  theme = createTheme(theme, {
    components: {
      MuiCard: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            border: `4px solid ${theme.palette.primary.dark}`,
            borderRadius: "8px",
          },
        },
      },
      MuiCardMedia: {
        styleOverrides: {
          img: {
            height: "10vh",
            [theme.breakpoints.down("sm")]: {
              height: "10vh",
            },
          },
        },
      },
      MuiCardActionArea: {
        styleOverrides: {
          root: {
            paddingTop: theme.spacing(2),
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            border: `4px solid ${theme.palette.secondary.main}`,
            borderRadius: '8px'
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            fontSize: 32
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            fontWeight: 500,
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Container>
        <Board />
      </Container>
    </ThemeProvider>
  );
};

export default App;
