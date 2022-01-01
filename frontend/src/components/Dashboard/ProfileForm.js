import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import FormLabel from '@mui/material/FormLabel';

import axiosInstance from '../../helpers/axios';
import handleError from '../../helpers/axiosErrorHandler';
import * as yup from "yup";
import { toast } from 'react-toastify';

import useAuth from '../../hooks/useAuth';

const ProfileForm = () => {
    const auth = useAuth();

    const [profileFormData, setProfileFormData] = useState({
        first_name: auth.user.first_name,
        username: auth.user.username
    })

    const [passwordFormData, setPasswordFormData] = useState({
        old_password: "",
        password: "",
        password2: "",
    })

    const profileFormSchema = yup.object().shape({
        first_name: yup.string().required("First name is required"),
        username: yup.string().required("Username is required")
    });

    const passwordFormSchema = yup.object().shape({
        old_password: yup.string().required("Old password is required"),
        password: yup
            .string()
            .required("New password is required")
            .min(8, "Password must have at least 8 characters"),
        password2: yup
            .string()
            .required("Password confirmation is required")
            .oneOf([yup.ref("password")], "Passwords must match"),
    });


    const handleProfileInputChange = (e) => {
        setProfileFormData({ ...profileFormData, [e.target.name]: e.target.value });
    }

    const handlePasswordInputChange = (e) => {
        setPasswordFormData({ ...passwordFormData, [e.target.name]: e.target.value });
    }

    const submitProfile = () => {
        profileFormSchema
            .validate(profileFormData)
            .then((valid) => {
                if (valid) {
                    axiosInstance
                        .put("accounts/edit_user/", profileFormData)
                        .then((res) => {
                            console.log(res.data);
                            auth.getUser();
                            toast.success("User successfully edited");
                        })
                        .catch((err) => {
                            handleError(err);
                        });
                }
            })
            .catch((err) => {
                toast.error(err.message);
            });
    }

    const submitPassword = () => {
        passwordFormSchema
            .validate(passwordFormData)
            .then((valid) => {
                if (valid) {
                    axiosInstance
                        .put(`accounts/change_password/${auth.user.id}/`, passwordFormData)
                        .then((res) => {
                            console.log(res.data);
                            toast.success("Password successfully changed");
                        })
                        .catch((err) => {
                            handleError(err);
                        });
                }
            })
            .catch((err) => {
                toast.error(err.message);
            });
    }

    return (
        <Paper sx={{ p: 3 }}>
            <Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <PersonIcon color="primary" sx={{ pr: 1 }} />
                    <Typography fontWeight="bold" color="textPrimary" variant="h5" component="h4">
                        Edit Profile
                    </Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                    <Typography sx={{ mb: 1 }} fontWeight="bold" color="textPrimary" variant="subtitle1" component="h6">
                        Profile Info
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} sm={6}>
                            <FormLabel sx={{ mb: 1 }} component="legend">First Name</FormLabel>
                            <TextField size="small" value={profileFormData.first_name} onChange={handleProfileInputChange} type="text" name="first_name" placeholder="Enter First Name" variant="outlined" required fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6} sm={6} >
                            <FormLabel sx={{ mb: 1 }} component="legend">Username</FormLabel>
                            <TextField value={profileFormData.username} size="small" onChange={handleProfileInputChange} type="text" name="username" placeholder="Enter Username" variant="outlined" required fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6} sm={6} alignSelf={"end"}>
                            <Button onClick={submitProfile} variant="contained" fullWidth>
                                Edit Profile
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <Typography sx={{ mb: 1 }} fontWeight="bold" color="textPrimary" variant="subtitle1" component="h6">
                        Change Password
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} sm={6}>
                            <FormLabel sx={{ mb: 1 }} component="legend">Current Password</FormLabel>
                            <TextField size="small" onChange={handlePasswordInputChange} type="password" name="old_password" placeholder="Enter Current Password" variant="outlined" required fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6} sm={6} >
                            <FormLabel sx={{ mb: 1 }} component="legend">New Password</FormLabel>
                            <TextField size="small" onChange={handlePasswordInputChange} type="password" name="password" placeholder="Enter New Password" variant="outlined" required fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6} sm={6} >
                            <FormLabel sx={{ mb: 1 }} component="legend">Confirm Password</FormLabel>
                            <TextField size="small" onChange={handlePasswordInputChange} type="password" name="password2" placeholder="Confirm New Password" variant="outlined" required fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6} sm={6} alignSelf={"end"}>
                            <Button onClick={submitPassword} variant="contained" fullWidth>
                                Change Password
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Paper >
    )
}

export default ProfileForm;
