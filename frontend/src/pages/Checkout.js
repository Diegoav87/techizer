import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Details from '../components/Checkout/Details';
import PaymentSelection from '../components/Checkout/PaymentSelection';
import PlaceOrder from '../components/Checkout/PlaceOrder';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ['Details', 'Payment', 'Order'];

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("paypal");

    const handleResetStep = () => {
        setActiveStep(0);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    }

    let activeComponent = "";

    if (activeStep === 0) {
        activeComponent = (
            <Details handleStepChange={handleStepChange} setSelectedAddress={setSelectedAddress} selectedAddress={selectedAddress} />
        )
    } else if (activeStep === 1) {
        activeComponent = (
            <PaymentSelection paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} handleStepChange={handleStepChange} />
        )
    } else if (activeStep === 2) {
        activeComponent = (
            <PlaceOrder address={selectedAddress} paymentMethod={paymentMethod} handleStepChange={handleStepChange} />
        )
    }

    return (
        <div>
            <Navbar />
            <Box sx={{ backgroundColor: "gray.main" }}>
                <Container maxWidth="lg" sx={{ pb: 5, pt: 5 }}>
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                                return (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleResetStep}>Reset</Button>
                                </Box>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {activeComponent}
                            </React.Fragment>
                        )}
                    </Box>
                </Container>
            </Box>
        </div>
    )
}

export default Checkout;
