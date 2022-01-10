import React from 'react'

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import showcaseImg from '../assets/img/showcase.jpg';

import { Link } from 'react-router-dom';

const Showcase = () => {
    return (
        <div style={{ backgroundImage: `url(${showcaseImg})`, backgroundSize: "cover", minHeight: "500px", minWidth: "100%" }}>
            <Container maxWidth="lg" sx={{ pt: 17, mb: 10 }}>
                <Grid container justifyContent="center" alignItems="center" spacing={10}>
                    <Grid item xs={12} sm={8} md={8}>
                        <Typography component="h1" variant="h2" sx={{ fontWeight: "bold" }} color="textPrimary">
                            Tech and Electronics
                        </Typography>
                        <Typography sx={{ mt: 2, maxWidth: "80%" }} variant="subtitle1" color="textPrimary">
                            From video games to PC parts, anything you need you will find it here at Techizer.
                        </Typography>
                        <Link to="/shop" className="link">
                            <Button size="large" sx={{ mt: 2 }} variant="contained">Shop Now</Button>
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}></Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Showcase
