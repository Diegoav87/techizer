import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

import useCart from '../../hooks/useCart';

const OrderDetails = (props) => {
    const cart = useCart();

    return (
        <Grid item xs={12} sm={12} md={4}>
            <Box>
                <Paper sx={{ p: 3 }}>
                    <Box sx={{ mb: 2 }}>
                        <Typography fontWeight="bold" color="textPrimary" component="h6" variant="subtitle1">
                            Order Details
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                        <Typography color="textSecondary" component="span" variant="subtitle1">
                            Subtotal:
                        </Typography>
                        <Typography component="h6" variant="h6" color="textPrimary">${cart.getCartSubtotal()}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, mb: 2 }}>
                        <Typography color="textSecondary" component="span" variant="subtitle1">
                            Shipping:
                        </Typography>
                        <Typography component="h6" variant="h6" color="textPrimary">${cart.SHIPPING_COST}</Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                        <Typography color="textSecondary" component="span" variant="subtitle1">
                            Total:
                        </Typography>
                        <Typography component="h6" variant="h6" color="textPrimary">${cart.getCartTotal()}</Typography>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        {props.buttons}
                    </Box>
                </Paper>
            </Box>
        </Grid>
    )
}

export default OrderDetails;
