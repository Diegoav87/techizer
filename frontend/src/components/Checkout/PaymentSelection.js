import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import OrderDetails from './OrderDetails';

const PaymentSelection = (props) => {
    const goBackToDetails = () => {
        props.handleStepChange(0);
    }

    const goToOrder = () => {
        props.handleStepChange(2);
    }

    return (
        <Box sx={{ mt: 5 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={8}>
                    <Paper sx={{ p: 3 }}>
                        <Box>
                            <RadioGroup value={props.paymentMethod}>
                                <Box sx={{ pt: 1, pb: 1, display: "flex", alignItems: "center" }}>
                                    <Radio value={"paypal"} />
                                    <Typography color="textSecondary" component="span" variant="subtitle1">
                                        Pay with paypal
                                    </Typography>
                                </Box>
                            </RadioGroup>
                        </Box>
                    </Paper>
                </Grid>
                <OrderDetails buttons={
                    <React.Fragment>
                        <Button onClick={goToOrder} fullWidth variant="contained">Proceed to Order</Button>
                        <Button sx={{ mt: 1 }} onClick={goBackToDetails} fullWidth variant="outlined">Back to Details</Button>
                    </React.Fragment>
                } />
            </Grid>
        </Box>
    )
}

export default PaymentSelection
