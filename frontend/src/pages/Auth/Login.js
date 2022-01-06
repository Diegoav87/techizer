import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import GoogleIcon from '@mui/icons-material/Google';

import Navbar from '../../components/Navbar';

import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import axiosInstance from '../../helpers/axios';
import * as yup from "yup";
import { toast } from 'react-toastify';

const Login = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const loginFormSchema = yup.object().shape({
        email: yup
            .string()
            .email("Invalid email format")
            .required("Email is required"),
        password: yup
            .string()
            .required("Password is required")
            .min(8, "Password must have at least 8 characters"),
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        loginFormSchema
            .validate(formData)
            .then((valid) => {
                if (valid) {
                    axiosInstance
                        .post("accounts/token/", formData)
                        .then((res) => {
                            localStorage.setItem("access_token", res.data.access);
                            localStorage.setItem("refresh_token", res.data.refresh);
                            axiosInstance.defaults.headers["Authorization"] =
                                "JWT " + localStorage.getItem("access_token");
                            toast.success("Login successful");
                            auth.getUser();
                            navigate(location.state?.from === undefined ? "/" : location.state.from.pathname, { replace: true });
                        })
                        .catch((err) => {
                            console.log(err.response);

                            if (err.response.status === 401) {
                                toast.error("Invalid credentials");
                            } else {
                                toast.error("Something went wrong, please try again later")
                            }
                        });
                }
            })
            .catch((err) => {
                console.log(err.message);
                toast.error(err.message);
            });
    }

    return (
        <div>
            <Navbar />
            <Box sx={{ mt: 5, mb: 10 }}>
                <Container maxWidth="xs" sx={{ textAlign: "center" }}>
                    <Avatar sx={{ ml: "auto", mr: "auto", mb: 2, backgroundColor: "primary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography sx={{ mb: 2 }} component="h1" variant="h5" fontWeight={"bold"} color="textPrimary">Login</Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField onChange={handleInputChange} type="email" name="email" placeholder="Enter Email" variant="outlined" required fullWidth label="Email" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={handleInputChange} type="password" name="password" placeholder="Enter Password" variant="outlined" required fullWidth label="Password" />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" fullWidth>
                                    Login
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button style={{ backgroundColor: "#4285f4" }} fullWidth variant="contained" startIcon={<GoogleIcon />}>
                                    Sign in with Google
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>You don't have an account? <Link to="/register">Register</Link></Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Forgot your password? <Link to="/reset-password">Reset Password</Link></Typography>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </Box>
        </div>
    )
}

export default Login;
