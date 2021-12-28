import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import ProductCard from './ProductCard';
import Spinner from './Spinner';

import axiosInstance from '../helpers/axios';

const LatestProducts = (props) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getProducts = () => {
        axiosInstance
            .get("products/")
            .then(res => {
                console.log(res.data);
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err.response);
            })
    }

    useEffect(() => {
        getProducts();
    }, [])

    if (loading) {
        return <Spinner />;
    }

    return (
        <Box sx={{ backgroundColor: "gray.main" }}>
            <Container>
                <Typography sx={{ pt: 5 }} variant="h5" fontWeight={"bold"} color="textPrimary">
                    Latest Products
                </Typography>
                <Grid sx={{ pb: 5, pt: 3 }} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {products.map(product => {
                        return (
                            <ProductCard key={product.id} product={product} />
                        )
                    })}
                </Grid>
            </Container>
        </Box>
    )
}

export default LatestProducts;

