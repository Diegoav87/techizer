import React from 'react'

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import controllerImg from '../assets/img/xbox_controller.jpg';

const Showcase = () => {
    return (
        <div>
            <Container sx={{ mt: 15, mb: 15 }}>
                <Grid container justifyContent="center" alignItems="center" spacing={10}>
                    <Grid item xs={12} sm={12} md={5}>
                        <Typography variant="h2" sx={{ fontWeight: "bold" }} color="textPrimary">
                            Tech and Electronics
                        </Typography>
                        <Typography sx={{ mt: 2 }} variant="subtitle1">
                            Find any tech related product you like and add it to the cart and then you just have to buy it.
                        </Typography>
                        <Button size="large" sx={{ mt: 2 }} variant="contained" color="secondary">Shop Now</Button>
                    </Grid>
                    <Grid item x={12} sm={12} md={7}>
                        <img className='showcase-img' src={controllerImg} alt="controller" />
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Showcase
