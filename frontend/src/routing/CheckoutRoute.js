import React from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";

const PrivateRoute = ({ children }) => {
    const auth = useAuth();
    const cart = useCart();
    let location = useLocation();

    if (!auth.isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (cart.cartItems.length === 0) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;