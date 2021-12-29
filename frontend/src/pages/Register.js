import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';

import Navbar from '../components/Navbar';

import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import axiosInstance from '../helpers/axios';
import * as yup from "yup";
import { toast } from 'react-toastify';
import handleError from '../helpers/axiosErrorHandler';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: "",
        username: "",
        email: "",
        password: "",
        password2: ""
    })

    const registerFormSchema = yup.object().shape({
        first_name: yup.string().required("First name is required"),
        username: yup.string().required("Username is required"),
        email: yup
            .string()
            .email("Invalid email format")
            .required("Email is required"),
        password: yup
            .string()
            .required("Password is required")
            .min(8, "Password must have at least 8 characters"),
        password2: yup
            .string()
            .required("Password confirmation is required")
            .oneOf([yup.ref("password")], "Passwords must match"),
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        registerFormSchema
            .validate(formData)
            .then((valid) => {
                if (valid) {
                    axiosInstance
                        .post("accounts/register/", formData)
                        .then((res) => {
                            console.log(res.data);
                            toast.success("A verification was email sent");
                            navigate("/login");
                        })
                        .catch((err) => {
                            handleError(err);
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
                    <Typography sx={{ mb: 2 }} component="h1" variant="h5" fontWeight={"bold"} color="textPrimary">Register</Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField onChange={handleInputChange} name="first_name" placeholder="Enter First Name" variant="outlined" required fullWidth label="First Name" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={handleInputChange} name="username" placeholder="Enter Username" variant="outlined" required fullWidth label="Username" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={handleInputChange} type="email" name="email" placeholder="Enter Email" variant="outlined" required fullWidth label="Email" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={handleInputChange} type="password" name="password" placeholder="Enter Password" variant="outlined" required fullWidth label="Password" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={handleInputChange} type="password" name="password2" placeholder="Confirm Password" variant="outlined" required fullWidth label="Confirm Password" />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" fullWidth>
                                    Register
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>You already have an account? <Link to="/login">Login</Link></Typography>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </Box>
        </div>
    )
}

export default Register;
