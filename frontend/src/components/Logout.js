import React, { useEffect } from 'react';

import Spinner from './Spinner';

import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import axiosInstance from '../helpers/axios';

const Logout = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        axiosInstance.defaults.headers["Authorization"] = null;
        auth.getUser();
        navigate("/");
    });

    return <Spinner />;
}

export default Logout;
