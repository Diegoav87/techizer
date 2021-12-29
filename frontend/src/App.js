import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { Routes, Route } from 'react-router-dom';
import PrivateRoute from "./routing/PrivateRoute";
import PublicRoute from "./routing/PublicRoute";

import Spinner from './components/Spinner';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Register from "./pages/Register";
import Login from './pages/Login';
import Logout from './components/Logout';
import RequestPasswordReset from './pages/RequestPasswordReset';
import ResetPasswordConfirm from './pages/ResetPasswordConfirm';
import Activate from './components/Activate';

import useAuth from "./hooks/useAuth";

import { ToastContainer } from "react-toastify";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#d23f57"
    },
    secondary: {
      main: "#0f3460"
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
  const auth = useAuth();

  if (auth.loading) {
    return <Spinner />
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products/:slug" element={<ProductDetail />} />
          <Route exact path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />
          <Route exact path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route exact path="/logout" element={
            <PrivateRoute>
              <Logout />
            </PrivateRoute>
          } />
          <Route exact path="/reset-password" element={
            <PublicRoute>
              <RequestPasswordReset />
            </PublicRoute>
          } />
          <Route exact path="/password/reset/confirm/:uidb64/:token" element={
            <PublicRoute>
              <ResetPasswordConfirm />
            </PublicRoute>
          } />
          <Route exact path='/activate/:uidb64/:token' element={
            <PublicRoute>
              <Activate />
            </PublicRoute>
          } />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
