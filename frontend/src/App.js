import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { Routes, Route } from 'react-router-dom';
import PrivateRoute from "./routing/PrivateRoute";
import PublicRoute from "./routing/PublicRoute";
import AdminRoute from './routing/AdminRoute';

import Spinner from './components/Spinner';
import Home from './pages/Home';
import ProductDetail from './pages/Products/ProductDetail';
import Register from "./pages/Auth/Register";
import Login from './pages/Auth/Login';
import Logout from './components/Auth/Logout';
import RequestPasswordReset from './pages/Auth/RequestPasswordReset';
import ResetPasswordConfirm from './pages/Auth/ResetPasswordConfirm';
import Activate from './components/Auth/Activate';
import ProductsByCategory from './pages/Products/ProductsByCategory';
import Cart from './pages/Cart';
import Shop from './pages/Products/Shop';
import Dashboard from './pages/Dashboard/Dashboard';
import Checkout from './pages/Checkout';
import OrderList from './pages/Dashboard/OrderList';
import ProfileForm from './pages/Dashboard/ProfileForm';
import OrderDetail from './pages/Dashboard/OrderDetail';
import Admin from './pages/Admin/Admin';
import UserList from './pages/Admin/UserList';
import EditUser from './pages/Admin/EditUser';
import ProductList from './pages/Admin/ProductList';
import AddProduct from './pages/Admin/AddProduct';
import EditProduct from './pages/Admin/EditProduct';

import useAuth from "./hooks/useAuth";
import useCart from './hooks/useCart';

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
  const cart = useCart();

  if (auth.loading || cart.loading) {
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
          <Route exact path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }>
            <Route exact path="profile" element={
              <PrivateRoute>
                <ProfileForm />
              </PrivateRoute>
            } />
            <Route exact path="orders" element={
              <PrivateRoute>
                <OrderList />
              </PrivateRoute>
            } />
            <Route exact path="orders/:id" element={
              <PrivateRoute>
                <OrderDetail />
              </PrivateRoute>
            } />
          </Route>
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
          <Route exact path="/products/categories/:slug" element={<ProductsByCategory />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/shop" element={<Shop />} />
          <Route exact path="/checkout" element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          } />
          <Route exact path="/admin" element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }>
            <Route exact path="users" element={
              <AdminRoute>
                <UserList />
              </AdminRoute>
            } />
            <Route exact path="users/edit/:id" element={
              <AdminRoute>
                <EditUser />
              </AdminRoute>
            } />
            <Route exact path="products" element={
              <AdminRoute>
                <ProductList />
              </AdminRoute>
            } />
            <Route exact path="products/create" element={
              <AdminRoute>
                <AddProduct />
              </AdminRoute>
            } />
            <Route exact path="products/edit/:slug" element={
              <AdminRoute>
                <EditProduct />
              </AdminRoute>
            } />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
