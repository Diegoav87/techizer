import React, { useState, useEffect } from 'react';
import Spinner from '../../components/Spinner';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useParams, useNavigate } from 'react-router-dom';

import * as yup from "yup";
import { toast } from 'react-toastify';

import axiosInstance from '../../helpers/axios';
import handleError from '../../helpers/axiosErrorHandler';

const EditUser = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        first_name: "",
        username: "",
        is_staff: ""
    })

    const userFormSchema = yup.object().shape({
        first_name: yup.string().required("First name is required"),
        username: yup.string().required("Username is required"),
        is_staff: yup.bool().required("Is Staff is required")
    });

    const getUser = () => {
        axiosInstance
            .get(`accounts/users/${id}/`)
            .then(res => {
                console.log(res.data);
                setUser(res.data);
                setFormData({
                    first_name: res.data.first_name,
                    username: res.data.username,
                    is_staff: res.data.is_staff
                })
                setLoading(false);
            })
            .catch(err => {
                handleError(err);
            })
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleCheckboxChange = (e) => {
        setFormData({ ...formData, is_staff: e.target.checked })
    }

    useEffect(() => {
        getUser();
    }, [])

    if (loading) {
        return <Spinner />
    }

    const submitUser = () => {
        userFormSchema
            .validate(formData)
            .then((valid) => {
                if (valid) {
                    axiosInstance
                        .put(`accounts/users/edit/${user.id}/`, formData)
                        .then((res) => {
                            console.log(res.data);
                            toast.success("User successfully edited");
                            navigate("/admin/users/");
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
                        Edit User
                    </Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} sm={12}>
                            <FormLabel sx={{ mb: 1 }} component="legend">First Name</FormLabel>
                            <TextField size="small" value={formData.first_name} onChange={handleInputChange} type="text" name="first_name" placeholder="Enter First Name" variant="outlined" required fullWidth />
                        </Grid>
                        <Grid item xs={12} md={12} sm={12} >
                            <FormLabel sx={{ mb: 1 }} component="legend">Username</FormLabel>
                            <TextField value={formData.username} size="small" onChange={handleInputChange} type="text" name="username" placeholder="Enter Username" variant="outlined" required fullWidth />
                        </Grid>
                        <Grid item xs={12} md={12} sm={12} >
                            <FormGroup>
                                <FormControlLabel control={<Checkbox checked={formData.is_staff} onChange={handleCheckboxChange} />} label="Is Staff" />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} md={12} sm={12} alignSelf={"end"}>
                            <Button variant="contained" fullWidth onClick={submitUser}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Paper >
    )
}

export default EditUser;
