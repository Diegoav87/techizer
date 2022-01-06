import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import Avatar from '@mui/material/Avatar';

import Navbar from '../../components/Navbar';

import * as yup from "yup";
import axiosInstance from '../../helpers/axios';
import { toast } from 'react-toastify';
import handleError from '../../helpers/axiosErrorHandler';

const RequestPasswordReset = () => {
    const [formData, setFormData] = useState({ email: "" })

    const emailFormSchema = yup.object().shape({
        email: yup
            .string()
            .email("Invalid email format")
            .required("Email is required"),
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const sendResetPasswordRequest = (e) => {
        e.preventDefault();

        emailFormSchema
            .validate(formData)
            .then((valid) => {
                if (valid) {
                    axiosInstance
                        .post("accounts/request_password_reset/", formData)
                        .then((res) => {
                            console.log(res.data);
                            toast.success("An email was sent to you with further instructions")
                        })
                        .catch((err) => {
                            handleError(err);
                        });
                }
            })
            .catch(err => {
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
                    <Typography sx={{ mb: 2 }} component="h1" variant="h5" fontWeight={"bold"} color="textPrimary">Request Password Reset</Typography>
                    <form onSubmit={sendResetPasswordRequest}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField onChange={handleInputChange} type="email" name="email" placeholder="Enter Email" variant="outlined" required fullWidth label="Email" />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" fullWidth>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </Box>
        </div>
    )
}

export default RequestPasswordReset;
