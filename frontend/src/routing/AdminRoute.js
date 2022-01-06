import React from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
    const auth = useAuth();
    let location = useLocation();

    if (!auth.isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!auth.user.is_staff) {
        return <Navigate to="/" replace />
    }

    return children;
};

export default AdminRoute;