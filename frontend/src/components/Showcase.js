import React from 'react'

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import controllerImg from '../assets/img/xbox_controller.jpg';

const Showcase = () => {
    return (
        <div>
            <Container sx={{ mt: 15, mb: 15 }}>
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                    <Box sx={{ maxWidth: "40%" }}>
                        <Typography variant="h2" sx={{ fontWeight: "bold" }} color="textPrimary">
                            Tech and Electronics
                        </Typography>
                        <Typography sx={{ mt: 2 }} variant="subtitle1">
                            Find any tech related product you like and add it to the cart and then you just have to buy it.
                        </Typography>
                        <Button size="large" sx={{ mt: 2 }} variant="contained" color="secondary">Shop Now</Button>
                    </Box>
                    <Box>
                        <img className='showcase-img' src={controllerImg} />
                    </Box>
                </Box>
            </Container>
        </div>
    )
}

export default Showcase
