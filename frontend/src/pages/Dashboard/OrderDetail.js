import React, { useState, useEffect } from 'react';
import Spinner from "../../components/Spinner";
import AddressDetails from '../../components/Checkout/AddressDetails';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import moment from "moment";

import { useParams } from 'react-router';

import axiosInstance from '../../helpers/axios';
import handleError from '../../helpers/axiosErrorHandler';
import { toast } from 'react-toastify';

import { PayPalButton } from "react-paypal-button-v2";

const steps = ['Placed', 'Paid', 'Delivered'];

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const [activeStep, setActiveStep] = useState(1);
    const [sdkReady, setSdkReady] = useState(false);

    const getOrder = () => {
        axiosInstance
            .get(`orders/${id}/`)
            .then(res => {
                console.log(res.data);
                setOrder(res.data);

                if (res.data.is_paid && !res.data.is_delivered) {
                    setActiveStep(2);
                } else if (res.data.is_paid && res.data.is_delivered) {
                    setActiveStep(3);
                } else {
                    if (!window.paypal) {
                        addPayPalScript();
                    } else {
                        setSdkReady(true);
                    }
                }

                setLoading(false);
            })
            .catch(err => {
                handleError(err);
            })
    }

    useEffect(() => {
        getOrder();
    }, [])

    const successPaymentHandler = (paymentResult) => {
        axiosInstance
            .put(`orders/pay/${order.id}/`)
            .then(res => {
                console.log(res.data);
                toast.success("Payment successful");
                getOrder();
            })
            .catch(err => {
                handleError(err);
            })
    }

    const addPayPalScript = () => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.paypal.com/sdk/js?client-id=AbunHlmDsNTOUwsg6uFVY8IVT6pA3cRHkLcf2s_am0xT2UDscbhQZ0-_I8vkPjVPCX4DTPQXFgMmquYc';
        script.async = true;
        script.onload = () => {
            setSdkReady(true);
        }
        document.body.appendChild(script);
    }

    if (loading) {
        return <Spinner />
    }

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                    <Paper sx={{ p: 3 }}>
                        <Box sx={{ mb: 2 }}>
                            <Typography fontWeight="bold" color="textPrimary" component="h6" variant="subtitle1">
                                Summary
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                            <Typography color="textSecondary" component="span" variant="subtitle1">
                                Subtotal:
                            </Typography>
                            <Typography fontWeight="bold" component="h6" variant="subtitle1" color="textPrimary">${order.sub_total}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, mb: 2 }}>
                            <Typography color="textSecondary" component="span" variant="subtitle1">
                                Shipping:
                            </Typography>
                            <Typography fontWeight="bold" component="h6" variant="subtitle1" color="textPrimary">${order.shipping_cost}</Typography>
                        </Box>
                        <Divider />
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                            <Typography color="textSecondary" component="span" variant="subtitle1">
                                Total:
                            </Typography>
                            <Typography fontWeight="bold" component="h6" variant="subtitle1" color="textPrimary">${order.total_paid}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                            <Typography color="textSecondary" component="span" variant="subtitle1">
                                Payment method:
                            </Typography>
                            <Typography component="h6" variant="subtitle1" color="textPrimary" fontWeight="bold">{order.payment_method}</Typography>
                        </Box>
                        {!order.is_paid && (
                            <Box sx={{ mt: 2 }}>
                                {!sdkReady ? (
                                    <Spinner />
                                ) : (
                                    <PayPalButton amount={order.total_paid} onSuccess={successPaymentHandler} />
                                )}
                            </Box>
                        )}
                    </Paper>
                    <Paper sx={{ p: 3, mt: 2 }}>
                        <Box sx={{ mb: 2 }}>
                            <Typography fontWeight="bold" color="textPrimary" component="h6" variant="subtitle1">
                                Details
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, mb: 2 }}>
                            <Typography color="textSecondary" component="span" variant="subtitle1">
                                Order ID:
                            </Typography>
                            <Typography fontWeight="bold" component="h6" variant="subtitle1" color="textPrimary">{order.id}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, mb: 2 }}>
                            <Typography color="textSecondary" component="span" variant="subtitle1">
                                Placed at:
                            </Typography>
                            <Typography fontWeight="bold" component="h6" variant="subtitle1" color="textPrimary">{moment(order.created_at).format("DD/MM/YYYY")}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, mb: 2 }}>
                            <Typography color="textSecondary" component="span" variant="subtitle1">
                                Paid at:
                            </Typography>
                            <Typography fontWeight="bold" component="h6" variant="subtitle1" color="textPrimary">{order.paid_at ? moment(order.paid_at).format("DD/MM/YYYY") : "Not Paid"}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, mb: 2 }}>
                            <Typography color="textSecondary" component="span" variant="subtitle1">
                                Delivered at:
                            </Typography>
                            <Typography fontWeight="bold" component="h6" variant="subtitle1" color="textPrimary">{order.delivered_at ? moment(order.delivered_at).format("DD/MM/YYYY") : "Not Delivered"}</Typography>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                    <Paper sx={{ p: 3 }}>
                        <Box>
                            <Stepper activeStep={activeStep}>
                                {steps.map((label, index) => {
                                    return (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                        </Box>
                    </Paper>
                    <Paper sx={{ p: 3, mt: 2 }}>
                        <Typography sx={{ mb: 2 }} fontWeight="bold" color="textPrimary" variant="subtitle1" component="h6">
                            Order Items
                        </Typography>
                        {order.order_items.map(item => {
                            return (
                                <React.Fragment>
                                    <Divider />
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2, mb: 2 }}>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <img height={75} width={75} src={`http://127.0.0.1:8000${item.product.get_featured_image.image}`} alt={item.product.get_featured_image.alt_text} />
                                            <Box sx={{ pl: 2 }}>
                                                <Typography sx={{ mb: 1 }} component="h6" variant="subtitle1" color="textPrimary">{item.product.title}</Typography>

                                            </Box>
                                        </Box>
                                        <Box>
                                            <Typography component="h6" variant="subtitle2" fontWeight="bold" color="textPrimary">${item.price} x {item.quantity}</Typography>
                                        </Box>
                                    </Box>
                                </React.Fragment>
                            )
                        })}
                    </Paper>
                    <Paper sx={{ p: 3, mt: 2 }}>
                        <Typography sx={{ mb: 2 }} fontWeight="bold" color="textPrimary" variant="subtitle1" component="h6">
                            Shipping Address
                        </Typography>
                        <AddressDetails address={order.shipping_address} />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default OrderDetail;
