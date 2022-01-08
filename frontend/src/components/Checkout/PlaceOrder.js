import React, { useEffect } from 'react';
import OrderItems from './OrderItems';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import OrderDetails from './OrderDetails';
import AddressDetails from './AddressDetails';

import useCart from '../../hooks/useCart';

import { useNavigate } from "react-router-dom";

import axiosInstance from '../../helpers/axios';
import { toast } from 'react-toastify';
import handleError from '../../helpers/axiosErrorHandler';

const PlaceOrder = (props) => {
    const cart = useCart();
    const navigate = useNavigate();

    const goBackToPayment = () => {
        props.handleStepChange(1);
    }

    const submitOrder = () => {
        const items = cart.cartItems.map(item => {
            return {
                data: {
                    price: item.regular_price,
                    quantity: item.qty
                },
                product_id: item.id
            }
        })

        const data = {
            order: {
                total_paid: cart.getCartTotal(),
                sub_total: cart.getCartSubtotal(),
                payment_method: props.paymentMethod
            },
            items: items
        }

        axiosInstance
            .post(`orders/create/${props.address.id}/`, data)
            .then(res => {
                console.log(res.data);
                toast.success("Order placed");
                cart.clearCart();
                navigate(`/dashboard/orders/${res.data.order_id}`);
            })
            .catch(err => {
                handleError(err);
            })
    }

    return (
        <Box sx={{ mt: 5 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={8}>
                    <Paper sx={{ p: 3 }}>
                        <Typography sx={{ mb: 2 }} fontWeight="bold" color="textPrimary" variant="subtitle1" component="h6">
                            Shipping Address
                        </Typography>
                        <AddressDetails address={props.address} />
                    </Paper>
                    <Paper sx={{ p: 3, mt: 2 }}>
                        <Typography sx={{ mb: 2 }} fontWeight="bold" color="textPrimary" variant="subtitle1" component="h6">
                            Payment Method
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                            <Typography sx={{ pr: 1 }} color="textSecondary" component="span" variant="subtitle1">
                                Method:
                            </Typography>
                            <Typography fontWeight="bold" component="span" variant="subtitle1" color="textPrimary">{props.paymentMethod}</Typography>
                        </Box>
                    </Paper>
                    <Paper sx={{ p: 3, mt: 2 }}>
                        <Typography sx={{ mb: 2 }} fontWeight="bold" color="textPrimary" variant="subtitle1" component="h6">
                            Order Items
                        </Typography>
                        <OrderItems items={cart.cartItems} />
                    </Paper>
                </Grid>
                <OrderDetails buttons={
                    <React.Fragment>
                        <Button disabled={cart.cartItems.length === 0} onClick={submitOrder} fullWidth variant="contained">Place Order</Button>
                        <Button sx={{ mt: 1 }} onClick={goBackToPayment} fullWidth variant="outlined">Back to Payment</Button>
                    </React.Fragment>
                } />
            </Grid>
        </Box>
    )
}

export default PlaceOrder;
