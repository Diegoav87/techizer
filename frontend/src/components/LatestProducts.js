import React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import ProductCard from './ProductCard';

const LatestProducts = (props) => {
    return (
        <Box sx={{ backgroundColor: "gray.main" }}>
            <Container>
                <Typography sx={{ pt: 5 }} variant="h5" fontWeight={"bold"} color="textPrimary">
                    Latest Products
                </Typography>
                <Grid sx={{ pb: 5, pt: 3 }} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </Grid>
            </Container>
        </Box>
    )
}

export default LatestProducts;

