import React, { useState } from 'react'
import Navbar from '../components/Navbar';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import Avatar from '@mui/material/Avatar';

import * as yup from "yup";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import handleError from '../helpers/axiosErrorHandler';
import axiosInstance from '../helpers/axios';

const ResetPasswordConfirm = () => {
    let { uidb64, token } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password: "",
        password2: "",
    });

    const passwordFormSchema = yup.object().shape({
        password: yup
            .string()
            .required("Password is required")
            .min(8, "Password must have at least 8 characters"),
        password2: yup
            .string()
            .required("Password is required")
            .oneOf([yup.ref("password")], "Passwords must match"),
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const sendResetPasswordConfirmation = (e) => {
        e.preventDefault();

        passwordFormSchema
            .validate(formData)
            .then((valid) => {
                if (valid) {
                    axiosInstance
                        .post("accounts/password_reset/", {
                            uidb64: uidb64,
                            token: token,
                            password: formData.password,
                            password2: formData.password2,
                        })
                        .then((res) => {
                            console.log(res.data);
                            toast.success("Password reseted correctly")
                            navigate("/login");
                        })
                        .catch((err) => {
                            handleError(err);
                        });
                }
            })
            .catch(function (err) {
                toast.error(err.message);
            });
    };

    return (
        <div>
            <Navbar />
            <Box sx={{ mt: 5, mb: 10 }}>
                <Container maxWidth="xs" sx={{ textAlign: "center" }}>
                    <Avatar sx={{ ml: "auto", mr: "auto", mb: 2, backgroundColor: "primary.main" }}>
                        <VpnKeyOutlinedIcon />
                    </Avatar>
                    <Typography sx={{ mb: 2 }} component="h1" variant="h5" fontWeight={"bold"} color="textPrimary">Reset Password</Typography>
                    <form onSubmit={sendResetPasswordConfirmation}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField onChange={handleInputChange} type="password" name="password" placeholder="Enter Password" variant="outlined" required fullWidth label="Password" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={handleInputChange} type="password" name="password2" placeholder="Confirm Password" variant="outlined" required fullWidth label="Confirm Password" />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" fullWidth>
                                    Update Password
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </Box>
        </div>
    )
}

export default ResetPasswordConfirm;
