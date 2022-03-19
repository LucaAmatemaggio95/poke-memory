import React from 'react';
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Board from "./components/Board/Board";
import NavBar from "./components/NavBar/NavBar";

const App:React.FC = () => {

  let theme = createTheme({
    palette: {
      primary: {
        main: '#0075BE'
      },
      secondary: {
        main: '#FFCC00'
      }
    }
  });

  theme = createTheme(theme, {
    components: {
      MuiCard: {
        defaultProps: {
          elevation: 0
        },
        styleOverrides: {
          root: {
            border: `2px solid ${theme.palette.common.black}`
          }
        }
      },
      MuiCardMedia: {
        styleOverrides: {
          img: {
            height: '10vh',
            [theme.breakpoints.down("sm")]: {
              height: '10vh'
            }
          }
        }
      },
      MuiCardActionArea: {
        styleOverrides: {
          root: {
            paddingTop: theme.spacing(2)
          }
        }
      }
    }
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />

        <Container>

          <Board />

        </Container>
        
      </ThemeProvider>
    </>
  );
}

export default App;
