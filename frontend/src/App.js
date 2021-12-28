import './App.css';

import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';

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
          <Route exact path="/products/:slug" element={<ProductDetail />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
