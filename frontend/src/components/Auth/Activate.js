import React from 'react';

import Navbar from '../Navbar';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';

import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import handleError from '../../helpers/axiosErrorHandler';
import axiosInstance from '../../helpers/axios';

const Activate = () => {
    let { uidb64, token } = useParams();
    const navigate = useNavigate();

    const sendEmailVerificationRequest = (e) => {
        e.preventDefault();

        axiosInstance
            .post(`accounts/account_activate/`, {
                uidb64: uidb64,
                token: token
            })
            .then((res) => {
                console.log(res.data);
                toast.success("Your account has been activated, you can login now")
                navigate("/login");
            })
            .catch((err) => {
                handleError(err);
            });
    };

    return (
        <div>
            <Navbar />
            <Box sx={{ mt: 5, mb: 10 }}>
                <Container maxWidth="xs" sx={{ textAlign: "center" }}>
                    <Avatar sx={{ ml: "auto", mr: "auto", mb: 2, backgroundColor: "primary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography sx={{ mb: 2 }} component="h1" variant="h5" fontWeight={"bold"} color="textPrimary">Verify Account</Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography>Click this button to verify your account</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={sendEmailVerificationRequest} variant="contained" fullWidth>
                                Verify
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    )
}

export default Activate
