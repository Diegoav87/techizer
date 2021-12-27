import './App.css';

import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0f3460"
    },
    secondary: {
      main: "#d23f57"
    },
    gray: {
      main: "#F3F5F9"
    },
    white: {
      main: "white"
    },
    text: {
      primary: "#2B3445"
    }
  },

});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
