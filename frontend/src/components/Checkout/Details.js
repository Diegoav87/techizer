import React, { useState, useEffect } from 'react';
import Spinner from '../Spinner';
import OrderDetails from './OrderDetails';
import AddressDetails from './AddressDetails';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import axiosInstance from '../../helpers/axios';
import handleError from '../../helpers/axiosErrorHandler';
import * as yup from "yup";
import { toast } from 'react-toastify';

const Details = (props) => {
    const [shippingAddresses, setShippingAddresses] = useState([]);
    const [loading, setLoading] = useState(true);

    const getShippingAddresses = () => {
        axiosInstance
            .get("orders/shipping_address/")
            .then(res => {
                console.log(res.data);
                setShippingAddresses(res.data);

                if (res.data.length > 0) {
                    props.setSelectedAddress(res.data[0]);
                }

                setLoading(false);
            })
            .catch(err => {
                handleError(err);
            })
    }

    useEffect(() => {
        getShippingAddresses();
    }, [])

    const [formData, setFormData] = useState({
        full_name: "",
        address: "",
        city: "",
        postal_code: "",
        country: ""
    })

    const shippingFormSchema = yup.object().shape({
        full_name: yup.string().required("Full name is required"),
        address: yup.string().required("Address is required"),
        city: yup.string().required("City is required"),
        postal_code: yup.string().required("Postal code is required"),
        country: yup.string().required("Country is required"),
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const submitShippingAddress = () => {

        shippingFormSchema
            .validate(formData)
            .then((valid) => {
                if (valid) {
                    axiosInstance
                        .post("orders/shipping_address/create/", formData)
                        .then((res) => {
                            console.log(res.data);
                            toast.success("Shipping address added");
                            getShippingAddresses();
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

    const onAddressChange = (e) => {
        const address = shippingAddresses.find(address => address.id === parseInt(e.target.value))
        console.log(address)

        props.setSelectedAddress(address);
    }

    const goToPayment = () => {
        props.handleStepChange(1);
    }

    if (loading) {
        return <Spinner />
    }

    return (
        <Box sx={{ mt: 5 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={8}>
                    <Paper sx={{ p: 3 }}>
                        <Box>
                            <Typography sx={{ mb: 2 }} fontWeight="bold" color="textPrimary" variant="subtitle1" component="h6">
                                Add Shipping Address
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} sm={6}>
                                    <TextField size="small" onChange={handleInputChange} type="text" name="full_name" placeholder="Enter Full Name" variant="outlined" required fullWidth label="Full Name" />
                                </Grid>
                                <Grid item xs={12} md={6} sm={6} >
                                    <TextField size="small" onChange={handleInputChange} type="text" name="address" placeholder="Enter Address" variant="outlined" required fullWidth label="Address" />
                                </Grid>
                                <Grid item xs={12} md={6} sm={6} >
                                    <TextField size="small" onChange={handleInputChange} type="text" name="country" placeholder="Enter Country" variant="outlined" required fullWidth label="Country" />
                                </Grid>
                                <Grid item xs={12} md={6} sm={6} >
                                    <TextField size="small" onChange={handleInputChange} type="text" name="city" placeholder="Enter City" variant="outlined" required fullWidth label="City" />
                                </Grid>
                                <Grid item xs={12} md={6} sm={6} >
                                    <TextField size="small" onChange={handleInputChange} type="text" name="postal_code" placeholder="Enter Postal Code" variant="outlined" required fullWidth label="Postal Code" />
                                </Grid>
                                <Grid item xs={12} md={6} sm={6}>
                                    <Button variant="contained" fullWidth onClick={submitShippingAddress}>
                                        Save New Address
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                    <Paper sx={{ p: 3, mt: 2 }}>
                        <Box>
                            <Typography sx={{ mb: 2 }} fontWeight="bold" color="textPrimary" variant="subtitle1" component="h6">
                                Your Addresses
                            </Typography>
                            <RadioGroup value={props.selectedAddress.id} onChange={onAddressChange}>
                                {shippingAddresses.length > 0 ? shippingAddresses.map(address => {
                                    return (
                                        <Box sx={{ mb: 2 }}>
                                            <Divider />
                                            <Box sx={{ pt: 1, pb: 1, display: "flex", alignItems: "center" }}>
                                                <Radio value={address.id} />
                                                <Typography color="textSecondary" component="span" variant="subtitle1">
                                                    Use this shipping address
                                                </Typography>
                                            </Box>
                                            <AddressDetails address={address} />
                                        </Box>
                                    )
                                }) : (
                                    <Typography sx={{ mb: 2 }} color="textSecondary" variant="body1">
                                        You have not saved any addresses yet, please add one with the form above.
                                    </Typography>
                                )}
                            </RadioGroup>
                        </Box>
                    </Paper>
                </Grid>
                <OrderDetails buttons={
                    <Button variant="contained" onClick={goToPayment} fullWidth disabled={props.selectedAddress === ""}>Proceed to Payment</Button>
                } />
            </Grid>
        </Box>
    )
}

export default Details;
